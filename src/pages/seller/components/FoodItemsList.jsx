import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

const FoodItemsList = ({ foodItems, onFoodDeleted }) => {
  const { token } = useAuth();
  const [deletingItems, setDeletingItems] = useState(new Set());

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDeleteFood = async (foodId) => {
    if (deletingItems.has(foodId)) return; // Prevent multiple delete requests

    setDeletingItems(prev => new Set(prev).add(foodId));

    try {
      const response = await fetch(`http://localhost:8081/ShareBite/api/foods/delete/${foodId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Call the callback to refresh the food list
        if (onFoodDeleted) {
          onFoodDeleted(foodId);
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to delete food item:', errorData);
        alert('Failed to delete food item. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting food:', error);
      alert('Network error. Please try again.');
    } finally {
      setDeletingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(foodId);
        return newSet;
      });
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-green-100 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 px-6 py-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Your Food Items</h2>
              <p className="text-green-100 text-sm">{foodItems.length} items shared</p>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-300 rounded-full"></div>
            <span className="text-white text-sm font-medium">Live</span>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-4 right-20 w-2 h-2 bg-white/40 rounded-full"></div>
        <div className="absolute bottom-3 left-1/4 w-1 h-1 bg-green-300 rounded-full"></div>
      </div>

      <div className="p-6">
        {foodItems.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-3 h-3 bg-green-300 rounded-full"></div>
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6 relative">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-200 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No food items yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Start making a difference! Add your first food item to help reduce waste and feed your community. 🌱
            </p>
            <div className="inline-flex items-center space-x-2 text-green-600 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <span>Click "Add Food Item" above</span>
            </div>
          </div>
        ) : (
          /* Food Items Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-100 relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.available ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                      'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                    }`}
                  >
                    {item.available ? 'Available' : 'Not Available'}
                  </span>
                </div>

                {/* Food emoji based on name */}
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {item.foodName.toLowerCase().includes('pizza') ? '🍕' :
                   item.foodName.toLowerCase().includes('pasta') ? '🍝' :
                   item.foodName.toLowerCase().includes('sandwich') ? '🥪' :
                   item.foodName.toLowerCase().includes('burger') ? '🍔' :
                   item.foodName.toLowerCase().includes('cake') ? '🎂' :
                   item.foodName.toLowerCase().includes('bread') ? '🍞' :
                   item.foodName.toLowerCase().includes('slice') ? '🍰' : '🍽️'}
                </div>

                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-green-600 transition-colors">
                    {item.foodName}
                  </h3>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2 group-hover:text-green-600 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="font-medium">{item.servings} servings</span>
                  </div>

                  <div className="flex items-center space-x-2 group-hover:text-orange-600 transition-colors">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-xs">Best before: {formatDate(item.bestBefore)}</span>
                  </div>

                  <div className="flex items-center space-x-2 group-hover:text-purple-600 transition-colors">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-xs">
                      📍 {item.location?.coordinates ?
                        `${item.location.coordinates[1].toFixed(4)}, ${item.location.coordinates[0].toFixed(4)}` :
                        'Location not available'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 group-hover:text-gray-600 transition-colors">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M3 7h18l-2 13H5L3 7z" />
                      </svg>
                    </div>
                    <span className="font-medium text-xs">Posted: {formatDate(item.postedOn)}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-5 flex space-x-2">
                  <button
                    onClick={() => handleDeleteFood(item.id)}
                    disabled={deletingItems.has(item.id)}
                    className={`flex-1 ${
                      deletingItems.has(item.id) 
                        ? 'bg-gray-200 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-red-100 to-pink-100 hover:from-red-200 hover:to-pink-200'
                    } text-red-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-1`}
                  >
                    {deletingItems.has(item.id) ? (
                      <>
                        <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                        <span>Removing...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Remove</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-2 left-2 w-1 h-1 bg-yellow-300 rounded-full"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItemsList;
