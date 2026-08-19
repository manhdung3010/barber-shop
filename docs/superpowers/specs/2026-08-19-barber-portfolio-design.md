# Design Specification: Premium Dark Editorial Barber Portfolio Landing Page

**Date**: 2026-08-19  
**Status**: Draft for User Review  
**Project**: `[BARBERSHOP_NAME]` Portfolio Landing Page  
**Tech Stack**: React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vite

---

## 1. Overview & Objectives

The goal is to design and build a high-conversion, responsive personal portfolio landing page for an independent barber studio (`[BARBERSHOP_NAME]`). The visual identity combines a modern barber studio with high-end men's grooming and a fashion editorial aesthetic.

### Core User Journey:
1. **First Impression (Hero)**: "This barber has a distinct style and signature craft."
2. **Haircut Portfolio (Styles)**: "Show me the work — clean fades, textured crops, and classic cuts."
3. **Services & Pricing (Services)**: "How much does it cost and what is included?"
4. **Trust & Persona (About & Studio Gallery)**: "Who is the barber and what is the studio experience like?"
5. **Social Proof (Testimonials)**: "What do clients say?"
6. **Location & Schedule (Location)**: "Where is the studio and when is it open?"
7. **Call to Action (Booking)**: "Book an appointment or contact the barber directly."

---

## 2. Design System & Global Styles

### Color Palette
- **Dark Core Background**: `#0B0B0A` (applied to `html`, `body`, `#root`, and dark sections)
- **Primary Typography**: `#F4F0E8` (warm off-white)
- **Muted Typography**: `#A7A39B` (soft warm gray)
- **Secondary Body Typography**: `#D6D1C8` (cream-gray)
- **Warm Gold Accent**: `#C7A66A` (used with strict discipline for eyebrows, active indicators, fine dividers, and primary CTA background)
- **Hover Gold**: `#D8B87A`
- **Border Tone (Dark Sections)**: `rgba(244, 240, 232, 0.18)`
- **Inverted Section Background**: `#F4F0E8` (warm cream background for **Services** and **Testimonials** sections)
- **Inverted Typography**: `#0B0B0A` (black text on cream sections)
- **Inverted Border Tone**: `rgba(11, 11, 10, 0.15)`

### Typography Hierarchy Tokens
- **Font Family**: Google Font `'Manrope', sans-serif` (weights 300, 400, 500, 600, 700, 800, 900)
- **Hero Heading Token (`.hero-heading`)**: `font-black uppercase tracking-tight leading-none text-[17vw] sm:text-[15vw] md:text-[13vw] lg:text-[11vw] xl:text-[10vw]`
- **Display Heading Token (`.display-heading`)**: `font-black uppercase tracking-tight leading-none clamp(3.5rem, 10vw, 9rem)`
- **Section Heading Token (`.section-heading`)**: `font-black uppercase tracking-tight leading-none clamp(2.5rem, 7vw, 6rem)`
- **Eyebrow Token (`.eyebrow`)**: `font-semibold uppercase tracking-[0.2em] text-xs sm:text-sm text-[#C7A66A]`
- **Body Token (`.body-editorial`)**: `font-light leading-relaxed text-sm sm:text-base md:text-lg text-[#A7A39B]`
- **Numeric Display Token (`.numeric-display`)**: `font-black leading-none clamp(3rem, 9vw, 8rem)`
- **Small Metadata Token (`.meta-label`)**: `font-medium uppercase tracking-widest text-[10px] sm:text-xs text-[#A7A39B]`

### Layout & Spacing
- Global reset: `box-sizing: border-box`, `margin: 0`, `padding: 0`.
- Smooth scrolling enabled on `html`.
- Main wrapper with `overflow-x: clip`.
- Section padding rhythm: `py-20 sm:py-28 md:py-36` with responsive gutters `px-5 sm:px-8 md:px-10 lg:px-12`.
- Large rounded top borders for inverted sections: `rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]`.

---

## 3. Motion & Interaction Principles

1. **Framer Motion Viewport Triggers**:
   - `whileInView` with `viewport={{ once: true, amount: 0.15 }}`.
   - Easing curve: `[0.25, 0.1, 0.25, 1]`.
   - Default animation duration: `0.7s - 0.9s`.
2. **Reduced Motion**:
   - Full support for `prefers-reduced-motion: reduce`.
   - Disables translate transforms, scales, cursor animations, and magnetic tracking; preserves opacity and layout stability.
3. **Subtle Interactive Elements**:
   - **Magnetic Button**: Low-strength cursor follow (strength: 5, padding: 100) applied *only* to the primary booking CTA on non-touch devices.
   - **Custom Cursor**: Lightweight subtle dot cursor active only on desktop pointer devices, with scale-up on interactive elements.

---

## 4. Directory & Architecture Structure

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
│       ├── gallery/
│       │   ├── chair.jpg
│       │   ├── tools.jpg
│       │   ├── interior.jpg
│       │   ├── barber-working.jpg
│       │   ├── detail.jpg
│       │   └── products.jpg
│       └── studio/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── FooterSection.tsx
│   │   ├── sections/
│   │   │   ├── hero/
│   │   │   │   └── HeroSection.tsx
│   │   │   ├── styles/
│   │   │   │   ├── StylesSection.tsx
│   │   │   │   └── StyleCard.tsx
│   │   │   ├── services/
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   └── ServiceItem.tsx
│   │   │   ├── about/
│   │   │   │   └── AboutSection.tsx
│   │   │   ├── gallery/
│   │   │   │   └── GallerySection.tsx
│   │   │   ├── testimonials/
│   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   └── TestimonialCard.tsx
│   │   │   ├── location/
│   │   │   │   └── LocationSection.tsx
│   │   │   └── booking/
│   │   │       └── BookingSection.tsx
│   │   └── ui/
│   │       ├── EditorialImage.tsx
│   │       ├── ContactButton.tsx
│   │       ├── BookNowButton.tsx
│   │       ├── OutlineButton.tsx
│   │       ├── FadeIn.tsx
│   │       ├── ImageReveal.tsx
│   │       ├── Lightbox.tsx
│   │       ├── Magnet.tsx
│   │       └── CustomCursor.tsx
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
│   │   ├── useScrollPosition.ts
│   │   ├── useMediaQuery.ts
│   │   └── useReducedMotion.ts
│   ├── styles/
│   │   └── index.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 5. Section Specifications

### 5.1 Navbar (`src/components/layout/Navbar.tsx`)
- **Position**: Sticky top `z-50`.
- **Initial State**: Transparent background.
- **Scrolled State**: `rgba(11, 11, 10, 0.82)` with `backdrop-blur-md` and `border-b border-[rgba(244,240,232,0.12)]`.
- **Brand**: `[BARBERSHOP_NAME]` (font-bold, tracking-wider).
- **Desktop Links**: Styles, Services, About, Contact with hover opacity 70%.
- **Action**: "Book Now" CTA pill button.
- **Mobile Menu**: Fullscreen overlay triggered by hamburger button with keyboard trap and smooth body scroll lock.

### 5.2 Hero Section (`src/components/sections/hero/HeroSection.tsx`)
- **Height**: `min-h-[100svh]`, flex column, `overflow-x: clip`.
- **Eyebrow**: `"[BARBERSHOP_NAME] / PERSONAL BARBER STUDIO"`.
- **Heading**: `"YOUR STYLE. YOUR SIGNATURE."` dominating viewport with `.hero-heading`.
- **Supporting Copy**: `"Precision cuts, modern fades, and personalized grooming crafted for your style."`.
- **CTA**: Primary `"BOOK AN APPOINTMENT"` + Secondary `"VIEW STYLES"`.
- **Hero Image**: Single high-resolution photo (`/images/hero/hero.jpg`) in locked aspect ratio with dark subtle gradient overlay.
- **Footer Meta**: `"[CITY], [COUNTRY]"`, `"MON — SAT / 09:00 — 20:00"`, `"EST. [YEAR]"`.

### 5.3 Styles Section (`src/components/sections/styles/StylesSection.tsx`)
- **Eyebrow**: `"01 / SIGNATURE STYLES"`.
- **Heading**: `"THE WORK SPEAKS FOR ITSELF."`.
- **Filters**: Interactive category buttons (`ALL`, `FADE`, `TEXTURED`, `CLASSIC`, `LONG`, `BEARD`) with `#C7A66A` bottom indicator.
- **Masonry Layout**: 12-column dynamic grid (`col-span-7`, `col-span-5`, `col-span-4`, `col-span-8`, `col-span-6`) with rounded cards (`rounded-[24px] sm:rounded-[32px]`).
- **Interaction**: Hover scale `1.04`, dark overlay `0.35`, category and style title slide-in; touch devices display details persistently.

### 5.4 Services Section (`src/components/sections/services/ServicesSection.tsx`)
- **Background**: `#F4F0E8` (warm cream) with `rounded-t-[40px] sm:rounded-t-[60px]`.
- **Heading**: `"CUT. STYLE. REFINE."`.
- **5 Service Rows**: Haircut, Fade, Haircut + Beard, Perm, Styling.
- **Row Layout**: Large number (`01`, `02`, etc.), Service Title, Description, `[PRICE]`, and interactive hover slide arrow.

### 5.5 About Section (`src/components/sections/about/AboutSection.tsx`)
- **Background**: `#0B0B0A`.
- **Eyebrow**: `"03 / THE BARBER"`.
- **Heading**: `"MORE THAN A HAIRCUT."`.
- **Left Column**: Barber Portrait (`/images/barber/barber.jpg`, aspect 4/5, `rounded-[30px] sm:rounded-[40px]`).
- **Right Column**: Personal craft story + 4 stat badges (`"[XX]+ YEARS"`, `"[XXXX]+ CUTS"`, `"[XX]+ STYLES"`, `"[XX]+ CLIENTS"`).

### 5.6 Gallery Section (`src/components/sections/gallery/GallerySection.tsx`)
- **Background**: `#0B0B0A`.
- **Eyebrow**: `"04 / INSIDE THE STUDIO"`.
- **Heading**: `"THE SPACE. THE CRAFT. THE DETAIL."`.
- **12-Column Studio Grid**: Mixed editorial spans showcasing chairs, tools, interior, and craft details.
- **Lightbox Integration**: Clicking opens accessible fullscreen Lightbox modal with keyboard controls (`Esc`, `ArrowLeft`, `ArrowRight`), body scroll lock, and touch gestures.

### 5.7 Testimonials Section (`src/components/sections/testimonials/TestimonialsSection.tsx`)
- **Background**: `#F4F0E8` (warm cream) with `rounded-t-[40px] sm:rounded-t-[60px]`.
- **Eyebrow**: `"05 / CLIENTS"`.
- **Heading**: `"GOOD HAIR. GOOD ENERGY."`.
- **Cards**: Minimalist editorial quote cards with client names and 5-star ratings.

### 5.8 Location Section (`src/components/sections/location/LocationSection.tsx`)
- **Background**: `#0B0B0A`.
- **Eyebrow**: `"06 / FIND THE SHOP"`.
- **Heading**: `"COME SIT IN THE CHAIR."`.
- **Schedule & Details**: Address `[ADDRESS]`, hours (`MON — SAT 09:00 — 20:00`, `SUN 10:00 — 18:00`), phone `[PHONE]`.
- **Map Preview**: Dark-themed lightweight map preview card with `"GET DIRECTIONS →"` link to `[GOOGLE_MAPS_URL]`.

### 5.9 Booking Section (`src/components/sections/booking/BookingSection.tsx`)
- **Background**: `#0B0B0A`, `min-h-[70vh]`.
- **Eyebrow**: `"07 / BOOK YOUR NEXT CUT"`.
- **Heading**: `"READY FOR A BETTER CUT?"`.
- **CTA Actions**:
  - Primary `"BOOK AN APPOINTMENT"` with subtle `Magnet` cursor tracking on desktop.
  - Secondary `"CONTACT THE BARBER"`.
- **Direct Channels**: Zalo (`[ZALO_URL]`), Messenger (`[MESSENGER_URL]`), Instagram (`[INSTAGRAM_URL]`), Phone (`tel:[PHONE]`).

### 5.10 Footer Section (`src/components/layout/FooterSection.tsx`)
- **Border**: Top `1px solid rgba(244, 240, 232, 0.12)`.
- **Content**: `[BARBERSHOP_NAME]`, tagline, direct contact, social links, anchor links, and `© 2026 [BARBERSHOP_NAME]`.

---

## 6. Data Model (`src/types/index.ts`)

```typescript
export interface BarberProfile {
  name: string;
  shopName: string;
  tagline: string;
  bio: string[];
  stats: { value: string; label: string }[];
  city: string;
  country: string;
  address: string;
  phone: string;
  hours: {
    weekdays: string;
    sunday: string;
  };
  socials: {
    instagram: string;
    zalo: string;
    messenger: string;
    googleMaps: string;
  };
  establishedYear: string;
}

export interface Service {
  id: number;
  number: string;
  name: string;
  description: string;
  price: string;
}

export interface StyleItem {
  id: number;
  title: string;
  category: 'fade' | 'textured' | 'classic' | 'long' | 'beard';
  description: string;
  image: string;
  spanDesktop: string;
  aspectRatio: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  alt: string;
  image: string;
  spanDesktop: string;
  aspectRatio: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  clientName: string;
  rating: number;
  service?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}
```

---

## 7. Image Asset & Fallback Strategy

### Asset Directory Structure:
```
public/images/
├── hero/hero.jpg
├── styles/low-fade.jpg, mid-fade.jpg, high-fade.jpg, textured-crop.jpg, classic.jpg, long-hair.jpg, beard.jpg
├── barber/barber.jpg
└── gallery/chair.jpg, tools.jpg, interior.jpg, barber-working.jpg, detail.jpg, products.jpg
```

### `EditorialImage` Fallback Implementation:
- Preserves explicit aspect-ratio container (`aspect-[4/5]`, `aspect-[3/4]`, `aspect-square`, etc.) to guarantee zero layout shift (`CLS = 0`).
- Displays a dark shimmer skeleton with subtle editorial badge while loading.
- On image error or missing file, seamlessly displays an elegant dark editorial placeholder with style/category label and brand initials rather than browser broken image icons.

---

## 8. Verification & Acceptance Criteria

1. **Visual & Aesthetic Standard**:
   - Dark editorial magazine theme with `#0B0B0A` base and warm `#F4F0E8` inverted sections.
   - Disciplined gold accents (`#C7A66A`) on key interactive targets.
   - Smooth 60fps Framer Motion transitions.
2. **Zero Layout Shifts & Responsive Fluidity**:
   - Fluid typography using `clamp()`.
   - Masonry layout adapts gracefully from 360px mobile screens to ultrawide 2K/4K displays.
3. **Data Isolation**:
   - 100% of business details, placeholders, and pricing contained in `src/data/*.ts`.
4. **Accessibility**:
   - Keyboard accessible navigation and Lightbox modal (`Escape`, `ArrowLeft`, `ArrowRight`).
   - Strict `prefers-reduced-motion` compliance.
