const DashboardStats = ({ foodItems }) => {
  const activeListings = foodItems.filter(item => item.status !== 'sold').length;
  const totalShared = foodItems.filter(item => item.status === 'sold').length;

  const stats = [
    {
      title: "Total Food Items",
      value: foodItems.length,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      delay: "delay-0"
    },
    {
      title: "Active Listings",
      value: activeListings,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      delay: "delay-150"
    },
    {
      title: "Food Shared",
      value: totalShared,
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      delay: "delay-300"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm rounded-2xl shadow-lg border ${stat.borderColor} p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-fade-in-up ${stat.delay} group cursor-pointer relative`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1 group-hover:text-gray-700 transition-colors">
                {stat.title}
              </p>
              <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-200">
                {stat.value}
              </p>
            </div>
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
              {stat.icon}
            </div>
          </div>

          {/* Progress bar animation */}
          <div className="mt-4 bg-white/50 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000 ease-out animate-progress`}
              style={{ width: `${Math.min((stat.value / 10) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes progress {
          from {
            width: 0%;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-progress {
          animation: progress 2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DashboardStats;
