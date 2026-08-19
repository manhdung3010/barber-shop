# Premium Personal Barber Portfolio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-performance, dark editorial personal barber portfolio landing page for `[BARBERSHOP_NAME]` using React 19, TypeScript, Tailwind CSS 4, Framer Motion, and Lucide React.

**Architecture:** A static, single-page client architecture with pure separation of concerns: 100% of business details, contact information, hours, and pricing are isolated in `src/data/*.ts`. UI sections dynamically render domain data with zero hardcoded claims, supported by an accessible `Lightbox` dialog, a resilient `EditorialImage` fallback system, and GPU-accelerated motion with full `prefers-reduced-motion` compliance.

**Tech Stack:** React 19, Vite, TypeScript, Tailwind CSS 4 (`@tailwindcss/vite`), Framer Motion, Lucide React.

## Global Constraints

- **Dark Core Background**: `#0B0B0A` on `html`, `body`, `#root`, and dark sections.
- **Warm Cream Accent Sections**: `#F4F0E8` with `#0B0B0A` text and `rounded-t-[40px] sm:rounded-t-[60px]` on Services and Testimonials sections.
- **Typography Palette**: Primary `#F4F0E8`, Muted `#A7A39B`, Soft Cream `#D6D1C8`, Accent Gold `#C7A66A` (used strictly for eyebrows, active indicators, and primary CTA).
- **Font**: Google Fonts `'Manrope', sans-serif` (weights 300 to 900).
- **Data Isolation**: 100% of business data in `src/data/*.ts`. Zero hardcoded business info in JSX.
- **Accessibility**: Visible `:focus-visible`, `aria-label` on icon buttons, focus trap and restoration for Mobile Menu and Lightbox, `Escape` key handling, `prefers-reduced-motion` support.
- **Performance**: Eager loading for Hero image (`loading="eager"`, `fetchpriority="high"`, `decoding="async"`), lazy loading for below-fold images, reserved aspect ratio container dimensions, strictly GPU-accelerated transforms and opacity animations.
- **No Backend / No Auth / No Database**: Pure static single-page web app.

---

## File Structure

```
d:/barber-web/
├── public/
│   └── images/
│       ├── hero/
│       │   └── hero.jpg
│       ├── styles/
│       │   ├── low-fade.jpg
│       │   ├── mid-fade.jpg
│       │   ├── high-fade.jpg
│       │   ├── textured-crop.jpg
│       │   ├── classic.jpg
│       │   ├── long-hair.jpg
│       │   └── beard.jpg
│       ├── barber/
│       │   └── barber.jpg
│       └── gallery/
│           ├── chair.jpg
│           ├── tools.jpg
│           ├── interior.jpg
│           ├── barber-working.jpg
│           ├── detail.jpg
│           └── products.jpg
├── src/
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   ├── barber.ts
│   │   ├── services.ts
│   │   ├── styles.ts
│   │   ├── gallery.ts
│   │   ├── testimonials.ts
│   │   └── navigation.ts
│   ├── hooks/
│   │   ├── useReducedMotion.ts
│   │   └── useMediaQuery.ts
│   ├── utils/
│   │   └── seo.ts
│   ├── styles/
│   │   └── index.css
│   ├── components/
│   │   ├── ui/
│   │   │   ├── EditorialImage.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Lightbox.tsx
│   │   │   ├── FadeIn.tsx
│   │   │   ├── ImageReveal.tsx
│   │   │   └── Magnet.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── sections/
│   │       ├── Hero/
│   │       │   └── HeroSection.tsx
│   │       ├── Styles/
│   │       │   ├── StylesSection.tsx
│   │       │   └── StyleCard.tsx
│   │       ├── Services/
│   │       │   ├── ServicesSection.tsx
│   │       │   └── ServiceItem.tsx
│   │       ├── About/
│   │       │   └── AboutSection.tsx
│   │       ├── Gallery/
│   │       │   └── GallerySection.tsx
│   │       ├── Testimonials/
│   │       │   ├── TestimonialsSection.tsx
│   │       │   └── TestimonialCard.tsx
│   │       ├── Location/
│   │       │   └── LocationSection.tsx
│   │       └── Booking/
│   │           └── BookingSection.tsx
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Tasks

### Task 1: Project Scaffolding, React 19, Tailwind CSS 4 & Global Styles

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles/index.css`

**Interfaces:**
- Produces: Initial buildable Vite + React 19 + Tailwind CSS 4 app with Manrope Google Font, global CSS reset, dark theme tokens, and fluid typography classes.

- [ ] **Step 1: Create package.json with React 19, Vite, Tailwind CSS 4, Framer Motion & Lucide React**

```json
{
  "name": "barber-web",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^12.4.7",
    "lucide-react": "^0.475.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.7",
    "@types/node": "^22.13.4",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.0.7",
    "typescript": "~5.7.2",
    "vite": "^6.1.0"
  }
}
```

- [ ] **Step 2: Create Vite and TypeScript configurations**

Create `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
```

Create `tsconfig.json`:
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

Create `tsconfig.app.json`:
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

Create `tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 3: Create index.html with Manrope font, meta tags and root container**

```html
<!doctype html>
<html lang="en" class="dark scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[BARBERSHOP_NAME] — Premium Personal Barber</title>
    <meta name="description" content="[BARBERSHOP_NAME] — Personal barber specializing in precision haircuts, modern fades, styling, and grooming in [CITY]." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body class="bg-[#0B0B0A] text-[#F4F0E8] font-sans antialiased selection:bg-[#C7A66A] selection:text-[#0B0B0A]">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create src/styles/index.css with Tailwind CSS 4 theme tokens and global utility styles**

```css
@import "tailwindcss";

@theme {
  --font-sans: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
  
  --color-dark-bg: #0B0B0A;
  --color-dark-surface: #141413;
  --color-cream-bg: #F4F0E8;
  --color-cream-text: #0B0B0A;
  
  --color-text-primary: #F4F0E8;
  --color-text-muted: #A7A39B;
  --color-text-cream: #D6D1C8;
  
  --color-gold: #C7A66A;
  --color-gold-hover: #D8B87A;
  --color-gold-dark: #6E5A37;
  
  --color-border-dark: rgba(244, 240, 232, 0.18);
  --color-border-cream: rgba(11, 11, 10, 0.15);
}

@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    background-color: #0B0B0A;
    color: #F4F0E8;
    font-family: var(--font-sans);
    scroll-behavior: smooth;
  }

  body {
    overflow-x: clip;
    min-height: 100vh;
    background-color: #0B0B0A;
  }

  section[id] {
    scroll-margin-top: 6rem;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto !important;
    }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  :focus-visible {
    outline: 2px solid #C7A66A;
    outline-offset: 3px;
  }
}

.hero-heading {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.04em;
  line-height: 0.92;
  color: #F4F0E8;
}

.display-heading {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 0.95;
  font-size: clamp(3rem, 8vw, 7.5rem);
}

.section-heading {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.02;
  font-size: clamp(2.2rem, 5.5vw, 5rem);
}

.eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #C7A66A;
}

.body-editorial {
  font-weight: 300;
  line-height: 1.65;
  color: #A7A39B;
  font-size: clamp(0.95rem, 1.4vw, 1.25rem);
}
```

- [ ] **Step 5: Create placeholder favicon, main.tsx, and App.tsx then test build**

Create `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="8" fill="#0B0B0A"/>
  <path d="M10 8h12M16 8v16M11 24h10" stroke="#C7A66A" stroke-width="2.5" stroke-linecap="round"/>
</svg>
```

Create `src/main.tsx`:
```typescript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Create `src/App.tsx`:
```typescript
export default function App() {
  return (
    <main className="min-h-screen bg-[#0B0B0A] text-[#F4F0E8] flex items-center justify-center p-8">
      <h1 className="hero-heading text-4xl text-[#C7A66A]">[BARBERSHOP_NAME]</h1>
    </main>
  );
}
```

- [ ] **Step 6: Install dependencies and test build**

Run: `npm install && npm run build`
Expected: Success with `dist/` directory generated and 0 TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: scaffold React 19 + Tailwind CSS 4 + Vite project with design system tokens"
```

---

### Task 2: Data Models & Centralized Business Data Layer

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/barber.ts`
- Create: `src/data/services.ts`
- Create: `src/data/styles.ts`
- Create: `src/data/gallery.ts`
- Create: `src/data/testimonials.ts`
- Create: `src/data/navigation.ts`

**Interfaces:**
- Produces: Strictly typed domain contracts (`BarberProfile`, `OpeningHour`, `Service`, `StyleCategory`, `StyleFilter`, `StyleItem`, `GalleryItem`, `Testimonial`, `NavigationItem`) and centralized data files.

- [ ] **Step 1: Write src/types/index.ts**

```typescript
export interface OpeningHour {
  label: string;
  value: string;
  closed?: boolean;
}

export interface BarberProfile {
  name: string;
  shopName: string;
  tagline: string;
  heroHeadline: string;
  heroSupportingText: string;
  heroImage: {
    src: string;
    alt: string;
  };
  barberImage: {
    src: string;
    alt: string;
  };
  bioHeadline: string;
  bioParagraphs: string[];
  stats: { value: string; label: string }[];
  city: string;
  country: string;
  address: string;
  phone: string;
  openingHours: OpeningHour[];
  booking: {
    primaryChannel: 'zalo' | 'messenger' | 'instagram' | 'phone' | 'external';
    primaryUrl: string;
    primaryLabel: string;
    secondaryChannels: {
      channel: 'zalo' | 'messenger' | 'instagram' | 'phone';
      label: string;
      url: string;
    }[];
  };
  socials: {
    instagram?: string;
    zalo?: string;
    messenger?: string;
    facebook?: string;
    googleMaps?: string;
  };
  establishedYear: string;
  showTestimonials: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
}

export type StyleCategory = 'fade' | 'textured' | 'classic' | 'long' | 'beard';
export type StyleFilter = 'all' | StyleCategory;

export interface StyleItem {
  id: string;
  title: string;
  category: StyleCategory;
  description: string;
  image: string;
  alt: string;
  layoutVariant?: 'featured' | 'wide' | 'standard' | 'tall';
}

export interface GalleryItem {
  id: string;
  title: string;
  alt: string;
  image: string;
  layoutVariant?: 'featured' | 'wide' | 'standard' | 'tall';
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  rating: number;
  service?: string;
  isPlaceholder?: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
}
```

- [ ] **Step 2: Write src/data/barber.ts with strict placeholders**

```typescript
import { BarberProfile } from '../types/index.ts';

export const barberProfile: BarberProfile = {
  name: '[BARBER_NAME]',
  shopName: '[BARBERSHOP_NAME]',
  tagline: 'YOUR STYLE. YOUR SIGNATURE.',
  heroHeadline: 'YOUR STYLE. YOUR SIGNATURE.',
  heroSupportingText: 'Precision cuts, modern fades, and personalized grooming crafted for your style.',
  heroImage: {
    src: '/images/hero/hero.jpg',
    alt: 'Master barber at work styling precision hair cut',
  },
  barberImage: {
    src: '/images/barber/barber.jpg',
    alt: 'Portrait of master barber [BARBER_NAME]',
  },
  bioHeadline: 'MORE THAN A HAIRCUT.',
  bioParagraphs: [
    "I'm [BARBER_NAME], a personal barber focused on clean cuts, modern fades, and styles that actually fit the person wearing them.",
    'Every haircut starts with understanding your face shape, hair texture, lifestyle, and the look you want to achieve.',
    "The goal isn't simply to give you a good haircut. It's to give you a style that feels like you.",
  ],
  stats: [
    { value: '[XX]+', label: 'YEARS EXPERIENCE' },
    { value: '[XXXX]+', label: 'HAIRCUTS DELIVERED' },
    { value: '[XX]+', label: 'CUSTOM STYLES' },
    { value: '[XX]+', label: 'REGULAR CLIENTS' },
  ],
  city: '[CITY]',
  country: '[COUNTRY]',
  address: '[ADDRESS]',
  phone: '[PHONE]',
  openingHours: [
    { label: 'MON — SAT', value: '09:00 — 20:00' },
    { label: 'SUN', value: '10:00 — 18:00' },
  ],
  booking: {
    primaryChannel: 'zalo',
    primaryUrl: '[ZALO_URL]',
    primaryLabel: 'BOOK AN APPOINTMENT',
    secondaryChannels: [
      { channel: 'zalo', label: 'Zalo', url: '[ZALO_URL]' },
      { channel: 'messenger', label: 'Messenger', url: '[MESSENGER_URL]' },
      { channel: 'instagram', label: 'Instagram', url: '[INSTAGRAM_URL]' },
      { channel: 'phone', label: 'Call [PHONE]', url: 'tel:[PHONE]' },
    ],
  },
  socials: {
    instagram: '[INSTAGRAM_URL]',
    zalo: '[ZALO_URL]',
    messenger: '[MESSENGER_URL]',
    googleMaps: '[GOOGLE_MAPS_URL]',
  },
  establishedYear: '[YEAR]',
  showTestimonials: true,
};
```

- [ ] **Step 3: Write src/data/services.ts**

```typescript
import { Service } from '../types/index.ts';

export const servicesData: Service[] = [
  {
    id: 'haircut',
    name: 'Haircut',
    description: 'Classic haircut tailored to your face shape, hair texture, and preferred style.',
    price: '[PRICE]',
    duration: '45 MIN',
  },
  {
    id: 'fade',
    name: 'Fade',
    description: 'Clean low, mid, or high fade with detailed blending and crisp razor finishing.',
    price: '[PRICE]',
    duration: '45 MIN',
  },
  {
    id: 'haircut-beard',
    name: 'Haircut + Beard',
    description: 'Complete tailored haircut, hot towel beard trim, shaping, and conditioning styling.',
    price: '[PRICE]',
    duration: '60 MIN',
  },
  {
    id: 'perm',
    name: 'Perm',
    description: 'Textured, Korean-inspired, or customized wavy perm designed around your hair structure.',
    price: '[PRICE]',
    duration: '90 MIN',
  },
  {
    id: 'styling',
    name: 'Wash & Styling',
    description: 'Invigorating hair wash, scalp massage, blow-dry, and signature pomade styling.',
    price: '[PRICE]',
    duration: '30 MIN',
  },
];
```

- [ ] **Step 4: Write src/data/styles.ts**

```typescript
import { StyleItem } from '../types/index.ts';

export const stylesData: StyleItem[] = [
  {
    id: 'low-fade',
    title: 'Low Fade / Textured Crop',
    category: 'fade',
    description: 'Clean subtle taper low fade paired with a choppy textured top.',
    image: '/images/styles/low-fade.jpg',
    alt: 'Low taper fade haircut with textured crop top',
    layoutVariant: 'featured',
  },
  {
    id: 'mid-fade',
    title: 'Mid Fade / Quiff',
    category: 'fade',
    description: 'Balanced mid fade with voluminous modern quiff styling.',
    image: '/images/styles/mid-fade.jpg',
    alt: 'Mid fade haircut with styled quiff',
    layoutVariant: 'standard',
  },
  {
    id: 'textured-crop',
    title: 'Modern Textured Fringe',
    category: 'textured',
    description: 'Layered texture with blunt fringe and matte finish.',
    image: '/images/styles/textured-crop.jpg',
    alt: 'Modern textured fringe haircut',
    layoutVariant: 'standard',
  },
  {
    id: 'high-fade',
    title: 'High Skin Fade / Buzz',
    category: 'fade',
    description: 'Ultra-crisp high skin fade with sharp edge-up.',
    image: '/images/styles/high-fade.jpg',
    alt: 'High skin fade haircut',
    layoutVariant: 'wide',
  },
  {
    id: 'classic-side-part',
    title: 'Classic Side Part',
    category: 'classic',
    description: 'Timeless tailored gentlemen cut with natural taper.',
    image: '/images/styles/classic.jpg',
    alt: 'Classic gentlemen side part haircut',
    layoutVariant: 'standard',
  },
  {
    id: 'long-flow',
    title: 'Mid-Length Layered Flow',
    category: 'long',
    description: 'Textured scissor cut with natural movement and flow.',
    image: '/images/styles/long-hair.jpg',
    alt: 'Mid-length layered flowing men haircut',
    layoutVariant: 'standard',
  },
  {
    id: 'beard-sculpting',
    title: 'Beard Shaping & Line-up',
    category: 'beard',
    description: 'Precision beard sculpting with straight-razor cheek lines.',
    image: '/images/styles/beard.jpg',
    alt: 'Precision groomed beard and fade',
    layoutVariant: 'featured',
  },
];
```

- [ ] **Step 5: Write src/data/gallery.ts, src/data/testimonials.ts, src/data/navigation.ts**

Create `src/data/gallery.ts`:
```typescript
import { GalleryItem } from '../types/index.ts';

export const galleryData: GalleryItem[] = [
  {
    id: 'chair',
    title: 'The Vintage Recline Chair',
    alt: 'Custom premium leather barber chair under warm studio spotlight',
    image: '/images/gallery/chair.jpg',
    layoutVariant: 'featured',
  },
  {
    id: 'tools',
    title: 'Master Clippers & Shears',
    alt: 'Japanese steel shears and precision magnetic clippers on leather tray',
    image: '/images/gallery/tools.jpg',
    layoutVariant: 'standard',
  },
  {
    id: 'interior',
    title: 'The Studio Space',
    alt: 'Dark minimalist barber studio with warm architectural lighting',
    image: '/images/gallery/interior.jpg',
    layoutVariant: 'standard',
  },
  {
    id: 'barber-working',
    title: 'The Craft in Action',
    alt: 'Barber focused on detailing a clean hairline with shears',
    image: '/images/gallery/barber-working.jpg',
    layoutVariant: 'wide',
  },
  {
    id: 'detail',
    title: 'Razor Lineup Detailing',
    alt: 'Close-up precision razor detailing on a fresh fade',
    image: '/images/gallery/detail.jpg',
    layoutVariant: 'standard',
  },
  {
    id: 'products',
    title: 'Curated Grooming Essentials',
    alt: 'Selected matte clays, tonics, and conditioning oils on oak shelf',
    image: '/images/gallery/products.jpg',
    layoutVariant: 'standard',
  },
];
```

Create `src/data/testimonials.ts`:
```typescript
import { Testimonial } from '../types/index.ts';

export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    quote: "Best fade I've had in years. The attention to detail is insane.",
    clientName: '-- [CLIENT_NAME]',
    rating: 5,
    service: 'Skin Fade + Beard',
    isPlaceholder: true,
  },
  {
    id: '2',
    quote: 'Consistently sharp cuts every single visit. Great atmosphere and genuine craft.',
    clientName: '-- [CLIENT_NAME]',
    rating: 5,
    service: 'Classic Haircut',
    isPlaceholder: true,
  },
  {
    id: '3',
    quote: 'Takes the time to understand your hair texture and style. Highly recommended.',
    clientName: '-- [CLIENT_NAME]',
    rating: 5,
    service: 'Textured Crop',
    isPlaceholder: true,
  },
];
```

Create `src/data/navigation.ts`:
```typescript
import { NavigationItem } from '../types/index.ts';

export const navigationData: NavigationItem[] = [
  { label: 'Styles', href: '#styles' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];
```

- [ ] **Step 6: Verify TypeScript types and build**

Run: `npm run build`
Expected: TypeScript validation succeeds with 0 errors.

- [ ] **Step 7: Commit**

```bash
git add src/types src/data
git commit -m "feat: add domain contracts and centralized data layer for barber portfolio"
```

---

### Task 3: Photography Asset Generation & `EditorialImage` Component

**Files:**
- Create: `public/images/hero/hero.jpg`
- Create: `public/images/barber/barber.jpg`
- Create: `public/images/styles/*.jpg` (7 styles)
- Create: `public/images/gallery/*.jpg` (6 gallery items)
- Create: `src/components/ui/EditorialImage.tsx`

**Interfaces:**
- Produces: `EditorialImage` component with aspect-ratio locked container, dark skeleton loading state, async decoding, high-priority loading support, and dark editorial fallback watermark on error.

- [ ] **Step 1: Generate high-resolution dark editorial photography assets**

Generate photorealistic dark editorial imagery with `generate_image` tool:
- Hero: `public/images/hero/hero.jpg` (Cinematic dark editorial men's grooming close-up, warm gold ambient studio rim lighting, 3:4 or 4:5 aspect).
- Barber: `public/images/barber/barber.jpg` (Portrait of master barber holding shears in dark minimalist studio).
- Styles: `low-fade.jpg`, `mid-fade.jpg`, `high-fade.jpg`, `textured-crop.jpg`, `classic.jpg`, `long-hair.jpg`, `beard.jpg`.
- Gallery: `chair.jpg`, `tools.jpg`, `interior.jpg`, `barber-working.jpg`, `detail.jpg`, `products.jpg`.

- [ ] **Step 2: Implement src/components/ui/EditorialImage.tsx**

```typescript
import { useState, ImgHTMLAttributes } from 'react';

interface EditorialImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: '4/5' | '3/4' | '16/9' | '1/1' | 'auto';
  priority?: boolean;
  watermarkLabel?: string;
  className?: string;
  imageClassName?: string;
}

export default function EditorialImage({
  src,
  alt,
  aspectRatio = '4/5',
  priority = false,
  watermarkLabel,
  className = '',
  imageClassName = '',
  ...props
}: EditorialImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    '4/5': 'aspect-[4/5]',
    '3/4': 'aspect-[3/4]',
    '16/9': 'aspect-[16/9]',
    '1/1': 'aspect-square',
    'auto': '',
  }[aspectRatio];

  return (
    <div className={`relative overflow-hidden bg-[#141413] ${aspectClass} ${className}`}>
      {/* Dark Shimmer Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#141413] via-[#1c1c1a] to-[#141413] animate-pulse" />
      )}

      {/* Fallback Display if image fails to load */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#141413] p-4 text-center border border-[rgba(244,240,232,0.08)]">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66A] mb-1">
            {watermarkLabel || 'STUDIO WORK'}
          </span>
          <span className="text-[11px] text-[#A7A39B] uppercase tracking-wider line-clamp-2 max-w-[200px]">
            {alt}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imageClassName}`}
          {...props}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 3: Test build with EditorialImage**

Run: `npm run build`
Expected: Build passes with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add public/images src/components/ui/EditorialImage.tsx
git commit -m "feat: add dark editorial photography assets and resilient EditorialImage component"
```

---

### Task 4: UI Primitives & Motion Hooks (`Button`, `FadeIn`, `ImageReveal`, `Magnet`, `Lightbox`)

**Files:**
- Create: `src/hooks/useReducedMotion.ts`
- Create: `src/hooks/useMediaQuery.ts`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Magnet.tsx`
- Create: `src/components/ui/FadeIn.tsx`
- Create: `src/components/ui/ImageReveal.tsx`
- Create: `src/components/ui/Lightbox.tsx`

**Interfaces:**
- Produces: Shared interactive UI primitives and accessible Lightbox modal dialog.

- [ ] **Step 1: Implement hooks**

Create `src/hooks/useReducedMotion.ts`:
```typescript
import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return matches;
}
```

Create `src/hooks/useMediaQuery.ts`:
```typescript
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
```

- [ ] **Step 2: Implement src/components/ui/Button.tsx**

```typescript
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

interface BaseButtonProps {
  variant?: 'primary' | 'outline' | 'pill' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'px-6 py-2.5 text-xs tracking-widest',
    md: 'px-8 py-3.5 sm:px-9 sm:py-4 text-xs sm:text-sm tracking-[0.18em]',
    lg: 'px-10 py-4 sm:px-12 sm:py-5 text-sm sm:text-base tracking-[0.2em]',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#C7A66A] text-[#0B0B0A] font-semibold hover:bg-[#D8B87A] active:scale-[0.98] shadow-md',
    outline:
      'bg-transparent text-[#F4F0E8] border border-[rgba(244,240,232,0.35)] hover:bg-[rgba(244,240,232,0.08)] active:scale-[0.98]',
    pill:
      'bg-transparent text-[#F4F0E8] border border-[rgba(244,240,232,0.25)] hover:border-[#C7A66A] hover:text-[#C7A66A] active:scale-[0.98]',
    secondary:
      'bg-[#1C1C1A] text-[#F4F0E8] border border-[rgba(244,240,232,0.15)] hover:bg-[#252522] active:scale-[0.98]',
  }[variant];

  const combinedClass = `inline-flex items-center justify-center uppercase font-medium rounded-full transition-all duration-200 cursor-pointer select-none text-center ${sizeClasses} ${variantClasses} ${className}`;

  if ('href' in props && props.href) {
    return (
      <a className={combinedClass} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClass} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
```

- [ ] **Step 3: Implement src/components/ui/Magnet.tsx (Subtle desktop pointer effect)**

```typescript
import React, { useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';
import { useMediaQuery } from '../../hooks/useMediaQuery.ts';

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function Magnet({ children, className = '', strength = 12 }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isReduced = useReducedMotion();
  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');

  if (isReduced || !isFinePointer) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) / (width / 2);
    const deltaY = (e.clientY - centerY) / (height / 2);
    setPosition({ x: deltaX * strength, y: deltaY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.4s ease-out' : 'transform 0.1s ease-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Implement src/components/ui/FadeIn.tsx and ImageReveal.tsx**

Create `src/components/ui/FadeIn.tsx`:
```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  y = 25,
  x = 0,
  className = '',
}: FadeInProps) {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

Create `src/components/ui/ImageReveal.tsx`:
```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';

interface ImageRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ImageReveal({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
}: ImageRevealProps) {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Implement src/components/ui/Lightbox.tsx with accessible dialog & keyboard listeners**

```typescript
import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../../types/index.ts';

interface LightboxProps {
  isOpen: boolean;
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function Lightbox({
  isOpen,
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  triggerRef,
}: LightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const currentItem = items[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Keyboard handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    // Focus close button on open
    const closeBtn = modalRef.current?.querySelector<HTMLButtonElement>('button[aria-label="Close Lightbox"]');
    closeBtn?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      triggerRef?.current?.focus();
    };
  }, [isOpen, onClose, onPrev, onNext, triggerRef]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Haircut Image Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Top Bar with counter & close button */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between text-[#F4F0E8] z-10" onClick={(e) => e.stopPropagation()}>
        <span className="text-xs uppercase tracking-[0.2em] text-[#C7A66A]">
          {currentIndex + 1} / {items.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="p-2.5 rounded-full bg-[#1C1C1A] text-[#F4F0E8] hover:text-[#C7A66A] hover:bg-[#252522] transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous Image"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1C1C1A]/80 text-[#F4F0E8] hover:text-[#C7A66A] hover:bg-[#252522] transition-colors cursor-pointer z-10"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next Image"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1C1C1A]/80 text-[#F4F0E8] hover:text-[#C7A66A] hover:bg-[#252522] transition-colors cursor-pointer z-10"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.image}
          alt={currentItem.alt}
          className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
        />
        <p className="mt-4 text-center text-sm font-medium uppercase tracking-wider text-[#F4F0E8]">
          {currentItem.title}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Run build validation**

Run: `npm run build`
Expected: Build passes with 0 TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add src/hooks src/components/ui
git commit -m "feat: add Button, Magnet, Lightbox and Framer Motion animation primitives"
```

---

### Task 5: Navbar & Hero Section

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/sections/Hero/HeroSection.tsx`

**Interfaces:**
- Consumes: `barberProfile` from `src/data/barber.ts`, `navigationData` from `src/data/navigation.ts`, `EditorialImage`, `Button`, `Magnet`, `FadeIn`, `ImageReveal`.
- Produces: Sticky animated navigation with accessible fullscreen mobile dialog and full viewport hero section.

- [ ] **Step 1: Implement src/components/layout/Navbar.tsx**

```typescript
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { barberProfile } from '../../data/barber.ts';
import { navigationData } from '../../data/navigation.ts';
import Button from '../ui/Button.tsx';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle focus trapping and Escape for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      firstLinkRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
          menuTriggerRef.current?.focus();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    menuTriggerRef.current?.focus();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0B0A]/85 backdrop-blur-md border-b border-[rgba(244,240,232,0.12)] py-4'
          : 'bg-transparent py-6 sm:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="text-lg sm:text-xl md:text-2xl font-extrabold uppercase tracking-wider text-[#F4F0E8] hover:text-[#C7A66A] transition-colors"
        >
          {barberProfile.shopName}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main Navigation">
          {navigationData.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs lg:text-sm font-medium uppercase tracking-[0.18em] text-[#F4F0E8] hover:opacity-70 transition-opacity"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Button href={barberProfile.booking.primaryUrl} variant="pill" size="sm">
            Book Now
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          ref={menuTriggerRef}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Open Navigation Menu"
          className="md:hidden p-2 text-[#F4F0E8] hover:text-[#C7A66A] transition-colors cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Fullscreen Menu Dialog */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 bg-[#0B0B0A] flex flex-col justify-between p-6 sm:p-10"
        >
          <div className="flex items-center justify-between border-b border-[rgba(244,240,232,0.12)] pb-6">
            <span className="text-lg font-bold uppercase tracking-wider text-[#F4F0E8]">
              {barberProfile.shopName}
            </span>
            <button
              onClick={closeMenu}
              aria-label="Close Navigation Menu"
              className="p-2 text-[#F4F0E8] hover:text-[#C7A66A] transition-colors cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto" aria-label="Mobile Menu Links">
            {navigationData.map((item, idx) => (
              <a
                key={item.href}
                ref={idx === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={closeMenu}
                className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider text-[#F4F0E8] hover:text-[#C7A66A] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-[rgba(244,240,232,0.12)] flex flex-col gap-4">
            <Button
              href={barberProfile.booking.primaryUrl}
              variant="primary"
              size="md"
              onClick={closeMenu}
            >
              Book An Appointment
            </Button>
            <p className="text-center text-[10px] uppercase tracking-widest text-[#A7A39B]">
              {barberProfile.city} • {barberProfile.phone}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Implement src/components/sections/Hero/HeroSection.tsx**

```typescript
import { barberProfile } from '../../../data/barber.ts';
import Button from '../../ui/Button.tsx';
import Magnet from '../../ui/Magnet.tsx';
import FadeIn from '../../ui/FadeIn.tsx';
import ImageReveal from '../../ui/ImageReveal.tsx';
import EditorialImage from '../../ui/EditorialImage.tsx';

export default function HeroSection() {
  const hoursSummary = barberProfile.openingHours
    .map((h) => `${h.label} / ${h.value}`)
    .join(' • ');

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-28 sm:pt-36 pb-8 md:pb-12 px-5 sm:px-8 md:px-10 lg:px-12 overflow-x-clip bg-[#0B0B0A]">
      {/* Top Header Eyebrow */}
      <div className="max-w-7xl mx-auto w-full">
        <FadeIn delay={0.1}>
          <p className="eyebrow text-center md:text-left mb-4 sm:mb-6">
            {barberProfile.shopName} / PERSONAL BARBER STUDIO
          </p>
        </FadeIn>

        {/* Hero Dominant Headline */}
        <FadeIn delay={0.2} y={35}>
          <h1 className="hero-heading text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[9.5vw] text-center md:text-left">
            {barberProfile.heroHeadline}
          </h1>
        </FadeIn>
      </div>

      {/* Middle Composition: Image & Supporting Copy & Dual CTA */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center my-6 md:my-10">
        {/* Supporting Copy & CTAs */}
        <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          <FadeIn delay={0.35}>
            <p className="body-editorial max-w-md mb-8">
              {barberProfile.heroSupportingText}
            </p>
          </FadeIn>

          <FadeIn delay={0.45} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Magnet strength={10}>
              <Button
                href={barberProfile.booking.primaryUrl}
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
              >
                {barberProfile.booking.primaryLabel}
              </Button>
            </Magnet>
            <Button
              href="#styles"
              variant="outline"
              size="md"
              className="w-full sm:w-auto"
            >
              View Styles
            </Button>
          </FadeIn>
        </div>

        {/* Hero High-Priority Image */}
        <div className="md:col-span-6 flex justify-center md:justify-end order-1 md:order-2">
          <ImageReveal delay={0.3} className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[460px] rounded-[24px] sm:rounded-[32px] shadow-2xl">
            <EditorialImage
              src={barberProfile.heroImage.src}
              alt={barberProfile.heroImage.alt}
              aspectRatio="4/5"
              priority={true}
              watermarkLabel="SIGNATURE CRAFT"
              imageClassName="hover:scale-105 transition-transform duration-700"
            />
          </ImageReveal>
        </div>
      </div>

      {/* Hero Bottom Metadata Row */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-[rgba(244,240,232,0.12)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs uppercase tracking-widest text-[#A7A39B]">
        <FadeIn delay={0.55}>
          <span>{barberProfile.city}, {barberProfile.country}</span>
        </FadeIn>
        <FadeIn delay={0.6}>
          <span>{hoursSummary}</span>
        </FadeIn>
        <FadeIn delay={0.65}>
          <span>EST. {barberProfile.establishedYear}</span>
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Test build**

Run: `npm run build`
Expected: Build passes with 0 TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx src/components/sections/Hero/HeroSection.tsx
git commit -m "feat: add sticky Navbar with mobile focus trap and editorial HeroSection"
```

---

### Task 6: Styles (Portfolio) & Services Sections

**Files:**
- Create: `src/components/sections/Styles/StyleCard.tsx`
- Create: `src/components/sections/Styles/StylesSection.tsx`
- Create: `src/components/sections/Services/ServiceItem.tsx`
- Create: `src/components/sections/Services/ServicesSection.tsx`

**Interfaces:**
- Consumes: `stylesData` from `src/data/styles.ts`, `servicesData` from `src/data/services.ts`, `StyleCategory`, `StyleFilter`, `EditorialImage`, `FadeIn`.
- Produces: Interactive filterable haircut portfolio grid with layout variants and warm cream inverted services price list.

- [ ] **Step 1: Implement StyleCard and StylesSection**

Create `src/components/sections/Styles/StyleCard.tsx`:
```typescript
import { StyleItem } from '../../../types/index.ts';
import EditorialImage from '../../ui/EditorialImage.tsx';

interface StyleCardProps {
  item: StyleItem;
}

export default function StyleCard({ item }: StyleCardProps) {
  const spanClass = {
    featured: 'col-span-12 md:col-span-7',
    wide: 'col-span-12 md:col-span-8',
    tall: 'col-span-12 md:col-span-5',
    standard: 'col-span-12 md:col-span-5 lg:col-span-4',
  }[item.layoutVariant || 'standard'];

  return (
    <div className={`group relative rounded-[24px] sm:rounded-[32px] overflow-hidden ${spanClass}`}>
      <EditorialImage
        src={item.image}
        alt={item.alt}
        aspectRatio={item.layoutVariant === 'featured' || item.layoutVariant === 'wide' ? '16/9' : '4/5'}
        watermarkLabel={item.category}
        imageClassName="group-hover:scale-104 transition-transform duration-500"
      />

      {/* Dark overlay & editorial hover caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66A] mb-1">
          {item.category}
        </span>
        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#F4F0E8]">
          {item.title}
        </h3>
        <p className="text-xs text-[#A7A39B] mt-1 line-clamp-2 max-w-md">
          {item.description}
        </p>
      </div>
    </div>
  );
}
```

Create `src/components/sections/Styles/StylesSection.tsx`:
```typescript
import { useState } from 'react';
import { stylesData } from '../../../data/styles.ts';
import { StyleCategory, StyleFilter } from '../../../types/index.ts';
import StyleCard from './StyleCard.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

const FILTER_TABS: { label: string; value: StyleFilter }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'FADE', value: 'fade' },
  { label: 'TEXTURED', value: 'textured' },
  { label: 'CLASSIC', value: 'classic' },
  { label: 'LONG', value: 'long' },
  { label: 'BEARD', value: 'beard' },
];

export default function StylesSection() {
  const [activeFilter, setActiveFilter] = useState<StyleFilter>('all');

  const filteredStyles = activeFilter === 'all'
    ? stylesData
    : stylesData.filter((s) => s.category === activeFilter as StyleCategory);

  return (
    <section id="styles" className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn>
          <p className="eyebrow mb-3">01 / SIGNATURE STYLES</p>
          <h2 className="display-heading max-w-4xl mb-6">
            THE WORK SPEAKS FOR ITSELF.
          </h2>
          <p className="body-editorial max-w-xl mb-12 sm:mb-16">
            A selection of precision cuts, skin fades, textured crops, and crafted styles created in the chair.
          </p>
        </FadeIn>

        {/* Filter Tabs */}
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-3 sm:gap-6 border-b border-[rgba(244,240,232,0.12)] pb-6 mb-12 sm:mb-16">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`relative text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] py-2 px-1 transition-colors cursor-pointer ${
                    isActive ? 'text-[#F4F0E8]' : 'text-[#A7A39B] hover:text-[#F4F0E8]'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7A66A]" />
                  )}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Portfolio Masonry Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {filteredStyles.map((item) => (
            <StyleCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Implement ServiceItem and ServicesSection**

Create `src/components/sections/Services/ServiceItem.tsx`:
```typescript
import { ArrowUpRight } from 'lucide-react';
import { Service } from '../../../types/index.ts';

interface ServiceItemProps {
  service: Service;
  index: number;
}

export default function ServiceItem({ service, index }: ServiceItemProps) {
  const formattedNumber = String(index + 1).padStart(2, '0');

  return (
    <div className="group flex flex-col md:flex-row md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-[rgba(11,11,10,0.15)] transition-colors hover:bg-[rgba(11,11,10,0.03)] px-4 sm:px-6 rounded-2xl">
      {/* Index Number */}
      <div className="text-4xl sm:text-6xl md:text-7xl font-black text-[#0B0B0A]/30 group-hover:text-[#0B0B0A] transition-colors md:w-32 mb-4 md:mb-0">
        {formattedNumber}
      </div>

      {/* Service Details */}
      <div className="flex-1 md:px-8">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-[#0B0B0A]">
            {service.name}
          </h3>
          {service.duration && (
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#6E5A37] bg-[#6E5A37]/10 px-2.5 py-1 rounded-full">
              {service.duration}
            </span>
          )}
        </div>
        <p className="text-sm sm:text-base font-light text-[#0B0B0A]/70 max-w-xl">
          {service.description}
        </p>
      </div>

      {/* Price & Action */}
      <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0">
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#0B0B0A]">
          {service.price}
        </span>
        <div className="p-2 rounded-full border border-[rgba(11,11,10,0.2)] group-hover:border-[#0B0B0A] group-hover:bg-[#0B0B0A] group-hover:text-[#F4F0E8] transition-all">
          <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
}
```

Create `src/components/sections/Services/ServicesSection.tsx`:
```typescript
import { servicesData } from '../../../data/services.ts';
import ServiceItem from './ServiceItem.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-[#F4F0E8] text-[#0B0B0A] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 -mt-10 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn className="text-center mb-16 sm:mb-20 md:mb-24">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#6E5A37] mb-3">
            02 / SERVICES & PRICING
          </p>
          <h2 className="display-heading text-[#0B0B0A]">
            CUT. STYLE. REFINE.
          </h2>
        </FadeIn>

        {/* Dynamic Services List */}
        <div className="flex flex-col">
          {servicesData.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.08}>
              <ServiceItem service={service} index={index} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run build test**

Run: `npm run build`
Expected: Build passes with 0 TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Styles src/components/sections/Services
git commit -m "feat: add Styles portfolio grid with category filter and inverted cream Services section"
```

---

### Task 7: About, Studio Gallery & Testimonials Sections

**Files:**
- Create: `src/components/sections/About/AboutSection.tsx`
- Create: `src/components/sections/Gallery/GallerySection.tsx`
- Create: `src/components/sections/Testimonials/TestimonialCard.tsx`
- Create: `src/components/sections/Testimonials/TestimonialsSection.tsx`

**Interfaces:**
- Consumes: `barberProfile`, `galleryData`, `testimonialsData`, `EditorialImage`, `Lightbox`, `FadeIn`, `ImageReveal`.
- Produces: About section with stats grid, inside the studio gallery with Lightbox modal, and cream Testimonials section with honest placeholder support.

- [ ] **Step 1: Implement AboutSection**

```typescript
import { barberProfile } from '../../../data/barber.ts';
import EditorialImage from '../../ui/EditorialImage.tsx';
import FadeIn from '../../ui/FadeIn.tsx';
import ImageReveal from '../../ui/ImageReveal.tsx';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="eyebrow mb-3">03 / THE BARBER</p>
          <h2 className="display-heading mb-12 sm:mb-16">
            {barberProfile.bioHeadline}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Barber Portrait */}
          <div className="lg:col-span-5">
            <ImageReveal className="rounded-[30px] sm:rounded-[40px] shadow-2xl overflow-hidden">
              <EditorialImage
                src={barberProfile.barberImage.src}
                alt={barberProfile.barberImage.alt}
                aspectRatio="4/5"
                watermarkLabel="MASTER BARBER"
                imageClassName="hover:scale-103 transition-transform duration-700"
              />
            </ImageReveal>
          </div>

          {/* Bio Story & Stats */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <FadeIn delay={0.2} className="space-y-6 text-[#D6D1C8] text-base sm:text-lg md:text-xl font-light leading-relaxed mb-12">
              {barberProfile.bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </FadeIn>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[rgba(244,240,232,0.15)]">
              {barberProfile.stats.map((stat, i) => (
                <FadeIn key={i} delay={0.3 + i * 0.08} className="flex flex-col">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#F4F0E8] mb-1">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#A7A39B]">
                    {stat.label}
                  </span>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Implement GallerySection with Lightbox modal**

```typescript
import { useState, useRef } from 'react';
import { galleryData } from '../../../data/gallery.ts';
import EditorialImage from '../../ui/EditorialImage.tsx';
import Lightbox from '../../ui/Lightbox.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = (index: number, e: React.MouseEvent<HTMLElement>) => {
    lastTriggerRef.current = e.currentTarget;
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="eyebrow mb-3">04 / INSIDE THE STUDIO</p>
          <h2 className="display-heading max-w-4xl mb-12 sm:mb-16">
            THE SPACE. THE CRAFT. THE DETAIL.
          </h2>
        </FadeIn>

        {/* 12-Column Studio Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {galleryData.map((item, index) => {
            const spanClass = {
              featured: 'col-span-12 md:col-span-7',
              wide: 'col-span-12 md:col-span-8',
              tall: 'col-span-12 md:col-span-5',
              standard: 'col-span-12 md:col-span-5 lg:col-span-4',
            }[item.layoutVariant || 'standard'];

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={(e) => openLightbox(index, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index, e as unknown as React.MouseEvent<HTMLElement>);
                  }
                }}
                className={`group relative rounded-[24px] sm:rounded-[32px] overflow-hidden cursor-pointer ${spanClass}`}
                aria-label={`View photo: ${item.title}`}
              >
                <EditorialImage
                  src={item.image}
                  alt={item.alt}
                  aspectRatio={item.layoutVariant === 'featured' || item.layoutVariant === 'wide' ? '16/9' : '4/5'}
                  watermarkLabel="STUDIO"
                  imageClassName="group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F4F0E8]">
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shared Accessible Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        items={galleryData}
        currentIndex={activePhotoIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : galleryData.length - 1))}
        onNext={() => setActivePhotoIndex((prev) => (prev < galleryData.length - 1 ? prev + 1 : 0))}
        triggerRef={lastTriggerRef}
      />
    </section>
  );
}
```

- [ ] **Step 3: Implement TestimonialsSection**

Create `src/components/sections/Testimonials/TestimonialCard.tsx`:
```typescript
import { Star } from 'lucide-react';
import { Testimonial } from '../../../types/index.ts';

interface TestimonialCardProps {
  item: Testimonial;
}

export default function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <div className="p-8 sm:p-10 rounded-3xl border border-[rgba(11,11,10,0.12)] bg-white/40 backdrop-blur-sm flex flex-col justify-between">
      <div>
        {/* 5-Star Rating */}
        <div className="flex items-center gap-1 text-[#6E5A37] mb-6">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#6E5A37]" />
          ))}
        </div>
        <p className="text-base sm:text-lg md:text-xl font-light text-[#0B0B0A] leading-relaxed mb-6">
          "{item.quote}"
        </p>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#0B0B0A]">
          {item.clientName}
        </span>
        {item.service && (
          <span className="block text-[11px] uppercase tracking-wider text-[#6E5A37] mt-0.5">
            {item.service}
          </span>
        )}
      </div>
    </div>
  );
}
```

Create `src/components/sections/Testimonials/TestimonialsSection.tsx`:
```typescript
import { barberProfile } from '../../../data/barber.ts';
import { testimonialsData } from '../../../data/testimonials.ts';
import TestimonialCard from './TestimonialCard.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function TestimonialsSection() {
  if (!barberProfile.showTestimonials || testimonialsData.length === 0) {
    return null;
  }

  return (
    <section
      className="bg-[#F4F0E8] text-[#0B0B0A] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 -mt-10 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16 sm:mb-20">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#6E5A37] mb-3">
            05 / CLIENTS
          </p>
          <h2 className="display-heading text-[#0B0B0A]">
            GOOD HAIR. GOOD ENERGY.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.map((item) => (
            <FadeIn key={item.id}>
              <TestimonialCard item={item} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build passes with 0 TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/About src/components/sections/Gallery src/components/sections/Testimonials
git commit -m "feat: add AboutSection, GallerySection with Lightbox, and TestimonialsSection"
```

---

### Task 8: Location, Booking & Footer Sections with JSON-LD Schema

**Files:**
- Create: `src/utils/seo.ts`
- Create: `src/components/sections/Location/LocationSection.tsx`
- Create: `src/components/sections/Booking/BookingSection.tsx`
- Create: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `barberProfile`, `Button`, `Magnet`, `FadeIn`.
- Produces: Location schedule with map preview, high-impact Booking section with primary CTA and secondary direct messaging channels, Footer, and Schema.org JSON-LD generator.

- [ ] **Step 1: Implement src/utils/seo.ts with Schema.org JSON-LD generator**

```typescript
import { BarberProfile } from '../types/index.ts';

export function generateBarberShopJsonLd(profile: BarberProfile): string {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BarberShop',
    name: profile.shopName,
    description: profile.heroSupportingText,
  };

  if (profile.heroImage?.src) {
    schema.image = profile.heroImage.src;
  }

  if (profile.phone && !profile.phone.includes('[')) {
    schema.telephone = profile.phone;
  }

  if (profile.address && !profile.address.includes('[')) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: profile.address,
      addressLocality: profile.city,
      addressCountry: profile.country,
    };
  }

  if (profile.socials?.googleMaps && !profile.socials.googleMaps.includes('[')) {
    schema.hasMap = profile.socials.googleMaps;
  }

  return JSON.stringify(schema, null, 2);
}
```

- [ ] **Step 2: Implement LocationSection**

```typescript
import { MapPin, Clock, Phone, ArrowUpRight } from 'lucide-react';
import { barberProfile } from '../../../data/barber.ts';
import FadeIn from '../../ui/FadeIn.tsx';

export default function LocationSection() {
  return (
    <section id="location" className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="eyebrow mb-3">06 / FIND THE SHOP</p>
          <h2 className="display-heading mb-12 sm:mb-16">
            COME SIT IN THE CHAIR.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Schedule & Info */}
          <div className="lg:col-span-6 space-y-8">
            <FadeIn delay={0.1} className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1C1C1A] text-[#C7A66A]">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A7A39B] block mb-1">
                  Address
                </span>
                <p className="text-lg sm:text-xl font-medium text-[#F4F0E8]">
                  {barberProfile.address}, {barberProfile.city}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1C1C1A] text-[#C7A66A]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A7A39B] block mb-1">
                  Opening Hours
                </span>
                <div className="space-y-1">
                  {barberProfile.openingHours.map((hour, idx) => (
                    <p key={idx} className="text-base sm:text-lg text-[#F4F0E8]">
                      <span className="font-semibold text-[#C7A66A]">{hour.label}:</span> {hour.value}
                    </p>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-[#1C1C1A] text-[#C7A66A]">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A7A39B] block mb-1">
                  Direct Line
                </span>
                <a
                  href={`tel:${barberProfile.phone}`}
                  className="text-lg sm:text-xl font-medium text-[#F4F0E8] hover:text-[#C7A66A] transition-colors"
                >
                  {barberProfile.phone}
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: High-Contrast Dark Map Preview Card */}
          <div className="lg:col-span-6">
            <FadeIn delay={0.2} className="rounded-3xl p-8 sm:p-12 bg-[#141413] border border-[rgba(244,240,232,0.15)] flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66A] block mb-2">
                  STUDIO LOCATION
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#F4F0E8] mb-4">
                  {barberProfile.shopName}
                </h3>
                <p className="text-sm font-light text-[#A7A39B] mb-8">
                  Located in the heart of {barberProfile.city}. Private studio parking available for appointments.
                </p>
              </div>

              {barberProfile.socials?.googleMaps && (
                <a
                  href={barberProfile.socials.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#0B0B0A] bg-[#C7A66A] hover:bg-[#D8B87A] px-8 py-3.5 rounded-full self-start transition-colors"
                >
                  Get Directions <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Implement BookingSection**

```typescript
import { MessageSquare, Phone } from 'lucide-react';
import { barberProfile } from '../../../data/barber.ts';
import Button from '../../ui/Button.tsx';
import Magnet from '../../ui/Magnet.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function BookingSection() {
  return (
    <section id="contact" className="py-28 sm:py-36 md:py-48 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A] text-center min-h-[70vh] flex flex-col justify-center items-center border-t border-[rgba(244,240,232,0.12)]">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <FadeIn>
          <p className="eyebrow mb-4">07 / BOOK YOUR NEXT CUT</p>
          <h2 className="display-heading text-[12vw] sm:text-[9vw] md:text-[7.5vw] mb-6">
            READY FOR A BETTER CUT?
          </h2>
          <p className="body-editorial max-w-lg mb-12">
            Choose your style, pick your time, and let the barber handle the rest.
          </p>
        </FadeIn>

        {/* Primary Booking CTA with Magnet */}
        <FadeIn delay={0.2} className="mb-10">
          <Magnet strength={14}>
            <Button
              href={barberProfile.booking.primaryUrl}
              variant="primary"
              size="lg"
              className="shadow-2xl shadow-[#C7A66A]/20"
            >
              {barberProfile.booking.primaryLabel}
            </Button>
          </Magnet>
        </FadeIn>

        {/* Secondary Direct Channels */}
        <FadeIn delay={0.35} className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {barberProfile.booking.secondaryChannels.map((sec) => (
            <a
              key={sec.channel}
              href={sec.url}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141413] border border-[rgba(244,240,232,0.15)] text-xs font-semibold uppercase tracking-wider text-[#F4F0E8] hover:text-[#C7A66A] hover:border-[#C7A66A] transition-colors"
            >
              {sec.channel === 'phone' ? <Phone className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
              {sec.label}
            </a>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement Footer**

```typescript
import { barberProfile } from '../../data/barber.ts';
import { navigationData } from '../../data/navigation.ts';

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0A] border-t border-[rgba(244,240,232,0.12)] py-12 sm:py-16 px-5 sm:px-8 md:px-10 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <span className="text-xl font-black uppercase tracking-wider text-[#F4F0E8] block mb-1">
            {barberProfile.shopName}
          </span>
          <p className="text-xs uppercase tracking-widest text-[#A7A39B]">
            {barberProfile.tagline}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-6 sm:gap-8" aria-label="Footer Navigation">
          {navigationData.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-widest text-[#A7A39B] hover:text-[#F4F0E8] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-xs text-[#A7A39B] uppercase tracking-widest">
          © 2026 {barberProfile.shopName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: Build passes with 0 TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add src/utils src/components/sections/Location src/components/sections/Booking src/components/layout/Footer.tsx
git commit -m "feat: add LocationSection, BookingSection, Footer and Schema.org JSON-LD generator"
```

---

### Task 9: Full Page Assembly, SEO Schema Injection & Verification

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `Navbar`, `HeroSection`, `StylesSection`, `ServicesSection`, `AboutSection`, `GallerySection`, `TestimonialsSection`, `LocationSection`, `BookingSection`, `Footer`, `generateBarberShopJsonLd`.
- Produces: Complete, responsive, accessible, dark editorial barber landing page with dynamic Schema.org script injection.

- [ ] **Step 1: Assemble full landing page in src/App.tsx**

```typescript
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar.tsx';
import HeroSection from './components/sections/Hero/HeroSection.tsx';
import StylesSection from './components/sections/Styles/StylesSection.tsx';
import ServicesSection from './components/sections/Services/ServicesSection.tsx';
import AboutSection from './components/sections/About/AboutSection.tsx';
import GallerySection from './components/sections/Gallery/GallerySection.tsx';
import TestimonialsSection from './components/sections/Testimonials/TestimonialsSection.tsx';
import LocationSection from './components/sections/Location/LocationSection.tsx';
import BookingSection from './components/sections/Booking/BookingSection.tsx';
import Footer from './components/layout/Footer.tsx';
import { barberProfile } from './data/barber.ts';
import { generateBarberShopJsonLd } from './utils/seo.ts';

export default function App() {
  useEffect(() => {
    // Inject dynamic JSON-LD structured data into head
    const existingScript = document.getElementById('barbershop-jsonld');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'barbershop-jsonld';
      script.type = 'application/ld+json';
      script.textContent = generateBarberShopJsonLd(barberProfile);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F4F0E8] flex flex-col selection:bg-[#C7A66A] selection:text-[#0B0B0A] overflow-x-clip">
      <Navbar />
      <main>
        <HeroSection />
        <StylesSection />
        <ServicesSection />
        <AboutSection />
        <GallerySection />
        <TestimonialsSection />
        <LocationSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Run production build & verify type safety**

Run: `npm run build`
Expected: Zero warnings, zero errors, bundled assets in `dist/`.

- [ ] **Step 3: Verification with browser / dev preview**

Start dev server or preview and test:
1. Smooth scroll to `#styles`, `#services`, `#about`, `#gallery`, `#location`, `#contact`.
2. Responsive navigation at 360px, 768px, 1280px, 1920px.
3. Lightbox modal open, next, prev, escape close, focus restoration.
4. Mobile menu open, tab cycle, escape close, focus restoration.
5. Inverted cream sections (`#F4F0E8`) on Services and Testimonials.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: complete assembly of barber portfolio landing page with SEO schema"
```

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-19-barber-portfolio-landing-page.md`. Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach would you like to take?
