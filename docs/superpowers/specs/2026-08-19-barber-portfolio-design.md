# Design Specification: Premium Dark Editorial Barber Portfolio Landing Page

**Date**: 2026-08-19  
**Status**: Approved Specification  
**Project**: `[BARBERSHOP_NAME]` Portfolio Landing Page  
**Tech Stack**: React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide React, Vite

---

## 1. Overview & Objectives

The goal is to design and build a high-conversion, accessible, responsive, and performance-optimized personal portfolio landing page for an independent barber studio (`[BARBERSHOP_NAME]`).

The visual identity combines a modern barber studio with high-end men's grooming and a fashion editorial aesthetic.

### Core User Journey:
1. **First Impression (Hero)**: "This barber has a distinct style and signature craft."
2. **Haircut Portfolio (Styles)**: "Show me the work — clean fades, textured crops, and classic cuts."
3. **Services & Pricing (Services)**: "How much does it cost and what is included?"
4. **Trust & Persona (About & Studio Gallery)**: "Who is the barber and what is the studio experience like?"
5. **Social Proof (Testimonials)**: "What do clients say?" (Rendered only if real reviews exist or clearly disclaimed).
6. **Location & Schedule (Location)**: "Where is the studio and when is it open?"
7. **Call to Action (Booking)**: "Book an appointment through the primary channel or reach out via direct messaging."

---

## 2. Design System & Global Styles

### 2.1 Color Palette
- **Dark Core Background**: `#0B0B0A` (applied to `html`, `body`, `#root`, and dark sections)
- **Primary Typography**: `#F4F0E8` (warm off-white)
- **Muted Typography**: `#A7A39B` (soft warm gray)
- **Secondary Body Typography**: `#D6D1C8` (cream-gray)
- **Warm Gold Accent**: `#C7A66A` (disciplined accent used strictly for eyebrows, active category indicators, fine dividers, and the primary booking CTA)
- **Hover Gold**: `#D8B87A`
- **Border Tone (Dark Sections)**: `rgba(244, 240, 232, 0.18)`
- **Inverted Section Background**: `#F4F0E8` (warm cream background for **Services** and **Testimonials** sections)
- **Inverted Typography**: `#0B0B0A` (deep black on cream sections)
- **Inverted Border Tone**: `rgba(11, 11, 10, 0.15)`

### 2.2 Typography Hierarchy Tokens
- **Font Family**: Google Font `'Manrope', sans-serif` (weights 300, 400, 500, 600, 700, 800, 900)
- **Hero Heading Token (`.hero-heading`)**: `font-black uppercase tracking-tight leading-none text-[17vw] sm:text-[15vw] md:text-[13vw] lg:text-[11vw] xl:text-[10vw]`
- **Display Heading Token (`.display-heading`)**: `font-black uppercase tracking-tight leading-none clamp(3.5rem, 10vw, 9rem)`
- **Section Heading Token (`.section-heading`)**: `font-black uppercase tracking-tight leading-none clamp(2.5rem, 7vw, 6rem)`
- **Eyebrow Token (`.eyebrow`)**: `font-semibold uppercase tracking-[0.2em] text-xs sm:text-sm text-[#C7A66A]`
- **Body Token (`.body-editorial`)**: `font-light leading-relaxed text-sm sm:text-base md:text-lg text-[#A7A39B]`
- **Numeric Display Token (`.numeric-display`)**: `font-black leading-none clamp(3rem, 9vw, 8rem)`
- **Small Metadata Token (`.meta-label`)**: `font-medium uppercase tracking-widest text-[10px] sm:text-xs text-[#A7A39B]`

### 2.3 Layout, Spacing & Anchor Offsets
- Global reset: `box-sizing: border-box`, `margin: 0`, `padding: 0`.
- Smooth scrolling enabled on `html` with `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }`.
- Main wrapper with `overflow-x: clip`.
- Section anchor offset: `scroll-margin-top: calc(5rem + 1rem)` to prevent sticky navbar from obscuring section headings when navigating via anchor links.
- Section padding rhythm: `py-20 sm:py-28 md:py-36` with responsive gutters `px-5 sm:px-8 md:px-10 lg:px-12`.
- Large rounded top borders for inverted cream sections: `rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]`.

---

## 3. Motion, Interaction & Accessibility Principles

### 3.1 Motion System
1. **Framer Motion Viewport Triggers**:
   - `whileInView` with `viewport={{ once: true, amount: 0.15 }}`.
   - Easing curve: `[0.25, 0.1, 0.25, 1]`.
   - Default animation duration: `0.7s - 0.9s`.
   - **GPU Acceleration**: Animate strictly `transform` and `opacity` (never animate `width`, `height`, `top`, `left`, or `margin`).
2. **Subtle Desktop Magnet (Primary CTA Only)**:
   - Very subtle cursor-follow on the main Booking CTA button on non-touch devices with pointer support (`@media (hover: hover) and (pointer: fine)`).
   - No CustomCursor component (preserves a grounded, confident editorial feel).

### 3.2 Accessibility Architecture
1. **Focus States**: High-contrast, visible `:focus-visible` styling (`outline: 2px solid #C7A66A`, `outline-offset: 3px`) across all interactive elements.
2. **Accessible Buttons**: All icon-only buttons (Mobile Menu Toggle, Lightbox Close, Lightbox Previous, Lightbox Next) include explicit `aria-label` attributes.
3. **Mobile Navigation Dialog**:
   - Trigger includes `aria-expanded` and `aria-controls="mobile-menu"`.
   - On open: Focus moves automatically to the first interactive menu link.
   - Traps focus within the menu overlay (`Tab` / `Shift+Tab` cycles).
   - Closes on `Escape` key press or backdrop tap.
   - On close: Focus is restored back to the hamburger menu trigger.
   - Body scroll locked while menu is active.
4. **Lightbox Dialog Semantics**:
   - `role="dialog"`, `aria-modal="true"`, `aria-label="Haircut Image Lightbox"`.
   - Focus trapped inside modal; `Escape` key closes modal; `ArrowLeft` / `ArrowRight` navigate.
   - Body scroll locked while open.
   - Focus restored to triggering portfolio item on close.
5. **Reduced Motion**:
   - Full support for `prefers-reduced-motion: reduce` via `useReducedMotion` hook and CSS media queries.
   - Transforms, scale hover effects, magnetic tracking, and smooth scroll behavior are disabled; content visibility is instantly rendered.

---

## 4. Architecture & Directory Layout

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
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero/
│   │   │   │   └── HeroSection.tsx
│   │   │   ├── Styles/
│   │   │   │   ├── StylesSection.tsx
│   │   │   │   └── StyleCard.tsx
│   │   │   ├── Services/
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   └── ServiceItem.tsx
│   │   │   ├── About/
│   │   │   │   └── AboutSection.tsx
│   │   │   ├── Gallery/
│   │   │   │   └── GallerySection.tsx
│   │   │   ├── Testimonials/
│   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   └── TestimonialCard.tsx
│   │   │   ├── Location/
│   │   │   │   └── LocationSection.tsx
│   │   │   └── Booking/
│   │   │       └── BookingSection.tsx
│   │   └── ui/
│   │       ├── EditorialImage.tsx
│   │       ├── Button.tsx
│   │       ├── Lightbox.tsx
│   │       ├── FadeIn.tsx
│   │       ├── ImageReveal.tsx
│   │       └── Magnet.tsx
│   ├── data/
│   │   ├── barber.ts
│   │   ├── services.ts
│   │   ├── styles.ts
│   │   ├── gallery.ts
│   │   ├── testimonials.ts
│   │   └── navigation.ts
│   ├── types/
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useReducedMotion.ts
│   │   └── useMediaQuery.ts
│   ├── styles/
│   │   └── index.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 5. Strict Data Model & Separation (`src/types/index.ts`)

All business information, addresses, prices, stats, opening hours, testimonials, social channels, and booking URLs reside **strictly** within `src/data/*.ts`. Zero business data is hardcoded in JSX.

```typescript
export interface OpeningHour {
  label: string; // e.g. "Mon — Sat", "Sunday"
  value: string; // e.g. "09:00 — 20:00", "Closed"
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

---

## 6. Section Specifications

### 6.1 Navbar (`src/components/layout/Navbar.tsx`)
- **Sticky positioning**: `top-0 z-50`.
- **Background transition**: Initially transparent; transitions to `rgba(11, 11, 10, 0.82)` with `backdrop-blur-md` and `border-b border-[rgba(244,240,232,0.12)]` on scroll.
- **Brand name**: Rendered from `barberProfile.shopName`.
- **Navigation links**: Rendered dynamically from `navigationData`.
- **CTA**: "Book Now" pill button pointing to `barberProfile.booking.primaryUrl`.
- **Mobile overlay**: Fullscreen dialog with accessible focus trap, smooth fade-in links, and `Escape` key / close button handling.

### 6.2 Hero Section (`src/components/sections/Hero/HeroSection.tsx`)
- **Height**: `min-h-[100svh]`, flex column, `overflow-x: clip`.
- **Eyebrow**: Fixed UI label + dynamic shop name (`${barberProfile.shopName} / PERSONAL BARBER STUDIO`).
- **Heading**: Massive fluid typography `.hero-heading` rendering `barberProfile.heroHeadline`.
- **Supporting Copy**: Fluid text rendering `barberProfile.heroSupportingText`.
- **CTAs**:
  - Primary `"BOOK AN APPOINTMENT"` with subtle `Magnet` wrapper pointing to `barberProfile.booking.primaryUrl`.
  - Secondary `"VIEW STYLES"` anchor pointing to `#styles`.
- **Hero Image**: Metadata supplied by `barberProfile.heroImage` with `loading="eager"`, `fetchpriority="high"`, `decoding="async"`, and reserved aspect ratio.
- **Footer Meta**: Dynamic city/country (`${barberProfile.city}, ${barberProfile.country}`), opening hours summary, and established year.

### 6.3 Styles Section (`src/components/sections/Styles/StylesSection.tsx`)
- **Eyebrow**: `"01 / SIGNATURE STYLES"`.
- **Heading**: `"THE WORK SPEAKS FOR ITSELF."`.
- **Category Filter Tabs**: Dynamically generated from categories (`ALL`, `FADE`, `TEXTURED`, `CLASSIC`, `LONG`, `BEARD`) with `#C7A66A` indicator.
- **Portfolio Grid**: Dynamic `.map()` rendering with grid variant mapping (`featured` -> `col-span-7`, `wide` -> `col-span-8`, `standard` -> `col-span-5` or `col-span-4`).
- **Card Interaction**: Image zoom (`scale: 1.04`), dark overlay, and category badge reveal on hover; static clean metadata display on touch devices.

### 6.4 Services Section (`src/components/sections/Services/ServicesSection.tsx`)
- **Background**: `#F4F0E8` (warm cream) with `rounded-t-[40px] sm:rounded-t-[60px]`.
- **Heading**: `"CUT. STYLE. REFINE."`.
- **Dynamic Render**: `services.map((item, index) => ...)` rendering service rows dynamically, with index-derived number badge (e.g. `String(index + 1).padStart(2, '0')`).
- **Row Anatomy**: Big numeric index, title, description, price badge (`item.price`), and subtle hover arrow transition.

### 6.5 About Section (`src/components/sections/About/AboutSection.tsx`)
- **Background**: `#0B0B0A`.
- **Eyebrow**: `"03 / THE BARBER"`.
- **Heading**: `"MORE THAN A HAIRCUT."`.
- **Layout**:
  - Left: Portrait photograph (`barberProfile.barberImage`, aspect 4/5, rounded editorial frame).
  - Right: Personal craft biography (`barberProfile.bioParagraphs.map(...)`) + dynamic statistics grid (`barberProfile.stats.map(...)`).

### 6.6 Gallery Section (`src/components/sections/Gallery/GallerySection.tsx`)
- **Background**: `#0B0B0A`.
- **Eyebrow**: `"04 / INSIDE THE STUDIO"`.
- **Heading**: `"THE SPACE. THE CRAFT. THE DETAIL."`.
- **Grid Layout**: Mixed editorial grid rendered from `gallery.map(...)`.
- **Fullscreen Lightbox**:
  - Accessible modal dialog triggered on item click.
  - Features: Close button, Next/Previous controls, keyboard arrow navigation (`ArrowLeft` / `ArrowRight`), `Escape` close, focus trap, and touch swipe gestures.

### 6.7 Testimonials Section (`src/components/sections/Testimonials/TestimonialsSection.tsx`)
- **Background**: `#F4F0E8` (warm cream) with `rounded-t-[40px] sm:rounded-t-[60px]`.
- **Eyebrow**: `"05 / CLIENTS"`.
- **Heading**: `"GOOD HAIR. GOOD ENERGY."`.
- **Display Logic**:
  - Rendered dynamically from `testimonials.map(...)`.
  - If `barberProfile.showTestimonials === false` or `testimonials.length === 0`, the section is hidden cleanly.
  - If placeholder reviews are displayed, an honest editorial note is rendered to guarantee authentic transparency.

### 6.8 Location Section (`src/components/sections/Location/LocationSection.tsx`)
- **Background**: `#0B0B0A`.
- **Eyebrow**: `"06 / FIND THE SHOP"`.
- **Heading**: `"COME SIT IN THE CHAIR."`.
- **Layout**:
  - Left: Address (`barberProfile.address`), Opening hours (`barberProfile.openingHours.map(...)`), Phone (`barberProfile.phone`).
  - Right: High-contrast dark static map preview card with `"GET DIRECTIONS →"` button linking to `barberProfile.socials.googleMaps`.

### 6.9 Booking Section (`src/components/sections/Booking/BookingSection.tsx`)
- **Background**: `#0B0B0A`, `min-h-[70vh]`.
- **Eyebrow**: `"07 / BOOK YOUR NEXT CUT"`.
- **Heading**: `"READY FOR A BETTER CUT?"`.
- **Booking Flow**:
  - Primary CTA: Large button linking directly to `barberProfile.booking.primaryUrl` with subtle desktop `Magnet` effect.
  - Secondary Channels: Direct quick-action links (Zalo, Messenger, Instagram, Phone) rendered cleanly underneath.

### 6.10 Footer (`src/components/layout/Footer.tsx`)
- **Border**: Top `1px solid rgba(244, 240, 232, 0.12)`.
- **Content**: Dynamic shop name, tagline, address, phone, social links, anchor navigation links, and copyright timestamp.

---

## 7. SEO & Structured Data Strategy

### 7.1 Meta & Head Tags (`index.html` & dynamic helpers)
- **Title**: `[BARBERSHOP_NAME] — Premium Personal Barber in [CITY]`
- **Meta Description**: `[BARBERSHOP_NAME] — Personal barber specializing in precision haircuts, modern fades, styling, and grooming in [CITY]. Book your appointment today.`
- **Canonical Link**: Configurable canonical URL.
- **Open Graph / Twitter Tags**: `og:title`, `og:description`, `og:image` (`/images/hero/hero.jpg`), `og:type="website"`, `og:locale`.
- **Favicon**: Minimalist dark-editorial SVG favicon.

### 7.2 LocalBusiness / BarberShop Schema (JSON-LD)
A clean, valid Schema.org script is injected dynamically into `<head>` based on `barberProfile`, outputting only non-empty, genuine fields without emitting fake placeholders:
```typescript
export function generateBarberShopJsonLd(profile: BarberProfile) {
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    "name": profile.shopName,
  };

  if (profile.heroImage?.src) {
    schema.image = profile.heroImage.src;
  }
  if (profile.phone && !profile.phone.includes("[")) {
    schema.telephone = profile.phone;
  }
  if (profile.address && !profile.address.includes("[")) {
    schema.address = {
      "@type": "PostalAddress",
      "streetAddress": profile.address,
      "addressLocality": profile.city,
      "addressCountry": profile.country,
    };
  }
  if (profile.socials?.googleMaps && !profile.socials.googleMaps.includes("[")) {
    schema.hasMap = profile.socials.googleMaps;
  }

  return JSON.stringify(schema, null, 2);
}
```

---

## 8. Image Infrastructure & Performance Strategy

### 8.1 Asset Organization
```
public/images/
├── hero/hero.jpg
├── styles/low-fade.jpg, mid-fade.jpg, high-fade.jpg, textured-crop.jpg, classic.jpg, long-hair.jpg, beard.jpg
├── barber/barber.jpg
└── gallery/chair.jpg, tools.jpg, interior.jpg, barber-working.jpg, detail.jpg, products.jpg
```

### 8.2 `EditorialImage` Component Implementation
- **Layout Stability**: Container explicitly reserves aspect ratio (`aspect-[4/5]`, `aspect-[3/4]`, `aspect-square`, etc.) to prevent layout shifts during image loading.
- **Performance Loading**:
  - Hero image: `loading="eager"`, `fetchpriority="high"`, `decoding="async"`.
  - Below-the-fold images: `loading="lazy"`, `decoding="async"`.
- **Graceful Fallbacks**:
  - Shows dark shimmer loading skeleton while fetching.
  - If an image fails to load or file is missing, seamlessly renders a dark editorial fallback state with category watermark and style initials without displaying browser broken-image icons.

---

## 9. Verification & Acceptance Criteria

1. **Visual Excellence**:
   - Dark editorial magazine theme (`#0B0B0A`) with `#F4F0E8` inverted sections.
   - Disciplined gold accents (`#C7A66A`).
   - Smooth 60fps GPU-accelerated motion (animating strictly `transform` and `opacity`).
2. **Accessibility**:
   - High-contrast `:focus-visible` styling on all interactive components.
   - Accessible names (`aria-label`) on all icon-only buttons.
   - Focus trapping, focus restoration, and `Escape` key close handling on Mobile Menu and Lightbox.
   - Full `prefers-reduced-motion` compliance.
3. **Data Integrity**:
   - 100% of business content, opening hours, and contact details centralized in `src/data/*.ts`.
   - Array-driven dynamic rendering for services, styles, and gallery items.
4. **Performance & SEO**:
   - Image container dimension reservation to prevent loading layout shifts.
   - High-priority hero image loading and lazy loading for below-fold assets.
   - Valid Semantic HTML heading hierarchy (`h1` -> `h2` -> `h3`) and safe `BarberShop` JSON-LD schema.
