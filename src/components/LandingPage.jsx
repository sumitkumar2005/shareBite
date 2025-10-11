import { useState } from 'react';

const LandingPage = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      icon: "🍽️",
      title: "Reduce Food Waste",
      description: "Help businesses and individuals sell surplus food instead of throwing it away",
      color: "from-green-400 to-green-600"
    },
    {
      icon: "💰",
      title: "Save Money",
      description: "Get quality meals at discounted prices while supporting sustainability",
      color: "from-orange-400 to-orange-600"
    },
    {
      icon: "🌍",
      title: "Help the Planet",
      description: "Every meal saved contributes to a more sustainable future for our planet",
      color: "from-blue-400 to-blue-600"
    }
  ];

  const useCases = [
    {
      title: "Restaurants & Cafes",
      description: "Sell end-of-day surplus meals at discounted prices",
      icon: "🏪",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop"
    },
    {
      title: "Grocery Stores",
      description: "Offer near-expiry products to conscious consumers",
      icon: "🛒",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop"
    },
    {
      title: "Home Cooks",
      description: "Share extra portions with your community",
      icon: "👨‍🍳",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-green-100 to-green-200">
        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-200 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-1/4 right-10 w-16 h-16 bg-green-300 rounded-full opacity-40" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-green-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              <span className="block">Share Food,</span>
              <span className="block bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Save the Planet
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect surplus food with people who need it. Reduce waste, save money,
              and build a more sustainable community together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => onNavigate('signup')}
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Get Started Free
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="w-full sm:w-auto border-2 border-green-500 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all duration-200"
              >
                Sign In
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 animate-count-up">50K+</div>
                <div className="text-gray-600">Meals Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700 animate-count-up">1000+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-800 animate-count-up">200+</div>
                <div className="text-gray-600">Partner Stores</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FoodShare?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Making a difference has never been this easy and rewarding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className={`mx-auto w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mb-6 text-2xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-16 bg-gradient-to-br from-green-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Who Can Use FoodShare?
            </h2>
            <p className="text-xl text-gray-600">
              Perfect for businesses and individuals who care about sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-6xl">{useCase.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to start making a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* For Sellers */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                🏪
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Food Providers</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                  <p className="text-gray-600">List your surplus food with photos and details</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                  <p className="text-gray-600">Set your discounted price and pickup time</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                  <p className="text-gray-600">Get notified when someone wants to buy</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4</div>
                  <p className="text-gray-600">Hand over the food and earn money!</p>
                </div>
              </div>
            </div>

            {/* For Buyers */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                🛒
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">For Food Buyers</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                  <p className="text-gray-600">Browse available food near your location</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                  <p className="text-gray-600">Choose what you want at great prices</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                  <p className="text-gray-600">Reserve and pay for your selection</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4</div>
                  <p className="text-gray-600">Pick up your food and enjoy!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-green-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already reducing food waste and saving money
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('signup')}
              className="w-full sm:w-auto bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Sharing Food Today
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-200"
            >
              I Already Have an Account
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🍽️</span>
            <span className="text-xl font-bold">FoodShare</span>
          </div>
          <p className="text-gray-400">
            Making the world more sustainable, one meal at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
