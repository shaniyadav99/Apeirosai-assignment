import { useState, useEffect, useRef } from 'react';
import { MapPin, ShoppingBag, ChevronRight, Search, Heart, Home, User, Filter, ArrowDownCircle, X, ShoppingCart, Clock, Menu } from 'lucide-react';
import React from 'react';

export default function EcommerceHomePage() {
  const [location, setLocation] = useState({ latitude: 37.7749, longitude: -122.4194, city: "San Francisco" });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState('distance'); // distance, popularity
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [offerData, setOfferData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const pullToRefreshRef = useRef(null);
  const startY = useRef(0);

  // Initial data loading
  useEffect(() => {
    fetchLocation();
    fetchOfferData();
  }, []);

  // Effect for refreshing data
  useEffect(() => {
    if (refreshing) {
      fetchOfferData();
      setTimeout(() => {
        setRefreshing(false);
      }, 1500);
    }
  }, [refreshing]);

  // Fetch location using the IPGeolocation API
  const fetchLocation = async () => {
    try {
      const apiKey = "709b953a437d4dffbe7533f981f10e85";
      const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`);
      const data = await response.json();
      
      if (data && data.latitude && data.longitude) {
        setLocation({
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          city: data.city
        });
      } else {
        // Fallback to browser geolocation if API fails
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                city: "Current Location"
              });
            },
            () => {
              console.log("Geolocation permission denied. Using default location.");
            }
          );
        }
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // Fetch and generate offer data based on location
  const fetchOfferData = () => {
    setLoading(true);
    
    // Mock data for offers with random distances based on current location
    const generateOffers = () => {
      const categories = ["Top Offers Near You", "Grocery Deals", "Pharmacy Specials", "Daily Essentials"];
      const retailers = [
        "SuperMart", "FreshMarket", "TechStore", "HomeGoods", "FarmFresh",
        "NaturalMarket", "HealthPharm", "QuickCare", "MedExpress", "BeautyHealth",
        "PetCorner", "KidsMart"
      ];
      
      const offerTitles = {
        "Top Offers Near You": [
          "30% Off First Order", "Buy 1 Get 1 Free", "20% Off Electronics", "$15 Off $50 Purchase",
          "Flash Sale: 40% Off", "Weekend Special", "New Customer Deal", "Loyalty Rewards Extra"
        ],
        "Grocery Deals": [
          "Fresh Produce Sale", "50% Off Bakery Items", "Organic Foods Discount", "Weekly Meat Specials",
          "Buy 2 Get 1 Free Dairy", "Bulk Purchase Discount", "Weekend Fruit Special", "Imported Goods Sale"
        ],
        "Pharmacy Specials": [
          "2 for 1 Vitamins", "25% Off OTC Medication", "Free Flu Shot w/ Purchase", "Skincare Bundle Deal",
          "Senior Discount Day", "Health Check Discount", "Supplement Sale", "First Aid Kit Special"
        ],
        "Daily Essentials": [
          "Household Cleaning Sale", "Pet Supplies Discount", "Baby Products Bundle", "Paper Products Sale",
          "Personal Care Bundle", "Laundry Products Deal", "Kitchen Essentials Sale", "Home Storage Special"
        ]
      };

      // Generate random offers with distances that make sense based on location
      return categories.map((category, categoryIndex) => {
        const offers = Array(8).fill().map((_, index) => {
          const id = categoryIndex * 100 + index + 1;
          const randomRetailer = retailers[Math.floor(Math.random() * retailers.length)];
          // Generate a more realistic distance (closer stores more likely)
          const distance = (Math.random() * 3 + 0.2).toFixed(1);
          const price = Math.floor(Math.random() * 50) + 5;
          const discount = Math.floor(Math.random() * 30) + 10;
          
          return {
            id,
            title: offerTitles[category][index % offerTitles[category].length],
            retailer: randomRetailer,
            distance: parseFloat(distance),
            image: `/api/placeholder/${120 + index}/${120 + index}`,
            category: category.toLowerCase().includes("grocery") ? "grocery" : 
                    category.toLowerCase().includes("pharmacy") ? "pharmacy" :
                    category.toLowerCase().includes("daily") ? "essentials" : "general",
            price,
            discount,
            expiresIn: Math.floor(Math.random() * 72) + 1, // hours
            popularity: Math.floor(Math.random() * 100) + 1 // score out of 100
          };
        });
        
        return {
          title: category,
          offers: offers
        };
      });
    };
    
    setTimeout(() => {
      setOfferData(generateOffers());
      setLoading(false);
    }, 1500);
  };

  // Pull to refresh functionality
  useEffect(() => {
    const handleTouchStart = (e) => {
      startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const currentY = e.touches[0].clientY;
      const scrollTop = document.documentElement.scrollTop;
      
      // Only trigger pull-to-refresh if at the top of the page
      if (scrollTop === 0 && currentY > startY.current) {
        const pullDistance = currentY - startY.current;
        
        // Set refreshing state when pulled enough
        if (pullDistance > 100 && !refreshing) {
          setRefreshing(true);
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [refreshing]);

  // Toggle favorite status
  const toggleFavorite = (offerId) => {
    if (favorites.includes(offerId)) {
      setFavorites(favorites.filter(id => id !== offerId));
    } else {
      setFavorites([...favorites, offerId]);
    }
  };

  // Add item to cart
  const addToCart = (offer) => {
    const existingItem = cart.find(item => item.id === offer.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === offer.id ? {...item, quantity: item.quantity + 1} : item
      ));
    } else {
      setCart([...cart, {...offer, quantity: 1}]);
    }
  };

  // Filter offers by category
  const filteredOfferSections = offerData.map(section => {
    if (filterCategory === 'all') {
      return section;
    }
    
    return {
      ...section,
      offers: section.offers.filter(offer => offer.category === filterCategory)
    };
  });

  // Sort offers by selected criterion
  const sortedOfferSections = filteredOfferSections.map(section => {
    return {
      ...section,
      offers: [...section.offers].sort((a, b) => {
        if (sortBy === 'distance') {
          return a.distance - b.distance;
        } else if (sortBy === 'popularity') {
          return b.popularity - a.popularity;
        }
        return 0;
      })
    };
  });

  // Skeleton loading component
  const SkeletonLoading = () => (
    <div className="flex flex-col min-h-screen bg-gray-50 animate-pulse">
      {/* Top Navbar Skeleton */}
      <div className="bg-blue-600 text-white">
        <div className="flex items-center justify-between p-3">
          <div className="w-24 h-5 bg-blue-400 rounded"></div>
          <div className="flex space-x-4">
            <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
            <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
            <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-40 h-4 ml-2 bg-gray-200 rounded"></div>
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
        
        <div className="px-4 pb-3">
          <div className="flex items-center px-3 py-2 bg-gray-100 rounded-lg">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="w-full h-4 ml-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Hero Banner Skeleton */}
      <div className="p-4">
        <div className="h-36 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Offer Sections Skeleton */}
      {[1, 2, 3, 4].map((section) => (
        <section key={section} className="mt-2 mb-6">
          <div className="flex items-center justify-between px-4 mb-2">
            <div className="w-32 h-6 bg-gray-200 rounded"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </div>
          
          <div className="pl-4 overflow-x-auto">
            <div className="flex gap-3 pb-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex-shrink-0 w-36 overflow-hidden bg-white rounded-lg shadow-sm">
                  <div className="w-full h-32 bg-gray-200"></div>
                  <div className="p-2">
                    <div className="w-full h-4 mb-2 bg-gray-200 rounded"></div>
                    <div className="w-24 h-3 mb-2 bg-gray-200 rounded"></div>
                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );

  if (loading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Pull to refresh indicator */}
      {refreshing && (
        <div className="fixed top-0 left-0 right-0 flex items-center justify-center p-2 bg-blue-500 z-50">
          <ArrowDownCircle className="w-5 h-5 mr-2 text-white animate-spin" />
          <span className="text-white">Refreshing...</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="bg-blue-600 text-white">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center">
            <button 
              className="mr-3"
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-lg font-bold">ShopNearby</span>
          </div>
          <div className="flex items-center space-x-4">
            <button>
              <Search className="w-5 h-5" />
            </button>
            <button className="relative" onClick={() => alert(`${cart.length} items in cart`)}>
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full transform translate-x-1 -translate-y-1">
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={() => alert(`${favorites.length} favorite offers`)}>
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-red-200' : 'text-white'}`} />
            </button>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar pb-2 px-2">
          {['All', 'Grocery', 'Pharmacy', 'Fashion', 'Tech', 'Food', 'Home'].map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1 mx-1 text-xs font-medium rounded-full whitespace-nowrap ${
                cat.toLowerCase() === filterCategory || (cat === 'All' && filterCategory === 'all')
                  ? 'bg-white text-blue-600' 
                  : 'bg-blue-500 text-white'
              }`}
              onClick={() => setFilterCategory(cat === 'All' ? 'all' : cat.toLowerCase())}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Side Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMenu(false)}
          ></div>
          <div className="relative w-64 max-w-xs bg-white h-full shadow-xl animate-slideRight">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setShowMenu(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-2">
              {['Home', 'Categories', 'Deals', 'Orders', 'Wishlist', 'Account', 'Settings', 'Help'].map((item) => (
                <button 
                  key={item}
                  className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-100"
                  onClick={() => {
                    alert(`Navigating to ${item}`);
                    setShowMenu(false);
                  }}
                >
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Location Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center p-4">
          <div className="flex items-center flex-1">
            <MapPin className="w-5 h-5 text-blue-500" />
            <span className="ml-1 text-sm font-medium">
              {location.city || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
            </span>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center px-4 pb-3">
          <div className="flex items-center flex-1 px-3 py-2 bg-gray-100 rounded-lg">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for products, stores, offers..." 
              className="w-full ml-2 text-sm bg-transparent outline-none"
            />
          </div>
          <button 
            className="flex items-center justify-center w-10 h-10 ml-2 text-blue-500"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Filter options */}
        {showFilters && (
          <div className="px-4 py-3 bg-white border-t border-gray-100 animate-slideDown">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Filter & Sort</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-3">
              <p className="mb-2 text-sm font-medium text-gray-700">Categories</p>
              <div className="flex flex-wrap gap-2">
                {['all', 'grocery', 'pharmacy', 'essentials', 'general'].map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      filterCategory === category 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setFilterCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Sort By</p>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    sortBy === 'distance' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setSortBy('distance')}
                >
                  Nearest
                </button>
                <button
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    sortBy === 'popularity' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setSortBy('popularity')}
                >
                  Most Popular
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-16" ref={pullToRefreshRef}>
        {/* Hero Banner */}
        <div className="p-4">
          <div className="relative overflow-hidden rounded-lg h-36 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="absolute inset-0 flex flex-col justify-center p-6">
              <h2 className="text-xl font-bold text-white">Welcome Back!</h2>
              <p className="mt-1 text-sm text-blue-100">We found {sortedOfferSections.reduce((total, section) => total + section.offers.length, 0)} great deals near you.</p>
              <button className="flex items-center justify-center px-4 py-1 mt-3 text-sm font-medium text-blue-500 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors duration-200 w-36">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Filter status indicators */}
        {(filterCategory !== 'all' || sortBy !== 'distance') && (
          <div className="flex items-center px-4 mb-2">
            <p className="text-xs text-gray-500">
              {filterCategory !== 'all' && `Filtering: ${filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)}`}
              {filterCategory !== 'all' && sortBy !== 'distance' && ' | '}
              {sortBy !== 'distance' && `Sorting: ${sortBy === 'popularity' ? 'Most Popular' : 'Nearest'}`}
            </p>
            <button 
              className="ml-2 text-xs text-blue-500"
              onClick={() => {
                setFilterCategory('all');
                setSortBy('distance');
              }}
            >
              Reset
            </button>
          </div>
        )}

        {/* Offer Sections */}
        {sortedOfferSections.map((section) => (
          section.offers.length > 0 && (
            <section key={section.title} className="mt-2 mb-6">
              <div className="flex items-center justify-between px-4 mb-2">
                <h2 className="text-lg font-bold">{section.title}</h2>
                <button className="flex items-center text-sm font-medium text-blue-500">
                  See All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="pl-4 overflow-x-auto hide-scrollbar">
                <div className="flex gap-3 pb-2">
                  {section.offers.map((offer) => (
                    <div 
                      key={offer.id} 
                      className="flex-shrink-0 w-36 overflow-hidden bg-white rounded-lg shadow-sm transform transition-transform duration-200 hover:scale-105"
                    >
                      <div className="relative">
                        <img 
                          src={offer.image} 
                          alt={offer.title}
                          className="object-cover w-full h-28"
                        />
                        <button 
                          className="absolute top-2 right-2 p-1 bg-white bg-opacity-70 rounded-full transition-colors duration-200"
                          onClick={() => toggleFavorite(offer.id)}
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(offer.id) ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
                        </button>
                        <div className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                          {offer.discount}% OFF
                        </div>
                      </div>
                      <div className="p-2">
                        <h3 className="font-medium text-gray-800 truncate">{offer.title}</h3>
                        <p className="text-sm text-gray-600 truncate">{offer.retailer}</p>
                        <div className="flex items-center mt-1 mb-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {offer.distance} km away
                        </div>
                        <div className="flex items-center mb-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Expires in {offer.expiresIn}h
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs line-through text-gray-400">${(offer.price * (100 / (100 - offer.discount))).toFixed(2)}</span>
                            <span className="ml-1 text-sm font-bold text-blue-600">${offer.price}</span>
                          </div>
                          <button 
                            className="p-1 text-white bg-blue-500 rounded-full transition-colors duration-200 hover:bg-blue-600"
                            onClick={() => addToCart(offer)}
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        ))}

        {/* Empty state for filtered results */}
        {sortedOfferSections.every(section => section.offers.length === 0) && (
          <div className="flex flex-col items-center justify-center p-8">
            <Search className="w-12 h-12 text-gray-300" />
            <p className="mt-4 text-gray-500">No offers found with the current filters</p>
            <button 
              className="px-4 py-2 mt-3 font-medium text-white bg-blue-500 rounded-lg"
              onClick={() => {
                setFilterCategory('all');
                setSortBy('distance');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around">
          <button className="flex flex-col items-center justify-center flex-1 py-2 text-blue-500">
            <Home className="w-6 h-6" />
            <span className="mt-1 text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center flex-1 py-2 text-gray-500">
            <Search className="w-6 h-6" />
            <span className="mt-1 text-xs font-medium">Search</span>
          </button>
          <button className="flex flex-col items-center justify-center flex-1 py-2 text-gray-500 relative">
            <ShoppingBag className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-6 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                {cart.length}
              </span>
            )}
            <span className="mt-1 text-xs font-medium">Orders</span>
          </button>
          <button className="flex flex-col items-center justify-center flex-1 py-2 text-gray-500">
            <User className="w-6 h-6" />
            <span className="mt-1 text-xs font-medium">Account</span>
          </button>
        </div>
      </nav>

      {/* Add custom CSS for scroll behavior and animations */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slideDown {
          from { max-height: 0; opacity: 0; }
          to { max-height: 300px; opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
          overflow: hidden;
        }
        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slideRight {
          animation: slideRight 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}