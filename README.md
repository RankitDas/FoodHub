# FoodHub - Modern Food Ordering Website

A production-ready, premium food ordering platform built with cutting-edge web technologies.

## Features

- 🎨 Modern, responsive UI with dark/light mode
- 🍕 Smooth animations with GSAP and Framer Motion
- 📱 Mobile-first design
- 🛒 Full-featured shopping cart with Zustand
- ⚡ Lightning-fast performance
- 🎯 Beautiful parallax scrolling
- 🔐 Secure payment integration ready
- 🌍 Global food menu with categories

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP, Framer Motion
- **State Management**: Zustand
- **Backend**: Supabase
- **Icons**: Lucide React
- **Theme**: next-themes

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Home page
│   └── globals.css  # Global styles
├── components/       # React components
│   ├── HeroSection.tsx
│   ├── FeaturedFoods.tsx
│   ├── MenuSection.tsx
│   ├── CartDrawer.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── AboutSection.tsx
│   ├── CheckoutSection.tsx
│   └── TestimonialsSection.tsx
├── store/           # Zustand stores
│   └── cartStore.ts
├── lib/             # Utilities
│   ├── supabase.ts
│   └── providers.tsx
├── hooks/           # Custom hooks
│   └── useScrollAnimation.ts
└── constants/       # Constants
    └── foods.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Navigate to the project directory
   ```bash
   cd food_app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```

4. Add your Supabase credentials to `.env.local`

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Features Overview

### Hero Section
- Parallax scrolling with GSAP
- Animated floating food emojis
- Call-to-action button with smooth animations

### Featured Foods
- Scroll-triggered animations
- Hover effects on food cards
- Quick add to cart functionality

### Menu Section
- Category filtering
- Animated grid layout
- Search-friendly item display
- Add to cart with quantity

### Shopping Cart
- Slide-out drawer interface
- Real-time quantity updates
- Item removal
- Total price calculation

### Animations
- Smooth transitions on all interactions
- Scroll-triggered reveals
- Floating elements
- Scale and fade animations
- Parallax effects

### Dark Mode
- System preference detection
- Manual toggle option
- Persistent preference storage

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme.

### Food Menu
Update `src/constants/foods.ts` to add or modify menu items.

### Animations
Modify component animation settings in individual component files using Framer Motion and GSAP.

## Performance

- Optimized bundle size
- Image lazy loading
- Efficient animations using GPU acceleration
- Mobile-optimized responsive design

## Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Other Platforms

The app is built with Next.js and can be deployed to any Node.js hosting platform.

## License

MIT

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ for food lovers
