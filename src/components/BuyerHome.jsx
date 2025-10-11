import { useState } from 'react';

const BuyerHome = ({ userInfo, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for available food listings
  const foodListings = [
    {
      id: 1,
      title: "Fresh Pizza Slices",
      seller: "Tony's Pizzeria",
      originalPrice: 15.99,
      discountedPrice: 6.99,
      discount: 56,
      category: "restaurant",
      image: "🍕",
      distance: "0.5 km",
      rating: 4.5,
      pickupTime: "Available until 8 PM",
      quantity: "4 slices remaining"
    },
    {
      id: 2,
      title: "Organic Vegetables Bundle",
      seller: "Green Market",
      originalPrice: 12.50,
      discountedPrice: 4.99,
      discount: 60,
      category: "grocery",
      image: "🥬",
      distance: "1.2 km",
      rating: 4.8,
      pickupTime: "Available until 6 PM",
      quantity: "3 bundles left"
    },
    {
      id: 3,
      title: "Homemade Lasagna",
      seller: "Maria's Kitchen",
      originalPrice: 20.00,
      discountedPrice: 8.99,
      discount: 55,
      category: "homemade",
      image: "🍝",
      distance: "0.8 km",
      rating: 4.9,
      pickupTime: "Available until 7 PM",
      quantity: "2 portions left"
    },
    {
      id: 4,
      title: "Fresh Bakery Items",
      seller: "Sunrise Bakery",
      originalPrice: 8.99,
      discountedPrice: 3.49,
      discount: 61,
      category: "bakery",
      image: "🥐",
      distance: "2.1 km",
      rating: 4.3,
      pickupTime: "Available until 9 PM",
      quantity: "Mixed items available"
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍕' },
    { id: 'grocery', name: 'Grocery', icon: '🥬' },
    { id: 'bakery', name: 'Bakery', icon: '🥐' },
    { id: 'homemade', name: 'Homemade', icon: '🏠' }
  ];

  const filteredListings = foodListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-lg">🍽️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Welcome back!</h1>
                <p className="text-sm text-gray-600">Find great deals near you</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <span className="text-xl">👤</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for food near you..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none shadow-sm"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span>{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-xs text-gray-600">Meals Saved</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-orange-600">$89</div>
            <div className="text-xs text-gray-600">Money Saved</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">4.8</div>
            <div className="text-xs text-gray-600">Avg Rating</div>
          </div>
        </div>

        {/* Food Listings */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Available Near You ({filteredListings.length})
          </h2>

          {filteredListings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No food found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredListings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Image Section */}
                  <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    <span className="text-4xl">{listing.image}</span>
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{listing.discount}%
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{listing.title}</h3>
                      <div className="flex items-center text-yellow-400 text-xs">
                        ⭐ {listing.rating}
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-2">{listing.seller}</p>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-green-600">${listing.discountedPrice}</span>
                        <span className="text-sm text-gray-500 line-through">${listing.originalPrice}</span>
                      </div>
                      <span className="text-xs text-gray-500">📍 {listing.distance}</span>
                    </div>

                    <div className="text-xs text-gray-600 mb-3">
                      <div>⏰ {listing.pickupTime}</div>
                      <div>📦 {listing.quantity}</div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-green-600 hover:to-green-700 transition-all">
                      Reserve Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button className="flex flex-col items-center p-2 text-green-600">
            <span className="text-xl mb-1">🏠</span>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-xl mb-1">🔍</span>
            <span className="text-xs">Search</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-xl mb-1">📋</span>
            <span className="text-xs">Orders</span>
          </button>
          <button className="flex flex-col items-center p-2 text-gray-400">
            <span className="text-xl mb-1">❤️</span>
            <span className="text-xs">Favorites</span>
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

export default BuyerHome;
