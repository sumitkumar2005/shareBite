const DashboardStats = ({ filteredFoods, selectedRadius, userLocation }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      {/* Available Foods Card */}
      <div className="group relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 rounded-3xl p-8 shadow-xl border border-green-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full -translate-y-10 translate-x-10 opacity-30 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-green-700 mb-2 tracking-wide uppercase">Available Foods</p>
            <p className="text-4xl font-black text-green-800 mb-1">{filteredFoods.length}</p>
            <p className="text-xs text-green-600 font-medium">
              {filteredFoods.length === 0 ? 'No items found' :
               filteredFoods.length === 1 ? 'item ready to share' :
               'items ready to share'}
            </p>
          </div>
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
              <span className="text-3xl">🍽️</span>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-yellow-800">{filteredFoods.length}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full bg-green-200/50 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.min((filteredFoods.length / 10) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Search Radius Card */}
      <div className="group relative bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 rounded-3xl p-8 shadow-xl border border-emerald-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full -translate-y-10 translate-x-10 opacity-30 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-emerald-700 mb-2 tracking-wide uppercase">Search Radius</p>
            <p className="text-4xl font-black text-emerald-800 mb-1">{selectedRadius}</p>
            <p className="text-xs text-emerald-600 font-medium">kilometers around you</p>
          </div>
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
              <span className="text-3xl">📍</span>
            </div>
            <div className="absolute -bottom-2 -right-2 flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-emerald-600">
          <span>Close</span>
          <span className="font-semibold">Current: {selectedRadius}km</span>
          <span>Far</span>
        </div>
      </div>

      {/* Location Card */}
      <div className="group relative bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 rounded-3xl p-8 shadow-xl border border-teal-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-200 to-cyan-300 rounded-full -translate-y-10 translate-x-10 opacity-30 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-teal-700 mb-2 tracking-wide uppercase">Your Location</p>
            <div className="space-y-1">
              {userLocation ? (
                <>
                  <p className="text-lg font-black text-teal-800 truncate">
                    {userLocation.latitude.toFixed(4)}°N
                  </p>
                  <p className="text-lg font-black text-teal-800 truncate">
                    {userLocation.longitude.toFixed(4)}°E
                  </p>
                </>
              ) : (
                <p className="text-lg font-black text-teal-800">Loading...</p>
              )}
            </div>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-xs text-teal-600 font-medium">GPS Active</span>
            </div>
          </div>
          <div className="relative ml-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-500">
              <span className="text-3xl">🗺️</span>
            </div>
            <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ping opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
