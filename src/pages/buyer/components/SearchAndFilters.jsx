const SearchAndFilters = ({
  searchQuery,
  selectedRadius,
  isLoadingFoods,
  onSearchChange,
  onRadiusChange,
  onRefresh
}) => {
  return (
    <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-green-200/50 p-8 mb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-100 to-green-100 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>

      <div className="relative z-10">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">🔍 Discover Amazing Food</h3>
          <p className="text-gray-600">Find delicious meals near you and help reduce food waste</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Enhanced Search */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search Food</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-green-500 group-focus-within:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Pizza, burger, or seller name..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border-2 border-green-200/50 rounded-2xl leading-5 bg-white/80 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Radius Selection */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Search Distance</label>
            <div className="relative">
              <select
                value={selectedRadius}
                onChange={(e) => onRadiusChange(parseInt(e.target.value))}
                className="block w-full py-4 px-4 border-2 border-green-200/50 rounded-2xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer appearance-none"
              >
                <option value={10}>📍 Within 10 km</option>
                <option value={20}>🚗 Within 20 km</option>
                <option value={30}>🛣️ Within 30 km</option>
                <option value={40}>🌆 Within 40 km</option>
                <option value={50}>🌍 Within 50 km</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Enhanced Refresh Button */}
          <div className="flex flex-col justify-end">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Update Results</label>
            <button
              onClick={onRefresh}
              disabled={isLoadingFoods}
              className="group relative w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="relative z-10 flex items-center justify-center space-x-2">
                {isLoadingFoods ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Find Food</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
