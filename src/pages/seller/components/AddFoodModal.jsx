const AddFoodModal = ({
  show,
  formData,
  userLocation,
  isSubmitting,
  submitError,
  onClose,
  onInputChange,
  onSubmit
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-green-100 w-full max-w-md transform animate-scale-in">
        {/* Decorative header */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-t-3xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Add New Food Item</h3>
                <p className="text-green-100 text-sm">Share food with your community</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-200 backdrop-blur-sm group"
            >
              <svg className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Floating particles */}
          <div className="absolute top-4 right-20 w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
          <div className="absolute bottom-4 left-20 w-1 h-1 bg-green-300 rounded-full animate-ping"></div>
        </div>

        <div className="p-6">
          {submitError && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg animate-shake">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-red-600 text-sm font-medium">{submitError}</p>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Food Name Field */}
            <div className="group">
              <label htmlFor="foodName" className="block text-sm font-semibold text-gray-700 mb-2">
                🍽️ Food Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="foodName"
                  name="foodName"
                  value={formData.foodName}
                  onChange={onInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  placeholder="e.g., Fresh Pizza Slices"
                />
                <div className="absolute inset-0 border-2 border-green-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            </div>

            {/* Servings Field */}
            <div className="group">
              <label htmlFor="servings" className="block text-sm font-semibold text-gray-700 mb-2">
                👥 Number of Servings
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="servings"
                  name="servings"
                  value={formData.servings}
                  onChange={onInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  placeholder="e.g., 10"
                />
                <div className="absolute inset-0 border-2 border-green-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            </div>

            {/* Best Before Field */}
            <div className="group">
              <label htmlFor="bestBefore" className="block text-sm font-semibold text-gray-700 mb-2">
                ⏰ Best Before (hours)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="bestBefore"
                  name="bestBefore"
                  value={formData.bestBefore}
                  onChange={onInputChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/20 outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  placeholder="e.g., 10"
                />
                <div className="absolute inset-0 border-2 border-green-500 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>
            </div>

            {/* Location Display */}
            {userLocation && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-4 rounded-xl animate-slide-in">
                <div className="flex items-center space-x-2 text-green-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-sm">📍 Your Location</p>
                    <p className="text-xs">{userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 border border-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !userLocation}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Add Food</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.4s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-slide-in { animation: slide-in 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default AddFoodModal;
