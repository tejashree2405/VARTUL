import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const Token = () => {
  const { user } = useSelector(state => state.auth);
  const [balance] = useState(0);
  const [staked] = useState(0);
  
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 mt-4 md:pl-16 lg:pl-24 md:pr-8 lg:pr-12">
      <h1 className="text-2xl font-bold mb-6">TWT Token</h1>
      
      <div className="bg-white rounded-lg shadow-md p-5 md:p-6 lg:p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border-2 border-blue-100">
              <AvatarImage src={user?.profilePicture} alt="User" />
              <AvatarFallback className="bg-blue-50 text-blue-700">{user?.username?.charAt(0) || 'T'}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">TWT Token</h2>
              <p className="text-gray-500">{user?.username || 'User'}'s wallet</p>
            </div>
          </div>
          <Badge variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200 font-medium">
            Active
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <p className="text-gray-500 text-sm font-medium">Available Balance</p>
            <p className="text-2xl font-bold mt-1">{balance} TWT</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <p className="text-gray-500 text-sm font-medium">Staked Amount</p>
            <p className="text-2xl font-bold mt-1">{staked} TWT</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
            <p className="text-gray-500 text-sm font-medium">Total Value</p>
            <p className="text-2xl font-bold mt-1">${balance + staked}</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Button className="flex-1 py-4 font-medium">Buy Tokens</Button>
          <Button variant="outline" className="flex-1 py-4 font-medium">Transfer</Button>
          <Button variant="outline" className="flex-1 py-4 font-medium">Stake</Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-5 md:p-6 lg:p-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">No recent transactions</p>
          <p className="text-sm text-gray-400">Your transaction history will appear here</p>
        </div>
      </div>
    </div>
  )
}

export default Token