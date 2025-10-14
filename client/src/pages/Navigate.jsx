//Navigate.jsx
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { toast } from 'react-toastify';
import { 
  HiArrowLeft, 
  HiMapPin,
  HiClock,
  HiArrowLongRight,
  HiMagnifyingGlass
} from 'react-icons/hi2';
import logoImage from '../assets/landscapelogo.png'; 
import bgdImage from '../assets/bgd.png';
import { GOOGLE_MAPS_AK } from './API_KEYS.jsx';

const MapWithRoute = () => {
  const [startLocation, setStartLocation] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState(null);
  const [startLocText, setStartText] = useState("");
  const [destLocText, setDestText] = useState("");
  const [userIsTypingStart, setUserIsTypingStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tripDetails, setTripDetails] = useState({
    steps: [],
    duration: '',
    distance: '',
  });
  const defaultCenter = { lat: -34.397, lng: 150.644 };

  useEffect(() => {
    setOrigin(defaultCenter);
  }, []);

  const handlePlaceSelect = (updateFunction, setTextFunction) => (autocomplete) => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      console.log('No details available for input: ' + place.name);
      return;
    }
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    updateFunction(location);
    setTextFunction(place.name);
    setUserIsTypingStart(false);
  };

  const handleDestInput = (e) => {
    console.log(e.target.value);
    setDestText(e.target.value);
  };

  const fetchDirections = (start, end) => {
    if (startLocText === "" || destLocText === "") {
      toast.info("Please fill all input fields!");
      return;
    }

    if (start.lat === end.lat && start.long === end.long) {
      toast.info("Start and End destination cannot be same!");
      return;
    }

    setLoading(true);
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: window.google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true,
      },
      (result, status) => {
        setLoading(false);
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          const route = result.routes[0];
          const leg = route.legs[0];
          const steps = leg.steps.map(step => ({
            instruction: step.instructions,
            distance: step.distance.text,
            duration: step.duration.text,
          }));
          const duration = leg.duration.text;
          const distance = leg.distance.text;
          setTripDetails({
            steps,
            duration,
            distance,
          });
        } else {
          toast.info("No route could be found!");
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  const handleSelectCurrentLocationStart = () => {
    setStartText("Your Current Location");
    setUserIsTypingStart(false); 
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLocation = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      setOrigin(currentLocation);
    }, (error) => {
      toast.error("Could not get your location. Please enable location services.");
      console.error(error);
    });
  };

  const handleInputChange = (e) => {
    setStartText(e.target.value);
    setUserIsTypingStart(true); 
  };

  const handleLoadStart = (autocomplete) => {
    autocomplete.addListener('place_changed', () => handlePlaceSelect(setOrigin, setStartText)(autocomplete));
  };

  const handleLoadDestination = (autocomplete) => {
    autocomplete.addListener('place_changed', () => handlePlaceSelect(setDestination, setDestText)(autocomplete));
  };

  const handleBackClick = () => {
    window.history.back();
  };

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
                  Navigate
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">
                  Find your way with public transit
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Inputs & Map */}
            <div className="space-y-6">
              {/* Map */}
              <div className="glass-card p-4 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl overflow-hidden">
                <LoadScript
                  googleMapsApiKey={GOOGLE_MAPS_AK}
                  libraries={['places']}
                >
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '400px', borderRadius: '12px' }}
                    center={origin || defaultCenter}
                    zoom={14}
                    options={{
                      styles: [
                        {
                          featureType: "all",
                          elementType: "geometry",
                          stylers: [{ saturation: -20 }]
                        }
                      ]
                    }}
                  >
                    {directions && <DirectionsRenderer directions={directions} />}
                  </GoogleMap>
                </LoadScript>
              </div>

              {/* Input Section */}
              <div className="glass-card p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Plan Your Route
                </h3>

                <LoadScript
                  googleMapsApiKey={GOOGLE_MAPS_AK}
                  libraries={['places']}
                >
                  {/* Start Location */}
                  <div className="space-y-3 mb-4">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Starting Point
                    </label>
                    <Autocomplete onLoad={handleLoadStart}>
                      <div className="relative">
                        <HiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                        <input
                          type="text"
                          placeholder="Enter start location"
                          value={userIsTypingStart ? startLocText : (startLocText || '')}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all"
                        />
                      </div>
                    </Autocomplete>
                    <button
                      onClick={handleSelectCurrentLocationStart}
                      className="w-full py-2 px-4 rounded-lg bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50"
                    >
                      📍 Use Current Location
                    </button>
                  </div>

                  {/* Destination */}
                  <div className="space-y-3 mb-6">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Destination
                    </label>
                    <Autocomplete onLoad={handleLoadDestination}>
                      <div className="relative">
                        <HiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                        <input
                          type="text"
                          placeholder="Enter destination"
                          onChange={handleDestInput}
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-500/50 transition-all"
                        />
                      </div>
                    </Autocomplete>
                  </div>

                  {/* Find Route Button */}
                  <button
                    onClick={() => fetchDirections(startLocation || origin, destination)}
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Finding Route...
                      </>
                    ) : (
                      <>
                        <HiMagnifyingGlass className="w-6 h-6" />
                        Find Route
                      </>
                    )}
                  </button>
                </LoadScript>
              </div>
            </div>

            {/* Right Column - Trip Details */}
            <div className="glass-card p-6 rounded-2xl border border-white/20 backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <HiArrowLongRight className="w-6 h-6 text-orange-500" />
                Trip Details
              </h3>

              {tripDetails.distance && tripDetails.duration ? (
                <div className="space-y-4">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-1">
                        <HiMapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-semibold text-blue-800 dark:text-blue-300">Distance</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {tripDetails.distance}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-1">
                        <HiClock className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span className="text-xs font-semibold text-green-800 dark:text-green-300">Duration</span>
                      </div>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                        {tripDetails.duration}
                      </p>
                    </div>
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Step-by-Step Directions
                    </h4>
                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                      {tripDetails.steps.map((step, index) => (
                        <div 
                          key={index}
                          className="p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all"
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div 
                                className="text-sm text-gray-900 dark:text-white mb-2"
                                dangerouslySetInnerHTML={{ __html: step.instruction }}
                              />
                              <div className="flex flex-wrap gap-3 text-xs">
                                <span className="px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
                                  {step.distance}
                                </span>
                                <span className="px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium">
                                  {step.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <HiMapPin className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Enter locations and find a route to see trip details
                  </p>
                </div>
              )}
            </div>
          </div>
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

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251, 146, 60, 0.5);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 146, 60, 0.7);
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
      `}</style>
    </div>
  );
};

export default MapWithRoute;