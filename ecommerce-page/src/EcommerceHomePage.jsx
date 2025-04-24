import { useState, useEffect, useRef } from 'react';
import { MapPin, ShoppingBag, ChevronRight, Search, Heart, Home, User, Filter, ArrowDownCircle, X, ShoppingCart, Clock, Menu } from 'lucide-react';
import React from 'react';
import TopNavbar from './components/TopNavbar';
import LocationHeader from './components/LocationHeader';
import FilterSection from './components/FilterSection';
import OfferSection from './components/OfferSection';
import BottomNavbar from './components/BottomNavbar';

export default function EcommerceHomePage() {
  const [location, setLocation] = useState({ 
    latitude: 37.7749, 
    longitude: -122.4194, 
    city: "San Francisco",
    state: "",
    country: "",
    fullAddress: ""
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [sortBy, setSortBy] = useState('distance');
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [offerData, setOfferData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState([
    { id: 'delivery', label: 'Delivery', active: true },
    { id: 'pickup', label: 'Pickup', active: false },
    { id: 'open', label: 'Open Now', active: false },
    { id: 'offers', label: 'Offers', active: false },
  ]);
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
      
      if (data) {
        setLocation({
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
          city: data.city,
          state: data.state_prov,
          country: data.country_name,
          fullAddress: `${data.city}, ${data.state_prov}, ${data.country_name}`
        });
      } else {
        // Fallback to browser geolocation if API fails
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              // Use reverse geocoding to get address details
              const { latitude, longitude } = position.coords;
              const reverseGeocodeResponse = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const reverseData = await reverseGeocodeResponse.json();
              
              setLocation({
                latitude,
                longitude,
                city: reverseData.city || "Current Location",
                state: reverseData.principalSubdivision || "",
                country: reverseData.countryName || "",
                fullAddress: `${reverseData.city || "Current Location"}, ${reverseData.principalSubdivision || ""}, ${reverseData.countryName || ""}`
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

      // Image URLs for different categories
      const categoryImages = {
        grocery: [
          "https://media.istockphoto.com/id/1413204314/photo/happy-man-at-supermarket-store.jpg?s=612x612&w=0&k=20&c=Dn5UI46Z6UmBx2n9kYg56jObHBYoQtxcLjS5ukEuXCE=",
          "https://media.istockphoto.com/id/1157106624/photo/all-your-necessities-stored-in-one-place.jpg?s=612x612&w=0&k=20&c=fANV-CP9N_Dt5lVoKWiZdAch60-2IOeHEm_pnvgk348=",
          "https://media.istockphoto.com/id/521812367/photo/stocked-shelves-in-grocery-store-aisle.jpg?s=612x612&w=0&k=20&c=blKzsyPv0wvd57hqMniFaHALwU6Skx4lq9o4D2QcBBM=",
          "https://media.istockphoto.com/id/1310446879/photo/grocery-store.jpg?s=612x612&w=0&k=20&c=nIEV-UoHxJDP4a8NSoNYVmWqrPQj0RqNily0Yo625Ao="
        ],
        pharmacy: [
          "https://media.istockphoto.com/id/1478342446/photo/black-happy-woman-choosing-smartphone-in-shop.jpg?s=612x612&w=0&k=20&c=vgd3uNTcbdwSHAm8z8ZapGF0FHBGxT7QpM6TKJqOfqw=",
          "https://media.istockphoto.com/id/1405392560/photo/a-shopping-cart-by-a-store-shelf-in-a-supermarket.jpg?s=612x612&w=0&k=20&c=oexmPSYVT814OFCHncXD9yH1t66jbJbvTwbGfikV-mw=",
          "https://media.istockphoto.com/id/1371981344/photo/buying-convenient-food.jpg?s=612x612&w=0&k=20&c=Y0oyIBPf8E-0VLwGBaiey85KwvzLlfhXdq5txvXxNdU=",
          "https://media.istockphoto.com/id/1413204314/photo/happy-man-at-supermarket-store.jpg?s=612x612&w=0&k=20&c=Dn5UI46Z6UmBx2n9kYg56jObHBYoQtxcLjS5ukEuXCE="
        ],
        essentials: [
          "https://media.istockphoto.com/id/1157106624/photo/all-your-necessities-stored-in-one-place.jpg?s=612x612&w=0&k=20&c=fANV-CP9N_Dt5lVoKWiZdAch60-2IOeHEm_pnvgk348=",
          "https://media.istockphoto.com/id/521812367/photo/stocked-shelves-in-grocery-store-aisle.jpg?s=612x612&w=0&k=20&c=blKzsyPv0wvd57hqMniFaHALwU6Skx4lq9o4D2QcBBM=",
          "https://media.istockphoto.com/id/1310446879/photo/grocery-store.jpg?s=612x612&w=0&k=20&c=nIEV-UoHxJDP4a8NSoNYVmWqrPQj0RqNily0Yo625Ao=",
          "https://media.istockphoto.com/id/1405392560/photo/a-shopping-cart-by-a-store-shelf-in-a-supermarket.jpg?s=612x612&w=0&k=20&c=oexmPSYVT814OFCHncXD9yH1t66jbJbvTwbGfikV-mw="
        ],
        general: [
          "https://media.istockphoto.com/id/1371981344/photo/buying-convenient-food.jpg?s=612x612&w=0&k=20&c=Y0oyIBPf8E-0VLwGBaiey85KwvzLlfhXdq5txvXxNdU=",
          "https://media.istockphoto.com/id/1478342446/photo/black-happy-woman-choosing-smartphone-in-shop.jpg?s=612x612&w=0&k=20&c=vgd3uNTcbdwSHAm8z8ZapGF0FHBGxT7QpM6TKJqOfqw=",
          "https://media.istockphoto.com/id/1413204314/photo/happy-man-at-supermarket-store.jpg?s=612x612&w=0&k=20&c=Dn5UI46Z6UmBx2n9kYg56jObHBYoQtxcLjS5ukEuXCE=",
          "https://media.istockphoto.com/id/1157106624/photo/all-your-necessities-stored-in-one-place.jpg?s=612x612&w=0&k=20&c=fANV-CP9N_Dt5lVoKWiZdAch60-2IOeHEm_pnvgk348="
        ]
      };
      
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
          
          // Determine category and get appropriate image
          const offerCategory = category.toLowerCase().includes("grocery") ? "grocery" : 
                              category.toLowerCase().includes("pharmacy") ? "pharmacy" :
                              category.toLowerCase().includes("daily") ? "essentials" : "general";
          
          const categoryImageArray = categoryImages[offerCategory];
          const imageIndex = index % categoryImageArray.length;
          
          return {
            id,
            title: offerTitles[category][index % offerTitles[category].length],
            retailer: randomRetailer,
            distance: parseFloat(distance),
            image: categoryImageArray[imageIndex],
            category: offerCategory,
            price,
            discount,
            expiresIn: Math.floor(Math.random() * 72) + 1, // hours
            popularity: Math.floor(Math.random() * 100) + 1, // score out of 100
            deliveryAvailable: Math.random() > 0.3, // 70% chance of delivery
            pickupAvailable: Math.random() > 0.2, // 80% chance of pickup
            isOpen: Math.random() > 0.1 // 90% chance of being open
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

  // Handle filter changes
  const handleFilterChange = (filterId) => {
    setFilters(filters.map(filter => 
      filter.id === filterId 
        ? { ...filter, active: !filter.active }
        : filter
    ));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters(filters.map(filter => ({ ...filter, active: false })));
  };

  // Filter offers based on search query, category, and active filters
  const filteredOfferSections = offerData.map(section => {
    const filteredOffers = section.offers.filter(offer => {
      // Check search query
      const matchesSearch = !searchQuery || 
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.retailer.toLowerCase().includes(searchQuery.toLowerCase());

      // Check category
      const matchesCategory = filterCategory === 'all' || offer.category === filterCategory;

      // Check delivery/pickup filters
      const deliveryFilter = filters.find(f => f.id === 'delivery');
      const pickupFilter = filters.find(f => f.id === 'pickup');
      const matchesDelivery = !deliveryFilter?.active || offer.deliveryAvailable;
      const matchesPickup = !pickupFilter?.active || offer.pickupAvailable;

      // Check open now filter
      const openFilter = filters.find(f => f.id === 'open');
      const matchesOpen = !openFilter?.active || offer.isOpen;

      // Check offers filter
      const offersFilter = filters.find(f => f.id === 'offers');
      const matchesOffers = !offersFilter?.active || offer.discount > 0;

      // Only apply filters if they are active
      const hasActiveFilters = filters.some(filter => filter.active);
      if (!hasActiveFilters) {
        return matchesSearch && matchesCategory;
      }

      return matchesSearch && matchesCategory && matchesDelivery && matchesPickup && matchesOpen && matchesOffers;
    });

    return {
      ...section,
      offers: filteredOffers
    };
  }).filter(section => section.offers.length > 0);

  // Sort offers by selected criterion
  const sortedOfferSections = filteredOfferSections.map(section => {
    return {
      ...section,
      offers: [...section.offers].sort((a, b) => {
        switch (sortBy) {
          case 'distance':
            return a.distance - b.distance;
          case 'popularity':
            return b.popularity - a.popularity;
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          default:
            return 0;
        }
      })
    };
  });

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

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
    <div className="min-h-screen bg-gray-100 pb-16">
      <TopNavbar 
        cart={cart}
        favorites={favorites}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        onSearch={handleSearch}
      />
      
      <LocationHeader 
        location={location}
        onLocationClick={() => alert('Location selection')}
      />
      
      <FilterSection 
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onSortChange={setSortBy}
        sortBy={sortBy}
      />

      <div className="p-4">
        {sortedOfferSections.map((section) => (
          <OfferSection
            key={section.title}
            section={section}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
            loading={loading}
          />
        ))}
        {sortedOfferSections.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500">No offers found matching your search criteria.</p>
          </div>
        )}
      </div>

      <BottomNavbar />
    </div>
  );
}