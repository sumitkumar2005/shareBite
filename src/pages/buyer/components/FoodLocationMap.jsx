import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for buyer and seller
const buyerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const sellerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const FoodLocationMap = ({ foodItem, userLocation, onClose }) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState(null);

  if (!foodItem || !userLocation || !foodItem.location?.coordinates) {
    return null;
  }

  const sellerLocation = {
    lat: foodItem.location.coordinates[1],
    lng: foodItem.location.coordinates[0]
  };

  const buyerLocation = {
    lat: userLocation.latitude,
    lng: userLocation.longitude
  };

  // Fetch actual route from OpenRouteService
  useEffect(() => {
    const fetchRoute = async () => {
      setIsLoadingRoute(true);
      setRouteError(null);

      try {
        // Using OpenRouteService API (free tier)
        const apiKey = '5b3ce3597851110001cf6248c4d3b2d1a98d47b4be924e40ad32b7f6'; // Free API key
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${buyerLocation.lng},${buyerLocation.lat}&end=${sellerLocation.lng},${sellerLocation.lat}`;

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();

          if (data.features && data.features.length > 0) {
            const route = data.features[0];
            const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);

            setRouteCoordinates(coordinates);
            setRouteInfo({
              distance: (route.properties.segments[0].distance / 1000).toFixed(1), // km
              duration: Math.round(route.properties.segments[0].duration / 60), // minutes
              steps: route.properties.segments[0].steps || []
            });
          }
        } else {
          throw new Error('Failed to fetch route');
        }
      } catch (error) {
        console.error('Error fetching route:', error);
        setRouteError('Unable to fetch route');

        // Fallback to straight line
        const fallbackRoute = [
          [buyerLocation.lat, buyerLocation.lng],
          [sellerLocation.lat, sellerLocation.lng]
        ];
        setRouteCoordinates(fallbackRoute);
      } finally {
        setIsLoadingRoute(false);
      }
    };

    fetchRoute();
  }, [buyerLocation.lat, buyerLocation.lng, sellerLocation.lat, sellerLocation.lng]);

  // Calculate center point and zoom level
  const centerLat = (sellerLocation.lat + buyerLocation.lat) / 2;
  const centerLng = (sellerLocation.lng + buyerLocation.lng) / 2;

  // Calculate distance for zoom level
  const latDiff = Math.abs(sellerLocation.lat - buyerLocation.lat);
  const lngDiff = Math.abs(sellerLocation.lng - buyerLocation.lng);
  const maxDiff = Math.max(latDiff, lngDiff);

  let zoom = 10;
  if (maxDiff < 0.01) zoom = 15;
  else if (maxDiff < 0.05) zoom = 13;
  else if (maxDiff < 0.1) zoom = 12;
  else if (maxDiff < 0.5) zoom = 10;
  else zoom = 8;

  const calculateStraightDistance = () => {
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (sellerLocation.lat - buyerLocation.lat) * Math.PI / 180;
    const dLng = (sellerLocation.lng - buyerLocation.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(buyerLocation.lat * Math.PI / 180) * Math.cos(sellerLocation.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distance.toFixed(1)}km`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-green-200/50 max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 px-6 py-4 relative">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">🗺️ Route to Food Location</h3>
              <p className="text-green-100 text-sm">{foodItem.foodName} by {foodItem.postedBy}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-200 transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex h-[600px]">
          {/* Map Container */}
          <div className="flex-1 relative">
            <MapContainer
              center={[centerLat, centerLng]}
              zoom={zoom}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Buyer Location Marker */}
              <Marker position={[buyerLocation.lat, buyerLocation.lng]} icon={buyerIcon}>
                <Popup>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">📍 Your Location</div>
                    <div className="text-sm text-gray-600">Start Point</div>
                  </div>
                </Popup>
              </Marker>

              {/* Seller Location Marker */}
              <Marker position={[sellerLocation.lat, sellerLocation.lng]} icon={sellerIcon}>
                <Popup>
                  <div className="text-center">
                    <div className="font-semibold text-red-600">🍽️ {foodItem.foodName}</div>
                    <div className="text-sm text-gray-600">by {foodItem.postedBy}</div>
                    <div className="text-xs text-gray-500 mt-1">Destination</div>
                  </div>
                </Popup>
              </Marker>

              {/* Actual Route Line */}
              {routeCoordinates.length > 0 && (
                <Polyline
                  positions={routeCoordinates}
                  color="#10B981"
                  weight={5}
                  opacity={0.8}
                />
              )}
            </MapContainer>

            {/* Loading Overlay */}
            {isLoadingRoute && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-700 font-medium">Calculating route...</span>
                </div>
              </div>
            )}
          </div>

          {/* Directions Sidebar */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
            <div className="p-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Directions
              </h4>

              {/* Route Info */}
              {routeInfo && !isLoadingRoute && (
                <div className="bg-white rounded-xl p-4 mb-4 border border-green-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{routeInfo.distance} km</div>
                      <div className="text-xs text-gray-500">Distance</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{routeInfo.duration} min</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Route Error */}
              {routeError && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center text-orange-800">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-sm">Showing direct route</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Straight distance: {calculateStraightDistance()}
                  </div>
                </div>
              )}

              {/* Turn-by-turn directions */}
              {routeInfo?.steps && routeInfo.steps.length > 0 && (
                <div className="space-y-3">
                  {routeInfo.steps.map((step, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 hover:border-green-300 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-green-600">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-800">
                            {step.instruction || 'Continue straight'}
                          </div>
                          {step.distance && (
                            <div className="text-xs text-gray-500 mt-1">
                              {step.distance > 1000
                                ? `${(step.distance / 1000).toFixed(1)} km`
                                : `${Math.round(step.distance)} m`}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No directions available */}
              {!isLoadingRoute && (!routeInfo?.steps || routeInfo.steps.length === 0) && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 013.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">Turn-by-turn directions not available</p>
                  <p className="text-gray-400 text-xs mt-1">Follow the route shown on the map</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Your Location</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Food Location</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-0.5 bg-green-500"></div>
                <span className="text-sm text-gray-700">Driving Route</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => window.open(`https://www.google.com/maps/dir/${buyerLocation.lat},${buyerLocation.lng}/${sellerLocation.lat},${sellerLocation.lng}`, '_blank')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Open in Google Maps</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodLocationMap;
