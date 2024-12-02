'use client'
import { useState, useEffect } from 'react'
import { getAllRewards, getUserByEmail } from '@/utils/db/action'
import { Loader, Award, User, Trophy, Crown } from 'lucide-react'
import { toast } from 'react-hot-toast'

type Reward = {
  id: number
  userId: number
  points: number
  level: number
  createdAt: Date
  userName: string | null
}

// Function to generate anonymous username
const generateAnonymousName = (originalName: string | null): string => {
  if (!originalName) return 'Anonymous User';
  
  const prefix = originalName.slice(0, Math.min(5, originalName.length));
  const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}#${randomSuffix}`;
}

export default function LeaderboardPage() {
  const [rewards, setRewards] = useState<Reward[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ id: number; email: string; name: string } | null>(null)

    const getUniqueUserRewards = (rewards: Reward[]): Reward[] => {
    const userMap = new Map<number, Reward>();
    
    rewards.forEach(reward => {
      const existingReward = userMap.get(reward.userId);
      if (!existingReward || existingReward.points < reward.points) {
        userMap.set(reward.userId, reward);
      }
    });
    
    return Array.from(userMap.values());
  };

  useEffect(() => {
    const fetchRewardsAndUser = async () => {
      setLoading(true)
      try {
        const fetchedRewards = await getAllRewards()
        const uniqueRewards = getUniqueUserRewards(fetchedRewards);
        // Anonymize usernames
        const anonymizedRewards = uniqueRewards.map(reward => ({
          ...reward,
          userName: generateAnonymousName(reward.userName)
        }))
        setRewards(anonymizedRewards)

        const userEmail = localStorage.getItem('userEmail')
        if (userEmail) {
          const fetchedUser = await getUserByEmail(userEmail)
          if (fetchedUser) {
            setUser(fetchedUser)
          } else {
            toast.error('User not found. Please log in again.')
          }
        }
      } catch (error) {
        console.error('Error fetching rewards and user:', error)
        toast.error('Failed to load leaderboard. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchRewardsAndUser()
  }, [])

 return (
  <div className="p-8">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Leaderboard</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin h-8 w-8 text-gray-600" />
        </div>
      ) : rewards.length === 0 ? (
        <div className="bg-white shadow-xl rounded-2xl p-8 text-center">
          <Trophy className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-700">No Rankings Yet</h3>
          <p className="text-gray-500 mt-2">Be the first to earn points!</p>
        </div>
      ) : (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
            <div className="flex justify-between items-center text-white">
              <Trophy className="h-10 w-10" />
              <span className="text-2xl font-bold">Top Performers</span>
              <Award className="h-10 w-10" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Level</th>
                </tr>
              </thead>
              <tbody>
                {rewards
                  .sort((a, b) => b.points - a.points)
                  .map((reward, index) => (
                    <tr 
                      key={reward.id} 
                      className={`
                        ${user && user.id === reward.userId ? 'bg-indigo-50' : ''}
                        ${index === 0 ? 'bg-yellow-50' : ''}
                        ${index === 1 ? 'bg-gray-50' : ''}
                        ${index === 2 ? 'bg-orange-50' : ''}
                        hover:bg-opacity-75 transition-colors duration-150 ease-in-out
                      `}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {index < 3 ? (
                            <Crown 
                              className={`h-6 w-6 ${
                                index === 0 ? 'text-orange-400' : 
                                index === 1 ? 'text-gray-400' : 
                                'text-orange-400'
                              }`} 
                            />
                          ) : (
                            <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <User className={`h-full w-full rounded-full p-2 ${
                              index === 0 ? 'bg-yellow-100 text-yellow-600' :
                              index === 1 ? 'bg-gray-200 text-gray-600' :
                              index === 2 ? 'bg-orange-100 text-orange-600' :
                              'bg-gray-200 text-gray-500'
                            }`} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900" title={`Anonymous User #${reward.id}`}>
                              {reward.userName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-indigo-500 mr-2" />
                          <div className="text-sm font-semibold text-gray-900">
                            {reward.points.toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-gray-100 text-gray-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-indigo-100 text-indigo-800'
                        }`}>
                          Level {reward.level}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  </div>
)
}