const NearbyFoodsList = ({
  foods,
  userLocation,
  isLoading,
  error,
  selectedRadius,
  onExpandSearch
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const calculateDistance = (food) => {
    if (!userLocation || !food.location?.coordinates) return 'Unknown';

    const lat1 = userLocation.latitude;
    const lon1 = userLocation.longitude;
    const lat2 = food.location.coordinates[1];
    const lon2 = food.location.coordinates[0];

    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    return distance < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distance.toFixed(1)}km`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-green-100 overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 px-6 py-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative">
          <h3 className="text-xl font-bold text-white">Nearby Food Items</h3>
          <p className="text-green-100 text-sm">Fresh food available within {selectedRadius}km</p>
        </div>
      </div>

      <div className="p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-green-300 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Finding food near you...</p>
          </div>
        ) : foods.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No food items found</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Try increasing your search radius or check back later for new listings.
            </p>
            <button
              onClick={onExpandSearch}
              className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-colors"
            >
              Expand Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food, index) => (
              <div
                key={food.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-100 relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      food.available ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                      'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                    }`}
                  >
                    {food.available ? 'Available' : 'Not Available'}
                  </span>
                  <div className="text-sm text-gray-500 font-medium">
                    📍 {calculateDistance(food)}
                  </div>
                </div>

                {/* Food emoji */}
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {food.foodName.toLowerCase().includes('pizza') ? '🍕' :
                   food.foodName.toLowerCase().includes('pasta') ? '🍝' :
                   food.foodName.toLowerCase().includes('sandwich') ? '🥪' :
                   food.foodName.toLowerCase().includes('burger') ? '🍔' :
                   food.foodName.toLowerCase().includes('cake') ? '🎂' :
                   food.foodName.toLowerCase().includes('bread') ? '🍞' :
                   food.foodName.toLowerCase().includes('slice') ? '🍰' : '🍽️'}
                </div>

                <div className="mb-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {food.foodName}
                  </h3>
                  <p className="text-sm text-gray-600">by {food.postedBy}</p>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span>{food.servings} servings</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs">Best before: {formatDate(food.bestBefore)}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M3 7h18l-2 13H5L3 7z" />
                      </svg>
                    </div>
                    <span className="text-xs">Posted: {formatDate(food.postedOn)}</span>
                  </div>
                </div>

                {/* Action button */}
                <div className="mt-5">
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H17M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                    </svg>
                    <span>Request Food</span>
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

export default NearbyFoodsList;
