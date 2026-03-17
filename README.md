# PRONTO — Pizza & Sushi Delivery App

A cross-platform mobile food delivery application built with **React Native** and **Expo**, featuring an animated product catalog, shopping cart, wishlist, topping customization, and delivery map.

## Screenshots

<!-- Add your screenshots here -->
<!-- ![Home Screen](screenshots/home.png) ![Cart](screenshots/cart.png) ![Product Details](screenshots/modal.png) -->

## Tech Stack

- **React Native** 0.81 + **Expo SDK 54** (New Architecture enabled)
- **TypeScript** (strict mode)
- **Expo Router 6** — file-based navigation with typed routes
- **Zustand 5** — lightweight state management
- **React Native Reanimated 4** — scroll-based header animations (60 fps)
- **react-native-maps** — delivery zone map
- **expo-linear-gradient** — gradient UI elements
- **expo-haptics** — tactile feedback on iOS

## Features

### Catalog & Search
- Animated collapsible header with smooth scroll transitions
- Real-time product search
- Category filter tabs (Pizza, Sushi, Burgers, Lunch, Sets, Combo)
- Product cards with "NEW" / "HIT" badges and size-based pricing (32 cm / 42 cm)

### Product Details (Modal)
- Full-screen product view
- Size selector with dynamic price recalculation
- Topping customization across 4 categories (vegetables, meats, cheeses, fish)
- Price updates in real time based on selected toppings

### Shopping Cart
- Add / remove items, adjust quantity
- Total price calculation
- Order confirmation with success notification
- Clear cart action

### Wishlist
- Like / unlike products from any screen
- Move item to cart directly from wishlist
- Gradient card design

### Promotions
- Horizontal carousel with pagination dots
- Native OS Share dialog integration

### Delivery & Payment
- Interactive map (MapView) showing delivery area
- Delivery hours, payment methods (card / cash / digital wallet)
- Order types: delivery, pickup, pre-order

### Contacts & Support
- Clickable phone numbers (native dialer via Linking API)
- Social links: Instagram, Telegram, Viber
- Collapsible pickup address details
- Support modal with form validation

## Project Structure

```
app/
├── (tabs)/
│   ├── index.tsx           # Home — catalog with animated header
│   ├── promotions.tsx      # Promotions carousel
│   ├── settings.tsx        # Settings menu
│   ├── cart.tsx            # Shopping cart
│   ├── about-us.tsx        # About company
│   ├── delivery.tsx        # Map & delivery info
│   └── contacts.tsx        # Contact details
├── components/
│   ├── Header.tsx          # Search bar & category tabs
│   ├── ItemList.tsx        # Product card grid
│   ├── MockData.ts         # Product & topping data
│   ├── Colors.ts           # Design system palette
│   └── SupportModal.tsx    # Support request form
├── store/
│   ├── index.tsx           # Cart store (Zustand)
│   └── indexWishStore.tsx  # Wishlist store (Zustand)
├── modal.tsx               # Product details modal
├── wishlist.tsx            # Wishlist screen
└── _layout.tsx             # Root layout
```

## State Management

Two independent **Zustand** stores:

| Store | Responsibility |
|---|---|
| `useOrderStore` | Cart items, quantity control, size-based pricing, order confirmation |
| `useOrderWishStore` | Wishlist items, like/unlike toggle, move-to-cart |

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Xcode) or Android Emulator (Android Studio)

### Installation

```bash
# Clone the repository
git clone https://github.com/<Jendosek>/pronto-delivery-app.git
cd pronto-delivery-app

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Run on device

```bash
# iOS
npx expo start --ios

# Android
npx expo start --android

# Web
npx expo start --web
```

## Architecture Decisions

| Decision | Reasoning |
|---|---|
| **Zustand** over Redux | Minimal boilerplate for a focused state (cart + wishlist) |
| **Expo Router** (file-based) | Eliminates manual route config, built-in modal support, typed routes |
| **Reanimated 4** for header | GPU-accelerated scroll animations at 60 fps without JS thread blocking |
| **New Architecture** | Fabric renderer + TurboModules for better performance |
| **React Compiler** | Experimental auto-memoization for optimized re-renders |

## License

This project is for educational and portfolio purposes.
