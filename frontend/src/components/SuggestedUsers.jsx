import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axiosInstance from '../utils/axiosConfig';
import { toast } from 'sonner';
import { setSuggestedUsers } from '@/redux/authSlice';

const SuggestedUsers = () => {
    const { suggestedUsers, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [followingUsers, setFollowingUsers] = useState([]);

    const handleFollow = async (userId) => {
        try {
            const res = await axiosInstance.post(`/user/followorunfollow/${userId}`, {});
            
            if (res.data.success) {
                toast.success(res.data.message);
                
                // Update local state to show user is now followed
                if (res.data.message.includes('followed')) {
                    setFollowingUsers([...followingUsers, userId]);
                } else {
                    setFollowingUsers(followingUsers.filter(id => id !== userId));
                }
                
                // Refresh suggested users list
                const suggestedRes = await axiosInstance.get('/user/suggested');
                
                if (suggestedRes.data.success) {
                    dispatch(setSuggestedUsers(suggestedRes.data.users));
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };
    
    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
                suggestedUsers.map((user) => {
                    return (
                        <div key={user._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${user?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} alt="post_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
                                    <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            <span 
                                onClick={() => handleFollow(user._id)} 
                                className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'
                            >
                                {followingUsers.includes(user._id) ? 'Unfollow' : 'Follow'}
                            </span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers