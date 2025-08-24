import { BarChart3, Coins, Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import logo from '../assets/vezzra-removebg-preview.png'
import { setLikeNotification, clearAllNotifications } from '@/redux/rtnSlice'

const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);


    const logoutHandler = async () => {
        try {
            const res = await axios.get('https://instaclone-g9h5.onrender.com/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        } else if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`);
        } else if (textType === "Home") {
            navigate("/");
        } else if (textType === 'Messages') {
            navigate("/chat");
        } else if (textType === 'TWT Token') {
            navigate("/token");
        } else if (textType === 'Dashboard') {
            navigate("/dashboard");
        } else if (textType === 'Search') {
            // Navigate to search page or open search modal
            navigate("/");
            toast.info("Search functionality will be available soon!");
        } else if (textType === 'Explore') {
            // Navigate to explore page
            navigate("/");
            toast.info("Explore functionality will be available soon!");
        } else if (textType === 'Notifications') {
            // Open the notifications popover by simulating a click on the notification button
            const notificationButton = document.querySelector('[data-notification-trigger="true"]');
            if (notificationButton) {
                notificationButton.click();
            } else {
                toast.info("No new notifications!");
            }
        }
    }

    const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <TrendingUp />, text: "Explore" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notifications" },
        { icon: <PlusSquare />, text: "Create" },
        { icon: <Coins />, text: "TWT Token" },
        { icon: <BarChart3 />, text: "Dashboard" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },
    ]
    return (
        <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
            <div className='flex flex-col'>
                <div className='my-8 pl-3 flex items-center gap-2'>
                    <img src={logo} alt='App logo' className='h-10 w-10' />
                    <span className='text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent'>VARTUL</span>
                </div>
                <div>
                    {
                        sidebarItems.map((item, index) => {
                            return (
                                <div onClick={() => sidebarHandler(item.text)} key={index} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
                                    {item.icon}
                                    <span>{item.text}</span>
                                    {
                                        item.text === "Notifications" && likeNotification.length > 0 && (
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button 
                                                        size='icon' 
                                                        className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
                                                        data-notification-trigger="true"
                                                    >
                                                        {likeNotification.length}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <div>
                                                        {
                                                            likeNotification.length === 0 ? (<p>No new notification</p>) : (
                                                                <>
                                                                    {likeNotification.map((notification) => {
                                                                        return (
                                                                            <div key={notification.userId} className='flex items-center gap-2 my-2'>
                                                                                <Avatar>
                                                                                    <AvatarImage src={notification.userDetails?.profilePicture} />
                                                                                    <AvatarFallback>CN</AvatarFallback>
                                                                                </Avatar>
                                                                                <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                    <Button 
                                                                        className="w-full mt-2" 
                                                                        variant="outline" 
                                                                        size="sm"
                                                                        onClick={() => {
                                                                            // Clear all notifications
                                                                            dispatch(clearAllNotifications());
                                                                            toast.success("All notifications cleared");
                                                                        }}
                                                                    >
                                                                        Clear All
                                                                    </Button>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <CreatePost open={open} setOpen={setOpen} />

        </div>
    )
}

export default LeftSidebar