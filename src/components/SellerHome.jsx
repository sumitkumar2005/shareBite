import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SellerHome = ({ userInfo, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddForm, setShowAddForm] = useState(false);

  // Mock data for seller's listings
  const myListings = [
    {
      id: 1,
      title: "Fresh Pizza Slices",
      originalPrice: 15.99,
      discountedPrice: 6.99,
      status: "active",
      views: 24,
      interested: 3,
      image: "🍕",
      timeLeft: "2h 30m",
      quantity: "4 slices"
    },
    {
      id: 2,
      title: "Homemade Pasta",
      originalPrice: 18.00,
      discountedPrice: 7.99,
      status: "sold",
      views: 18,
      interested: 2,
      image: "🍝",
      timeLeft: "Sold",
      quantity: "2 portions"
    },
    {
      id: 3,
      title: "Fresh Sandwiches",
      originalPrice: 12.99,
      discountedPrice: 5.49,
      status: "pending",
      views: 12,
      interested: 1,
      image: "🥪",
      timeLeft: "1h 15m",
      quantity: "3 sandwiches"
    }
  ];

  const recentOrders = [
    {
      id: 1,
      buyer: "Sarah M.",
      item: "Fresh Pizza Slices",
      amount: "$6.99",
      status: "completed",
      time: "2 hours ago"
    },
    {
      id: 2,
      buyer: "John D.",
      item: "Homemade Pasta",
      amount: "$7.99",
      status: "pickup",
      time: "1 hour ago"
    }
  ];

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">$47.97</div>
          <div className="text-sm text-gray-600">Today's Earnings</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">3</div>
          <div className="text-sm text-gray-600">Active Listings</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-orange-600">54</div>
          <div className="text-sm text-gray-600">Total Views</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-purple-600">4.8</div>
          <div className="text-sm text-gray-600">Rating</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex flex-col items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all"
          >
            <span className="text-2xl mb-2">➕</span>
            <span className="text-sm font-medium text-green-700">Add Food</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all">
            <span className="text-2xl mb-2">👀</span>
            <span className="text-sm font-medium text-blue-700">View Stats</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all">
            <span className="text-2xl mb-2">📱</span>
            <span className="text-sm font-medium text-orange-700">Messages</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all">
            <span className="text-2xl mb-2">⚙️</span>
            <span className="text-sm font-medium text-purple-700">Settings</span>
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {order.buyer.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{order.buyer}</div>
                  <div className="text-sm text-gray-600">{order.item}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">{order.amount}</div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {order.status === 'completed' ? '✅ Completed' : '📦 Pickup'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ListingsView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">My Food Listings</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-green-600 hover:to-green-700 transition-all"
        >
          + Add New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Status Badge */}
            <div className="relative">
              <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-4xl">{listing.image}</span>
              </div>
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                listing.status === 'active' ? 'bg-green-100 text-green-800' :
                listing.status === 'sold' ? 'bg-gray-100 text-gray-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{listing.title}</h4>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-green-600">${listing.discountedPrice}</span>
                  <span className="text-sm text-gray-500 line-through">${listing.originalPrice}</span>
                </div>
                <span className="text-sm text-gray-600">📦 {listing.quantity}</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>👀 {listing.views} views</span>
                <span>❤️ {listing.interested} interested</span>
                <span>⏰ {listing.timeLeft}</span>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                  Edit
                </button>
                <button className="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AddFoodForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Add New Food Item</h3>
          <button
            onClick={() => setShowAddForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Food Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="e.g., Fresh Pizza Slices"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="Describe your food item..."
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
              <input
                type="number"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="15.99"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Price</label>
              <input
                type="number"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="6.99"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none">
              <option>Select category</option>
              <option>Restaurant</option>
              <option>Grocery</option>
              <option>Bakery</option>
              <option>Homemade</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Until</label>
            <input
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Available</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="e.g., 4 slices, 2 portions"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all"
            >
              Add Food
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-lg">🏪</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Seller Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your food listings</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <span className="text-xl">👤</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'listings'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 My Listings
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'dashboard' ? <DashboardView /> : <ListingsView />}
      </div>

      {/* Add Food Form Modal */}
      {showAddForm && <AddFoodForm />}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button className="flex flex-col items-center p-2 text-orange-600">
            <span className="text-xl mb-1">🏪</span>
            <span className="text-xs font-medium">Dashboard</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-xl mb-1">📋</span>
            <span className="text-xs">Listings</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-xl mb-1">📊</span>
            <span className="text-xs">Analytics</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-xl mb-1">💬</span>
            <span className="text-xs">Messages</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-xl mb-1">👤</span>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
