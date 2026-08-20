# Luxury Editorial Barber Web — System Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the existing `barber-web` codebase into an authentic, collision-free Digital Barber Editorial & Haircut Archive with quiet luxury atelier aesthetics, zero layout shift, and robust Vietnamese diacritics typography.

**Architecture:** A modular 10-phase refinement implementing tokenized responsive typography clamps, zero-reflow atelier service menu with stable preview and single booking CTA, expanded continuous-scroll haircut archive (`4/3` to `3/2` ratio), 3-chapter craftsmanship narrative with visual silence, and minimal plate orientation progress tracking.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Framer Motion, Lucide React, Vite.

## Global Constraints
- **Design Principle #1**: *Do not add visual complexity to compensate for weak hierarchy. First make the typography, spacing, scale and narrative work without animation. Then use motion only to amplify what already works.*
- **Cardinal Rule 1**: *Do not solve a hierarchy problem by adding animation.*
- **Cardinal Rule 2**: *Do not solve typography bugs with margin/padding hacks.*
- **Cardinal Rule 3**: *Do not solve UX friction by adding unnecessary interaction.*
- **Color Palette**: Near-black background (`#0B0B0A`), warm surface (`#141413`), cream text (`#F4F0E8`), muted warm cream (`#A7A39B`), gold accent (`#C7A66A` / `#6E5A37`).
- **Font Semantics**: `JetBrains Mono` strictly for plate numbers, technical timestamps, and specs (`01 / 07`, `45 MIN`). `Be Vietnam Pro` for all display headings, body, and prices.
- **Diacritics Clearance**: All headings must clear Vietnamese tone marks (`Đ, Ế, Ắ, Ộ, Ử, Ỗ, Ậ`) on all breakpoints.
- **Layout Shift Budget**: No intentional layout shifts during hover, font load, or card reveals.

---

### Task 0: Existing Implementation Audit & Root-Cause Analysis

**Files:**
- Audit: `src/styles/index.css`
- Audit: `src/components/sections/Hero/HeroSection.tsx`
- Audit: `src/components/sections/Styles/StyleCard.tsx`
- Audit: `src/components/sections/Services/ServiceCard.tsx`
- Audit: `src/components/sections/Gallery/GallerySection.tsx`

**Interfaces:**
- Produces: Complete root-cause inventory of typography overlap, clipping wrappers, hardcoded `<br>` tags, and padding compensations.

- [ ] **Step 1: Inspect index.css tokens and typography classes**
  Identify current `.hero-heading`, `.display-heading`, `.section-heading` line-heights (`0.94`, `0.98`, `1.04`) and letter-spacings. Note that static line-heights below 1.0 without breakpoint-responsive clamps cause uppercase Vietnamese accents to collide.

- [ ] **Step 2: Inspect HeroSection for line breaks, negative margins, and clipping**
  Verify headline wrapping logic in `HeroSection.tsx`.

- [ ] **Step 3: Inspect StyleCard and Services for overflow-hidden containers**
  Identify any `overflow: hidden` on text containers that clip ascenders/descenders.

- [ ] **Step 4: Commit Phase 0 audit notes**
  ```bash
  git commit --allow-empty -m "chore: complete phase 0 existing UI audit and root-cause mapping"
  ```

---

### Task 1: Core Typography Tokens & Anti-Overlap Engineering

**Files:**
- Modify: `src/styles/index.css`
- Modify: `index.html`

**Interfaces:**
- Consumes: Google Fonts + Local WOFF2 fonts for `Be Vietnam Pro` and `JetBrains Mono`.
- Produces: CSS utility tokens `--font-sans`, `--font-display`, `--font-mono`, `--type-display-xl`, `--type-display-lg`, `--type-heading`, `--type-body`, `--type-plate`.

- [ ] **Step 1: Define updated @theme typography tokens in index.css**
  Implement dynamic fluid typography clamps and line-height safety formulas in `src/styles/index.css`:
  ```css
  @theme {
    --font-sans: "Be Vietnam Pro", system-ui, -apple-system, sans-serif;
    --font-display: "Be Vietnam Pro", system-ui, -apple-system, sans-serif;
    --font-mono: "JetBrains Mono", monospace;
  }
  ```

- [ ] **Step 2: Update typography utility classes without padding hacks**
  Configure `.hero-heading`, `.display-heading`, `.section-heading`, `.body-editorial`, and `.plate-meta`:
  ```css
  .hero-heading {
    font-family: var(--font-display);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.035em;
    font-size: clamp(2.75rem, 8.5vw, 7.5rem);
    line-height: clamp(0.92, 1vw + 0.88, 1.02);
    color: #F4F0E8;
  }

  .display-heading {
    font-family: var(--font-display);
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.025em;
    font-size: clamp(2.25rem, 6vw, 5.25rem);
    line-height: clamp(0.96, 0.8vw + 0.92, 1.05);
    color: #F4F0E8;
  }

  .section-item-title {
    font-family: var(--font-display);
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.015em;
    font-size: clamp(1.25rem, 2.5vw, 2.25rem);
    line-height: 1.15;
    color: #F4F0E8;
  }

  .plate-meta {
    font-family: var(--font-mono);
    font-size: clamp(0.6875rem, 0.8vw, 0.8125rem);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.22em;
    line-height: 1.3;
    color: #C7A66A;
  }
  ```

- [ ] **Step 3: Verify build**
  Run: `pnpm build`
  Expected: Success.

- [ ] **Step 4: Commit**
  ```bash
  git add src/styles/index.css index.html
  git commit -m "feat(typography): establish safe fluid typography scale with diacritics collision clearance"
  ```

---

### Task 2: Container Standardization & Hero Section Alignment

**Files:**
- Modify: `src/components/sections/Hero/HeroSection.tsx`
- Modify: `src/components/ui/Button.tsx`

**Interfaces:**
- Consumes: Typography tokens from `index.css`.
- Produces: Refined Hero section with collision-free headline, natural text wrapping, primary gold booking CTA, and clean metadata row.

- [ ] **Step 1: Update HeroSection layout and hierarchy**
  Refine `src/components/sections/Hero/HeroSection.tsx`:
  - Micro-label: `00 / TIỆM BARBER CÁ NHÂN CAO CẤP` with `.plate-meta`.
  - Headline: `<h1 className="hero-heading text-center md:text-left">` without hardcoded breaking hacks.
  - Supporting statement: `.body-editorial` with appropriate margin.
  - Booking CTA: Gold primary pill + outline secondary anchor.
  - Bottom metadata: Clean hairline separated row.

- [ ] **Step 2: Verify responsive behavior on mobile & desktop**
  Ensure headline `ĐỊNH HÌNH PHONG CÁCH. KHẲNG ĐỊNH BẢN SẮC.` renders cleanly without glyph collision across all viewports.

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/sections/Hero/HeroSection.tsx src/components/ui/Button.tsx
  git commit -m "feat(hero): align hero section with editorial typography and collision-free bounds"
  ```

---

### Task 3: Atelier Service Menu Redesign (Zero-Reflow Stable Preview & Single CTA)

**Files:**
- Create/Modify: `src/components/sections/Services/ServicesSection.tsx`
- Create/Modify: `src/components/sections/Services/AtelierServiceRow.tsx`
- Create/Modify: `src/components/sections/Services/AtelierPreview.tsx`
- Delete/Deprecate: `src/components/sections/Services/ServiceCard.tsx` (card stacking replaced by atelier rows)

**Interfaces:**
- Consumes: `servicesData` from `src/data/services.ts`.
- Produces: Dark luxury atelier service menu with hairline dividers, anchored overlay preview, mobile inline detail expansion, and a single decisive booking CTA at the menu bottom.

- [ ] **Step 1: Implement AtelierServiceRow with zero-reflow geometry**
  Create `AtelierServiceRow.tsx` displaying:
  - Plate index (e.g. `01`, `02`, `03` in Mono).
  - Service title (`Be Vietnam Pro` bold uppercase).
  - Service short specs / duration.
  - Price in Gold (`Be Vietnam Pro` bold, e.g. `250.000đ`).
  - Mobile tap toggle for inline description without layout shifting neighbor rows.

- [ ] **Step 2: Implement AtelierPreview overlay**
  Create `AtelierPreview.tsx` as a fixed-bounds anchored overlay within the menu container that smoothly fades in the active service thumbnail without cursor attachment or layout reflow.

- [ ] **Step 3: Update ServicesSection with single bottom booking CTA**
  Structure `ServicesSection.tsx` on dark ground (`#0B0B0A`), containing:
  - Header: `02 / DỊCH VỤ & BẢNG GIÁ` + `CẮT. TẠO KIỂU. TRAU CHUỐT.`.
  - The list of Atelier service rows with hairline dividers.
  - Single primary booking CTA button: `[ ĐẶT LỊCH HẸN 1-ON-1 ]`.

- [ ] **Step 4: Verify build**
  Run: `pnpm build`
  Expected: Clean compilation with no unused imports.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/sections/Services/
  git commit -m "feat(services): implement dark atelier luxury menu with anchored preview and single CTA"
  ```

---

### Task 4: Haircut Archive Scaling & Sequential Line Reveal

**Files:**
- Modify: `src/components/sections/Styles/StylesSection.tsx`
- Modify: `src/components/sections/Styles/StyleCard.tsx`

**Interfaces:**
- Consumes: `stylesData` from `src/data/styles.ts`.
- Produces: Scaled continuous-scroll haircut archive (`clamp(320px, 84vw, 980px)`, aspect `4/3` to `3/2`) with overflow-safe 4-phase sequential reveal.

- [ ] **Step 1: Scale StyleCard artwork and configure aspect ratio**
  Update `StyleCard.tsx` container width to `clamp(320px, 84vw, 980px)` and frame aspect ratio to `4/3` (mobile) / `3/2` (desktop) with `max-h-[75vh]` container containment to prevent tall viewport distortion.

- [ ] **Step 2: Implement overflow-safe typography animation wrappers**
  Wrap titles in dedicated clipping containers with top/bottom vertical glyph clearance (`wrapper -> typography element`) so accented characters (`Ớ, Ế, Ắ`) are never clipped.

- [ ] **Step 3: Ensure continuous scroll without tabs or filter UI**
  Verify `StylesSection.tsx` maintains pure continuous vertical discovery.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/sections/Styles/
  git commit -m "feat(styles): scale haircut archive visual presence and enforce overflow-safe reveals"
  ```

---

### Task 5: The Experience (Visual Silence) & 3-Chapter Craftsmanship

**Files:**
- Modify: `src/components/sections/About/AboutSection.tsx`
- Modify: `src/components/sections/Gallery/GallerySection.tsx`

**Interfaces:**
- Consumes: Barber bio, craftsmanship images, architectural SVG assets.
- Produces: Visual silence pause section followed by a structured 3-chapter Craftsmanship story (`01 SPACE`, `02 CRAFT`, `03 DETAIL`).

- [ ] **Step 1: Implement Visual Silence section in AboutSection / Narrative flow**
  Create an intentional editorial pause with high-contrast negative space and dominant typography (`HƠN CẢ MỘT LẦN CẮT TÓC.`).

- [ ] **Step 2: Structure GallerySection into 3 explicit Craftsmanship chapters**
  Organize `GallerySection.tsx` into:
  - `01 // KHÔNG GIAN`: Studio calm, takara chair engineering, dedicated lighting.
  - `02 // TAY NGHỀ`: Precision scissors, magnetic clippers, sectioning craft.
  - `03 // CHI TIẾT`: Herbal hot towel ritual, razor work, tailored finishing.

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/sections/About/ src/components/sections/Gallery/
  git commit -m "feat(craft): establish visual silence pacing and 3-chapter craftsmanship narrative"
  ```

---

### Task 6: Proof & Transformation (Before/After Editorial Layer)

**Files:**
- Modify: `src/components/sections/Testimonials/TestimonialsSection.tsx`
- Modify: `src/components/sections/Testimonials/TestimonialCard.tsx`
- Modify: `src/components/ui/BeforeAfterSlider.tsx`

**Interfaces:**
- Consumes: Testimonials and Before/After transformation data.
- Produces: Integrated proof showcase where interactive before/after acts as an optional engagement layer preserving editorial integrity.

- [ ] **Step 1: Refine TestimonialsSection typography & cards**
  Ensure typography matches the primary sans family and ratings stars are neatly aligned.

- [ ] **Step 2: Refine BeforeAfterSlider typography labels**
  Ensure Before / After badges and text descriptions use safe line-heights and clear contrast.

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/sections/Testimonials/ src/components/ui/BeforeAfterSlider.tsx
  git commit -m "feat(proof): refine client transformation showcase and testimonial typography"
  ```

---

### Task 7: Navigation & Plate Orientation System

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Create: `src/components/ui/PlateProgress.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: Active scroll position.
- Produces: Desktop side rail plate tracker (`01 INTRO` ... `07 BOOK`) and mobile compact indicator (`03 / 07`).

- [ ] **Step 1: Simplify Navbar for Desktop & Mobile**
  - Desktop: Left brand mark, right booking pill.
  - Mobile: Left brand mark, right compact plate indicator (e.g. `03 / 07`).

- [ ] **Step 2: Create PlateProgress component**
  Build `src/components/ui/PlateProgress.tsx` utilizing `IntersectionObserver` to highlight the current active section plate (`01` through `07`) smoothly without scroll listeners causing main-thread stutter.

- [ ] **Step 3: Integrate PlateProgress in App.tsx**
  Wire `PlateProgress` into `App.tsx`.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/layout/Navbar.tsx src/components/ui/PlateProgress.tsx src/App.tsx
  git commit -m "feat(nav): implement minimal plate progress indicator and collapsed mobile header"
  ```

---

### Task 8: Location, Final Booking Hero & Performance Hardening

**Files:**
- Modify: `src/components/sections/Location/LocationSection.tsx`
- Modify: `src/components/sections/Booking/BookingSection.tsx`
- Modify: `src/components/layout/Footer.tsx`

**Interfaces:**
- Consumes: Studio schedule, phone, booking links.
- Produces: Climax booking hero (`SẴN SÀNG CHO MỘT DIỆN MẠO MỚI?`) with gold primary action, clean location schedule, and accessible footer.

- [ ] **Step 1: Refine LocationSection typography**
  Ensure opening hours and contact links render with crisp mono specs and gold accents.

- [ ] **Step 2: Refine BookingSection hero impact**
  Scale headline with safe collision bounds and prominent gold magnetic button.

- [ ] **Step 3: Refine Footer**
  Clean minimal copyright and brand statement.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/sections/Location/ src/components/sections/Booking/ src/components/layout/Footer.tsx
  git commit -m "feat(booking): polish location plate, final booking hero and footer"
  ```

---

### Task 9: Multi-Viewport Regression Testing, Vietnamese Glyph Validation & Build Gate

**Files:**
- Test: All components across viewports.

**Interfaces:**
- Validates: Zero typography collision, CLS = 0, production build pass.

- [ ] **Step 1: Run production build check**
  Run: `pnpm build`
  Expected: `dist/` built successfully in < 20s with zero TypeScript / lint errors.

- [ ] **Step 2: Multi-viewport visual validation**
  Inspect layout across 7 target viewports:
  - Mobile: `375px`, `390px`, `430px`
  - Tablet: `768px`
  - Desktop: `1280px`, `1440px`, `1920px`
  Verify zero overlap on all Vietnamese test strings (`ĐỊNH HÌNH PHONG CÁCH`, `KHẲNG ĐỊNH BẢN SẮC`, `CẮT TÓC THIẾT KẾ`, `FADE CHUYÊN SÂU`).

- [ ] **Step 3: Verify prefers-reduced-motion**
  Confirm animations gracefully render static states when reduced motion is enabled.

- [ ] **Step 4: Final commit**
  ```bash
  git commit --allow-empty -m "chore: complete phase 9 multi-viewport regression and build validation"
  ```
