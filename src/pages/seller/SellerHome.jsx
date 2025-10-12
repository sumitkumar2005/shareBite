import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from './components/Header';
import LocationHandler from './components/LocationHandler';
import DashboardStats from './components/DashboardStats';
import AddFoodButton from './components/AddFoodButton';
import AddFoodModal from './components/AddFoodModal';
import FoodItemsList from './components/FoodItemsList';

const SellerHome = ({ userInfo, onLogout }) => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormData, setAddFormData] = useState({
    foodName: '',
    servings: '',
    bestBefore: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitFood = async (e) => {
    e.preventDefault();

    if (!userLocation) {
      setSubmitError('Location is required to add food items.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const foodData = {
        foodName: addFormData.foodName,
        servings: parseInt(addFormData.servings),
        bestBefore: parseInt(addFormData.bestBefore),
        longitude: userLocation.longitude,
        latitude: userLocation.latitude
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      // Add Bearer token if available
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('http://localhost:8081/ShareBite/api/foods/addFood', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(foodData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Food added successfully:', result);

        // Reset form
        setAddFormData({
          foodName: '',
          servings: '',
          bestBefore: ''
        });
        setShowAddForm(false);

        // Add the new food item to the list with animation
        const newItem = {
          ...foodData,
          id: result.id || Date.now(),
          status: 'active',
          createdAt: new Date().toISOString()
        };
        setFoodItems(prev => [newItem, ...prev]);
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.message || 'Failed to add food item');
      }
    } catch (error) {
      console.error('Error adding food:', error);
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  if (locationLoading) {
    return <LocationHandler loading={true} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-100 rounded-full opacity-10 animate-pulse delay-500"></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-green-300 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-emerald-300 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-teal-300 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-20 right-20 w-4 h-4 bg-green-400 rounded-full animate-pulse delay-1000"></div>
      </div>

      <Header
        user={user || userInfo}
        userLocation={userLocation}
        onLogout={handleLogout}
      />

      <LocationHandler
        loading={false}
        error={locationError}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Share food, reduce waste, help your community 🌱
          </p>
        </div>

        <DashboardStats foodItems={foodItems} />

        <AddFoodButton
          userLocation={userLocation}
          onClick={() => setShowAddForm(true)}
        />

        <AddFoodModal
          show={showAddForm}
          formData={addFormData}
          userLocation={userLocation}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onClose={() => setShowAddForm(false)}
          onInputChange={handleInputChange}
          onSubmit={handleSubmitFood}
        />

        <FoodItemsList foodItems={foodItems} />
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

export default SellerHome;
