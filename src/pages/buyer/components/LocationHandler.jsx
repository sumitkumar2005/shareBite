const LocationHandler = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-green-200/50 max-w-md mx-auto">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-green-300 border-t-green-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-emerald-400 rounded-full animate-pulse mx-auto"></div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Finding Your Location</h3>
          <p className="text-gray-600 mb-4">We're getting your precise location to show you the best nearby food options...</p>
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center bg-white/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-red-200/50 max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">Location Required</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Try Again
            </button>
            <p className="text-xs text-gray-500">
              💡 Make sure location permissions are enabled in your browser
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LocationHandler;
