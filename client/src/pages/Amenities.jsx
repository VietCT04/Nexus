//Amenities.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '../contexts/UserContext';
import { toast } from 'react-toastify';
import { 
  HiArrowLeft, 
  HiMapPin, 
  HiStar,
  HiClock,
  HiPhone,
  HiGlobeAlt
} from 'react-icons/hi2';
import logoImage from '../assets/landscapelogo.png'; 
import bgdImage from '../assets/bgd.png';
import defaultAm from "../assets/defaultAmenities.png";
import { GOOGLE_MAPS_AK } from './API_KEYS.jsx';

const loadGoogleMapsScript = (callback) => {
  const existingScript = document.getElementById('googleMapsScript');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_AK}&libraries=places`;
    script.id = 'googleMapsScript';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  } else if (callback) {
    callback();
  }
};

const NearbyAmenities = () => {
  const { userProfile } = useUser();
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [amenityType, setAmenityType] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [map, setMap] = useState(null);
  const [nation, setNation] = useState("");
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (userProfile && userProfile.nationality) {
      setNation(userProfile.nationality);
    }
  }, [userProfile]);

  const initializeMap = useCallback(() => {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
        setLocation(currentLocation);
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: currentLocation,
          zoom: 15,
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ saturation: -20 }]
            }
          ]
        });
        setMap(map);
      }, (error) => {
        console.error("Geolocation error:", error);
        toast.error('Geolocation error. Please enable location services.');
      });
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    loadGoogleMapsScript(initializeMap);
  }, [initializeMap]);

  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null)); 
    setMarkers([]); 
  };

const waitForMapIdle = (m, msFallback = 800) =>
  new Promise((resolve) => {
    if (!m) return resolve();

    const center = m.getCenter();
    const bounds = m.getBounds();
    const zoom = m.getZoom();
    if (center && bounds && typeof zoom === 'number') {
      return setTimeout(resolve, 0);
    }

    const once = window.google.maps.event.addListenerOnce(m, 'idle', () => {
      try { window.google.maps.event.removeListener(once); } catch {}
      resolve();
    });

    setTimeout(() => {
      try { window.google.maps.event.removeListener(once); } catch {}
      resolve(); // don’t block if idle never fires
    }, msFallback);
  });

  const fetchAmenities = async () => {
    if (!window.google?.maps?.places) {
      toast.error('Google Places not loaded yet. Please wait a moment and try again.');
      return;
    }
    if (!map) {
      toast.error('Map is not ready yet.');
      return;
    }
    if (!amenityType) {
      toast.info('Please select an amenity type first.');
      return;
    }

    await waitForMapIdle(map);

    const centerLatLng = map.getCenter();
    if (!centerLatLng) {
      toast.error('Missing map center. Reload the page and try again.');
      return;
    }
    const center = centerLatLng.toJSON();

    clearMarkers();

    const request = {
      location: center,        // LatLngLiteral
      radius: 500,             // number (meters)
      type: amenityType,       // string (NOT an array) e.g. "bus_station"
    };
    if ((amenityType === 'restaurant' || amenityType === 'grocery_or_supermarket') && nation) {
      request.keyword = nation;
    }

    // 6) perform the search with full status handling
    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, async (results = [], status) => {
      const Status = window.google.maps.places.PlacesServiceStatus;
      console.log('nearbySearch status:', status);

      if (status === Status.OK && Array.isArray(results) && results.length) {
        // create markers
        const newMarkers = results.map((place) => {
          const marker = new window.google.maps.Marker({
            position: place.geometry.location,
            map,
            title: place.name,
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 8px;">
                <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600;">${place.name}</h3>
                <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${place.vicinity ?? ''}</p>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.vicinity ?? place.name)}"
                  target="_blank" style="color: #f97316; text-decoration: none; font-weight: 500;">
                  View on Google Maps →
                </a>
              </div>
            `,
          });

          marker.addListener('click', () => {
            if (window.currentInfoWindow) window.currentInfoWindow.close();
            window.currentInfoWindow = infoWindow;
            infoWindow.open({ anchor: marker, map, shouldFocus: false });
          });

          return marker;
        });

        setMarkers(newMarkers);

        // fetch details for first 5 places
        const details = await Promise.all(
          results.slice(0, 5).map(
            (place) =>
              new Promise((resolve) => {
                service.getDetails({ placeId: place.place_id }, (detail, s) => {
                  if (s === Status.OK && detail) {
                    const photoUrl =
                      detail.photos?.[0]?.getUrl({ maxWidth: 300, maxHeight: 200 }) || defaultAm;
                    const openingHours =
                      detail.opening_hours?.weekday_text || ['Opening hours not available'];

                    resolve({
                      name: detail.name,
                      vicinity: detail.vicinity,
                      rating: detail.rating ?? 'N/A',
                      openNow: detail.opening_hours
                        ? (detail.opening_hours.open_now ? 'Open' : 'Closed')
                        : 'Unknown',
                      reviews: detail.reviews || [],
                      photoUrl,
                      openingHours,
                      phone: detail.formatted_phone_number || null,
                      website: detail.website || null,
                    });
                  } else {
                    resolve(null);
                  }
                });
              })
          )
        );

        setAmenities(details.filter(Boolean));
        return;
      }

      // explicit non-OK statuses
      if (status === Status.ZERO_RESULTS) {
        toast.info('No amenities found nearby.');
        setAmenities([]);
        return;
      }
      if (status === Status.REQUEST_DENIED) {
        toast.error('Places request denied. Check API key restrictions and ensure Places API is enabled.');
        return;
      }
      if (status === Status.INVALID_REQUEST) {
        toast.error('Invalid request sent to Places. Double-check parameters.');
        return;
      }
      if (status === Status.OVER_QUERY_LIMIT) {
        toast.error('You hit the query limit. Try again later.');
        return;
      }
      if (status === Status.UNKNOWN_ERROR) {
        toast.error('Temporary Places error. Please try again.');
        return;
      }

      // fallback
      toast.error('Search failed. Please try again later.');
    });
  };

  const handleAmenityTypeChange = (value) => {
    setAmenityType(value);
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const amenityOptions = [
    { value: 'subway_station', label: 'MRT Station', icon: '🚇', gradient: 'from-purple-500 to-pink-500' },
    { value: 'bus_station', label: 'Bus Stop', icon: '🚌', gradient: 'from-blue-500 to-cyan-500' },
    { value: 'hospital', label: 'Hospital', icon: '🏥', gradient: 'from-red-500 to-rose-500' },
    { value: 'restaurant', label: `${nation} Eateries`, icon: '🍽️', gradient: 'from-orange-500 to-amber-500' },
    { value: 'grocery_or_supermarket', label: `${nation} Shops`, icon: '🛒', gradient: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgdImage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-amber-50/70 to-orange-100/80 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-slate-900/80" />
      
      {/* Container */}
      <div className="h-full w-full overflow-y-auto relative z-10">
        <div className="max-w-6xl w-full mx-auto flex flex-col min-h-full p-4 sm:p-6 lg:p-8">
          
          {/* Header */}
          <div className="glass-card mb-6 p-4 sm:p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            <div className="flex items-center justify-between">
              {/* Back Button */}
              <button
                onClick={handleBackClick}
                className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
                aria-label="Back"
              >
                <HiArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  Back
                </span>
              </button>

              {/* Logo - Centered */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <img 
                  src={logoImage} 
                  alt="NexusNTU Logo" 
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>

              {/* Spacer */}
              <div className="w-20 sm:w-24"></div>
            </div>
          </div>

          {/* Title Card */}
          <div className="glass-card mb-6 p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            <div className="flex items-center justify-center gap-3">
              <HiMapPin className="w-8 h-8 text-orange-500" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center">
                  Nearby Amenities
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
                  Discover places around you
                </p>
              </div>
            </div>
          </div>

          {/* Amenity Type Selection */}
          <div className="glass-card mb-6 p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Amenity Type
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {amenityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAmenityTypeChange(option.value)}
                  className={`group p-4 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50 ${
                    amenityType === option.value
                      ? 'bg-gradient-to-br ' + option.gradient + ' shadow-lg scale-105'
                      : 'bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <p className={`text-xs font-semibold text-center ${
                    amenityType === option.value
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {option.label}
                  </p>
                </button>
              ))}
            </div>
            
            {/* Search Button */}
            <button 
              onClick={fetchAmenities}
              disabled={!amenityType}
              className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
              Find Nearest Amenities
            </button>
          </div>

          {/* Map */}
          <div className="glass-card mb-6 p-4 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl overflow-hidden">
            <div 
              id="map" 
              className="w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden"
            />
          </div>

          {/* Amenities List */}
          {amenities.length > 0 && (
            <div className="space-y-4 pb-6">
              {amenities.map((amenity, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl hover:shadow-2xl transition-all duration-300"
                  style={{ animation: `fadeIn 0.6s ease-out ${index * 0.1}s both` }}
                >
                  {/* Main Content */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    {/* Image */}
                    <div className="w-full sm:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-slate-700">
                      <img 
                        src={amenity.photoUrl} 
                        alt={amenity.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {amenity.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <HiMapPin className="w-5 h-5 text-orange-500" />
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {amenity.vicinity}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        {/* Rating */}
                        {amenity.rating !== 'N/A' && (
                          <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                            <HiStar className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {amenity.rating}
                            </span>
                          </div>
                        )}

                        {/* Status */}
                        <div className={`px-3 py-1 rounded-lg ${
                          amenity.openNow === 'Open'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : amenity.openNow === 'Closed'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}>
                          <span className="text-sm font-semibold">
                            {amenity.openNow}
                          </span>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="flex flex-wrap gap-3">
                        {amenity.phone && (
                          <a 
                            href={`tel:${amenity.phone}`}
                            className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <HiPhone className="w-4 h-4" />
                            {amenity.phone}
                          </a>
                        )}
                        {amenity.website && (
                          <a 
                            href={amenity.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <HiGlobeAlt className="w-4 h-4" />
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Opening Hours */}
                  {amenity.openingHours[0] !== 'Opening hours not available' && (
                    <details className="mb-4">
                      <summary className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                        <HiClock className="w-4 h-4" />
                        Opening Hours
                      </summary>
                      <div className="mt-2 ml-6 space-y-1">
                        {amenity.openingHours.map((line, idx) => (
                          <p key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                            {line}
                          </p>
                        ))}
                      </div>
                    </details>
                  )}

                  {/* Reviews */}
                  {amenity.reviews.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Reviews
                      </h4>
                      <div className="space-y-2">
                        {amenity.reviews.slice(0, 3).map((review, reviewIdx) => (
                          <div 
                            key={reviewIdx}
                            className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50"
                          >
                            <p className="text-sm text-gray-700 dark:text-gray-300 italic mb-1">
                              "{review.text}"
                            </p>
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                              — {review.author_name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {amenities.length === 0 && (
            <div className="glass-card p-12 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl text-center">
              <HiMapPin className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Select an amenity type and search to see results
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .glass-card {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.2)
          );
        }
        
        .dark .glass-card {
          background: linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.4),
            rgba(15, 23, 42, 0.2)
          );
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        details summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default NearbyAmenities;