import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from './components/Header';
import LocationHandler from './components/LocationHandler';
import SearchAndFilters from './components/SearchAndFilters';
import DashboardStats from './components/DashboardStats';
import NearbyFoodsList from './components/NearbyFoodsList';
import FoodLocationMap from './components/FoodLocationMap';

const BuyerHome = ({ userInfo, onLogout }) => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [nearbyFoods, setNearbyFoods] = useState([]);
  const [isLoadingFoods, setIsLoadingFoods] = useState(false);
  const [foodsError, setFoodsError] = useState('');
  const [selectedRadius, setSelectedRadius] = useState(10); // Default 10km
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);
  const [showMap, setShowMap] = useState(false);

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get location. Please enable location services.');
          setLocationLoading(false);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
      setLocationLoading(false);
    }
  }, []);

  // Fetch nearby foods when location or radius changes
  useEffect(() => {
    if (userLocation && token) {
      fetchNearbyFoods();
    }
  }, [userLocation, selectedRadius, token]);

  const fetchNearbyFoods = async () => {
    if (!userLocation || !token) return;

    setIsLoadingFoods(true);
    setFoodsError('');

    try {
      const requestBody = {
        longitude: userLocation.longitude,
        latitude: userLocation.latitude,
        radiusKm: selectedRadius
      };

      const response = await fetch('http://localhost:8081/ShareBite/api/foods/nearby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Nearby foods fetched:', result);

        if (Array.isArray(result)) {
          setNearbyFoods(result);
        } else if (result.data && Array.isArray(result.data)) {
          setNearbyFoods(result.data);
        } else {
          console.warn('Unexpected response format:', result);
          setNearbyFoods([]);
        }
      } else {
        const errorData = await response.json();
        setFoodsError(errorData.message || 'Failed to fetch nearby foods');
        console.error('Failed to fetch nearby foods:', errorData);
      }
    } catch (error) {
      console.error('Error fetching nearby foods:', error);
      setFoodsError('Network error. Please check your connection.');
    } finally {
      setIsLoadingFoods(false);
    }
  };

  const filteredFoods = nearbyFoods.filter(food => {
    const matchesSearch = food.foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         food.postedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleFoodItemClick = (food) => {
    setSelectedFood(food);
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
    setSelectedFood(null);
  };

  if (locationLoading) {
    return <LocationHandler loading={true} />;
  }

  if (locationError) {
    return <LocationHandler error={locationError} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-100 rounded-full opacity-10"></div>

        {/* Small floating elements */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-green-300 rounded-full"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-emerald-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-green-400 rounded-full"></div>
      </div>

      <Header
        user={user || userInfo}
        userLocation={userLocation}
        onLogout={handleLogout}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative inline-block mb-6">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Discover Food Near You
            </h2>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs">✨</span>
            </div>
          </div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Find delicious meals, reduce waste, and help your community - all in one place! 🌱
          </p>
          <div className="flex justify-center items-center space-x-6 mt-6">
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Real-time updates</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-600">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">GPS-powered search</span>
            </div>
            <div className="flex items-center space-x-2 text-teal-600">
              <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Zero waste mission</span>
            </div>
          </div>
        </div>

        <SearchAndFilters
          searchQuery={searchQuery}
          selectedRadius={selectedRadius}
          isLoadingFoods={isLoadingFoods}
          onSearchChange={setSearchQuery}
          onRadiusChange={setSelectedRadius}
          onRefresh={fetchNearbyFoods}
        />

        <DashboardStats
          filteredFoods={filteredFoods}
          selectedRadius={selectedRadius}
          userLocation={userLocation}
        />

        <NearbyFoodsList
          foods={filteredFoods}
          userLocation={userLocation}
          isLoading={isLoadingFoods}
          error={foodsError}
          selectedRadius={selectedRadius}
          onExpandSearch={() => setSelectedRadius(Math.min(selectedRadius + 10, 50))}
          onFoodItemClick={handleFoodItemClick}
        />

        {/* Map Modal */}
        {showMap && selectedFood && (
          <FoodLocationMap
            foodItem={selectedFood}
            userLocation={userLocation}
            onClose={handleCloseMap}
          />
        )}
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BuyerHome;
