import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'

const Dashboard = () => {
  const { user, suggestedUsers } = useSelector(state => state.auth);
  
  // Fetch suggested users
  useGetSuggestedUsers();
  
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 mt-4 md:pl-16 lg:pl-24 md:pr-8 lg:pr-12">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-full">
          <h2 className="text-lg font-semibold mb-4">Profile Stats</h2>
          <div className="flex items-center gap-4 mb-5">
            <Avatar className="h-16 w-16 border-2 border-blue-100">
              <AvatarImage src={user?.profilePicture || "/user-avatar.png"} alt="User" />
              <AvatarFallback className="bg-blue-50 text-blue-700">{user?.username?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg">Welcome back, {user?.fullName || user?.username || 'User'}!</h3>
              <p className="text-gray-500">Your account is active</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
              <p className="text-2xl font-bold">{user?.followers || 0}</p>
              <p className="text-gray-500 text-sm font-medium">Followers</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
              <p className="text-2xl font-bold">{user?.following || 0}</p>
              <p className="text-gray-500 text-sm font-medium">Following</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-full">
          <h2 className="text-lg font-semibold mb-4">Content Stats</h2>
          <div className="space-y-4 mt-5">
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
              <p className="text-gray-600 font-medium">Posts</p>
              <p className="font-bold text-lg">{user?.posts || 0}</p>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
              <p className="text-gray-600 font-medium">Comments</p>
              <p className="font-bold text-lg">0</p>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
              <p className="text-gray-600 font-medium">Likes Received</p>
              <p className="font-bold text-lg">0</p>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md">
              <p className="text-gray-600 font-medium">Bookmarks</p>
              <p className="font-bold text-lg">{user?.bookmarks || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-full">
          <h2 className="text-lg font-semibold mb-4">Token Summary</h2>
          <div className="mb-5 mt-5">
            <p className="text-gray-500 text-sm font-medium">Available Balance</p>
            <p className="text-2xl font-bold">0 TWT</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-5">
            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <Link to="/token">
            <Button className="w-full py-4 font-medium">Manage Tokens</Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-full">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          {(
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">No recent activity</p>
              <p className="text-sm text-gray-400">Your recent activity will appear here</p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-full">
          <h2 className="text-lg font-semibold mb-4">Suggested Connections</h2>
          {suggestedUsers && suggestedUsers.length > 0 ? (
            <div className="space-y-3">
              {suggestedUsers.slice(0, 5).map((connection) => (
                <div key={connection._id} className="flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded-md">
                  <div className="flex items-center gap-4">
                    <Link to={`/profile/${connection._id}`}>
                      <Avatar className="border border-gray-100">
                        <AvatarImage src={connection.profilePicture} alt={connection.username} />
                        <AvatarFallback className="bg-blue-50 text-blue-700">{connection.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div>
                      <Link to={`/profile/${connection._id}`}>
                        <p className="font-medium">{connection.username}</p>
                      </Link>
                      <p className="text-sm text-gray-500">{connection.bio || 'No bio available'}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-blue-50">Follow</Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">No suggested connections</p>
              <p className="text-sm text-gray-400">We'll suggest people to connect with soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard