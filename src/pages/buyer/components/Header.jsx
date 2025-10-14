import ShareBiteLogo from '../../../assets/ShareBite.png';

const Header = ({ user, userLocation, onLogout }) => {
  return (
    <header className="relative z-10 bg-white/95 backdrop-blur-lg shadow-lg border-b border-green-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="flex-shrink-0">
                <img
                    src={ShareBiteLogo}
                    alt="ShareBite"
                    className="h-10 w-auto"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ShareBite
              </h1>
              <p className="text-sm font-medium text-gray-600 flex items-center">

                Food Sharing Platform
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-xl border border-green-200/50">
              <p className="text-sm font-semibold text-gray-800">Welcome back!</p>
              <p className="text-xs text-green-600 font-medium">{user?.email}</p>
              <div className="flex items-center justify-end mt-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
                <span className="text-xs text-gray-500">Location active</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="group relative bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:via-pink-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </span>
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
