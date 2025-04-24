# ShopNearby - E-commerce Application

A modern e-commerce application built with React and Tailwind CSS that allows users to browse products, view offers, and make purchases. The application features a responsive design that works seamlessly across mobile and desktop devices.

## 🚀 Live Demo

[Live Demo](https://apeirosai-assignment.vercel.app/)

## ✨ Features

- **Responsive Design**: Works flawlessly on both mobile and desktop devices
- **Location-based Services**: Automatically detects user location for nearby offers
- **Product Categories**: Browse products by categories (Grocery, Pharmacy, Essentials, etc.)
- **Search Functionality**: Search for specific products or offers
- **Shopping Cart**: Add products to cart and manage quantities
- **Favorites**: Save favorite products for quick access
- **Filters & Sorting**: Filter products by delivery, pickup, open status, and offers
- **Real-time Updates**: Pull-to-refresh functionality for latest offers
- **Skeleton Loading**: Smooth loading states for better user experience

## 🛠️ Tech Stack

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Location Services**: IP Geolocation API
- **Responsive Images**: Aspect ratio based image sizing
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/shaniyadav99/Apeirosai-assignment.git
```

2. Navigate to the project directory:

```bash
cd Apeirosai-assignment/ecommerce-page
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit:

```
http://localhost:5173
```

## 🏗️ Project Structure

```
ecommerce-page/
├── src/
│   ├── components/
│   │   ├── BottomNavbar.jsx
│   │   ├── CartButton.jsx
│   │   ├── CategoryNav.jsx
│   │   ├── FavoriteButton.jsx
│   │   ├── FilterSection.jsx
│   │   ├── LocationHeader.jsx
│   │   ├── OfferSection.jsx
│   │   ├── ProductCard.jsx
│   │   ├── SearchBar.jsx
│   │   └── TopNavbar.jsx
│   ├── App.jsx
│   ├── EcommerceHomePage.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── public/
└── package.json
```

## 🔧 Key Components

### EcommerceHomePage.jsx

- Main application component
- Handles state management
- Implements location detection
- Manages product data and filters

### OfferSection.jsx

- Displays product offers in a grid layout
- Implements responsive image handling
- Manages favorite and cart functionality

### ProductCard.jsx

- Individual product display component
- Handles product image display
- Manages add to cart and wishlist functionality

### FilterSection.jsx

- Implements filtering and sorting options
- Handles delivery, pickup, and open status filters
- Manages price and popularity sorting

## 🎨 Styling Features

- **Responsive Images**: Images maintain 4:3 aspect ratio across all screen sizes
- **Modern UI**: Clean and intuitive interface
- **Loading States**: Skeleton loading for better UX
- **Interactive Elements**: Hover effects and transitions
- **Mobile-First Design**: Optimized for all screen sizes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [IP Geolocation API](https://ipgeolocation.io/) for location services

## 📞 Contact

For any queries or suggestions, please feel free to reach out!

---

Made with ❤️ by [Your Name]
