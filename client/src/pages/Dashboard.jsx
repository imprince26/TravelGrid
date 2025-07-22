import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, Calendar, Heart, Settings, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    { label: 'Trips Planned', value: '12', icon: <MapPin className="w-6 h-6" /> },
    { label: 'Countries Visited', value: '8', icon: <Calendar className="w-6 h-6" /> },
    { label: 'Saved Places', value: '24', icon: <Heart className="w-6 h-6" /> },
  ];

  const recentTrips = [
    { destination: 'Paris, France', date: '2024-03-15', status: 'Completed' },
    { destination: 'Tokyo, Japan', date: '2024-06-20', status: 'Upcoming' },
    { destination: 'Bali, Indonesia', date: '2024-08-10', status: 'Planning' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-pink-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full border-4 border-pink-400"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">Welcome back, {user.name}!</h1>
                <p className="text-gray-300">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="text-pink-400">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Trips */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">Recent Trips</h2>
          <div className="space-y-4">
            {recentTrips.map((trip, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{trip.destination}</h3>
                  <p className="text-gray-300 text-sm">{trip.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  trip.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                  trip.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {trip.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;