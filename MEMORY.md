# 🧠 Portfolio Website — Project Brain & Memory (MEMORY.md)

> **Purpose of this file**:  
> Ye file is portfolio project ka **Brain & Permanent Memory** hai. Jab bhi project mein koi bhi new feature, project, design change ya fix kiya jaye ga, is file ko lazmi update kiya jaye ga taakay future mein AI aur Developer dono ke paas poora context hamesha available rahay.

---

## 📌 1. Project Overview & Tech Stack

* **Developer Portfolio**: Muhammad Awais — Creative Frontend Developer & Digital Designer
* **Framework**: Next.js 16 (App Router), React 19, TypeScript
* **Animations**: GSAP 3 (`ScrollTrigger`, `matchMedia`), Framer Motion 12, Lenis Smooth Scroll
* **Styling**: Vanilla CSS Modules (Scoped CSS) + Global design system in `src/app/globals.css`
* **Icons**: `lucide-react`
* **Assets Location**: High-resolution 3D mockups in `public/mockup/`

---

## 🗂️ 2. Core Directory Structure & Key Files

```
Portfolio Website/
├── public/
│   └── mockup/                          # High-res client mockups (.png, .jfif)
├── src/
│   ├── app/
│   │   ├── globals.css                  # Global tokens, button styles, custom cursor reset
│   │   ├── page.tsx                     # Home page
│   │   ├── about/page.tsx               # Dedicated About Page (/about)
│   │   ├── about/about.module.css
│   │   ├── about/raw-framer.html        # Staging file for pasting inspected Framer HTML
│   │   ├── about/raw-framer.css         # Staging file for pasting inspected Framer CSS
│   │   ├── work/page.tsx                # Works / Portfolio page with AllWorks component (/work)
│   │   ├── work/[slug]/page.tsx         # Dynamic Work Detail Page (sticky sidebar + gallery)
│   │   ├── work/[slug]/workDetail.module.css
│   │   ├── portfolio/page.tsx           # Auto-redirects to /work
│   │   ├── blog/page.tsx                # Blog page
│   │   └── blog/blog.module.css
│   ├── components/
│   │   ├── AllWorks.tsx                 # Portfolio grid, platform/industry filters & load more
│   │   ├── allWorks.module.css
│   │   ├── Portfolio.tsx                # Home page pinned horizontal scroll slider
│   │   ├── portfolio.module.css
│   │   ├── CustomCursor.tsx             # Global custom cursor
│   │   ├── Header.tsx                   # Main navigation header
│   │   └── Footer.tsx                   # Global footer
│   └── data/
│       └── projects.ts                  # Master data source for all portfolio projects
└── MEMORY.md                            # Project Brain & Memory (THIS FILE)
```

---

## 💼 3. Complete Portfolio Projects (Master List)

Currently **12 projects** are configured in `src/data/projects.ts`:

| # | Project Name | Slug | Platform | Tech Stack Highlights | Mockup File (`public/mockup/`) | Live Link |
|---|--------------|------|----------|-----------------------|--------------------------------|-----------|
| 01 | **Flyers Cocktail Co.** | `flyers-cocktail-co` | Shopify | Shopify, Tailwind CSS, Alpine.js, Klaviyo | `Flyers Website.png` | [drinkflyers.com](https://drinkflyers.com/) |
| 02 | **Bite Toothpaste Bits** | `bite-toothpaste-bits` | Shopify | Shopify, React, Preact, Tailwind, Rebuy, Klaviyo | `Bite Toothpaste Bits Website.jfif` | [bitetoothpastebits.com](https://bitetoothpastebits.com/) |
| 03 | **Tokyo Headspa** | `tokyo-headspa` | React.js | Remix, React Router, Radix UI, Lenis, Swiper | `Tokyoheadspa Website.png` | [tokyoheadspa.com.au](https://www.tokyoheadspa.com.au/) |
| 04 | **Heveya®** | `heveya` | Shopify | Shopify, Preact, styled-components, Swiper, Klaviyo | `Heyva Ecommerce Website.jfif` | [heveya.sg](https://www.heveya.sg/) |
| 05 | **Zeuss** | `zeuss` | Custom Website | Astro, Storyblok CMS, Tailwind CSS, Tidio, AWS | `Zeuss - Home (getzeuss.com).jfif` | [getzeuss.com](https://getzeuss.com/) |
| 06 | **IX Art Show** | `ix-art-show` | WordPress | WordPress, WP Engine, Masonry, FancyBox, Swiper | `IX Show Event Website.jfif` | [imaginativerealism.com](https://imaginativerealism.com/) |
| 07 | **Display Studio** | `display-care` | Custom Website | Sanity CMS, Netlify, Lenis, Locomotive, AccessiBe | `Display — A disability oriented design studio.jfif` | [display.care](https://www.display.care/) |
| 08 | **Light House CU** | `lighthouse-cu` | WordPress | WordPress, Hello Elementor, GSAP, JetEngine, Salesforce | `Light House CU - www.lighthousecu.org.jfif` | [lighthousecu.org](https://www.lighthousecu.org/) |
| 09 | **Black Star Pastry** | `black-star-pastry` | Shopify | Shopify, Meta/Pinterest Ads, Cloudflare CDN | `Black Star Pastry - Home of the World's Most Instagrammed Cake.jfif` | [blackstarpastry.com](https://www.blackstarpastry.com/) |
| 10 | **Power Sheds** | `power-sheds` | Shopify | Shopify, GSAP, Sanity CMS, Algolia, Radix UI | `Power Shed Shopify GSAP Animated Website.jfif` | [powersheds.com](https://www.powersheds.com/) |
| 11 | **Hey Spud!** | `hey-spud` | Wix | Wix eCommerce, GSAP, React, Onsen UI, Google Cloud | `Hey Spud Website.jfif` | [heyspud.co.uk](https://heyspud.co.uk/) |
| 12 | **NYC Social Club** | `nyc-social-club` | Wix | Wix, React, Cloudflare CDN | `NYC Influencer Marketing Agency  NYC Social Club.jfif` | [nycsocialclub.com](https://nycsocialclub.com/) |

---

## 🎨 4. Key UX Rules & UI Conventions

### A. Global Button Pattern (`.primary-btn`)
* Defined in `src/app/globals.css`.
* Pill-shaped with animated circle track (`.btnIconCircle`) and arrow track (`.arrowTrack`).
* Hover state smoothly expands circle background across the button and transitions arrow icons.
* **Home Page Buttons**:
  * **"VIEW ALL PROJECTS"** links directly to `/work` (all works grid).
  * Individual card **"VIEW PROJECT"** buttons and mockup images link directly to the inner portfolio project detail page (`/work/${project.slug}`).
* **Work Page Load More Button**:
  * Uses `.primary-btn` styling centered below the grid.
  * Features an **ArrowDown** icon (`.downArrowPrimary`, `.downArrowSecondary`) with smooth vertical translation on hover.
  * Shows initially **6 projects**.
  * On click, shows a spinning reload icon (`RotateCw` / `.spinIcon`) for **0.6 seconds** (600ms) before loading the next 6 items.
  * Automatically hides when all projects are displayed.

### B. Custom Cursor Behavior (`CustomCursor.tsx`)
* Custom cursor stays compact (`DEFAULT_SCALE = 0.292`) and does **not** blow up / expand to huge balls on buttons or input fields.
* Hides (`opacity: 0, scale: 0`) when hovering over portfolio project cards with `data-cursor="none"` so that the card's native interactive **"VIEW"** floating pill takes priority.

### C. Work Detail Page Sticky Sidebar (`/work/[slug]`)
* Left sidebar containing Date, Description, Info Metadata, and Live Website link uses `position: sticky; top: 120px;`.
* **Critical Requirement**: Neither `html`, `body`, nor any ancestor wrapper (`.pageContainer`) can have `overflow-x: hidden`, as it breaks native CSS sticky positioning. Page sets class `portfolio-detail-page` on mount and removes it on unmount.

---

## 📝 5. Changelog & Recent Updates History

### [2026-09-23]
* **Dedicated `/about` Page Scaffold & Framer Conversion (Chunks 1, 2 & 3)**:
  * **Chunk 1 (`AboutHero.tsx`)**: Created `src/components/AboutHero.tsx` and `src/components/aboutHero.module.css` matching Palmer Framer template (`https://palmer-template.framer.website`). Includes editorial staggered headline with Japanese accent, interactive 3D physics tilt video card with Vimeo reel, horizontal white category bar, and mega brand title (`Akihiko™`).
  * **Chunk 2 (`AboutBio.tsx`)**: Created independent standalone duplicate component `src/components/AboutBio.tsx` and `src/components/aboutBio.module.css` for the `/about` page based on the home page's `contentGrid`. Completely decoupled from the home page `About.tsx` and `about.module.css` so changes on `/about` do not impact the home page. Includes top `metaBar`, portrait laptop mockup, headline with "13+ years of digital form...", "VIEW MORE" primary button, white status bar (with exact home page dimensions & margins), and tech stack logo marquee with 1:1 matching continuous loop animations.
  * **Chunk 3 (`AboutFeaturedWorks.tsx`)**: Created standalone component `src/components/AboutFeaturedWorks.tsx` and `src/components/aboutFeaturedWorks.module.css` for the `/about` page based on the Palmer template's Work section:
    * Replaced `framer-tjjepc-container` with clean modern meta bar: Left (`© Featured Projects プロジェクト`, `(WDX® — 03)`), Right (`Creative Development`).
    * Big white continuous marquee header banner scrolling `"Featured Works© "`.
    * Body description text with highlighted white bold phrasing + global `.primary-btn` `"SEE WORKS"` linking to `/work`.
    * High-end GSAP horizontal slider with `slidesToShow: 2` on desktop: scrolling through the section pins and slides cards so 2 are shown at once and scrolling reveals the next pairs.
    * Work cards replicate the exact `/work` (`AllWorks.tsx`) card experience: double-layer mockup scaling, hover tag banner, smooth spring cursor-following `"VIEW"` pill, and rolling text title/counter (`(01)`, `(02)`).
  * Rendered `<AboutHero />`, `<AboutBio />`, and `<AboutFeaturedWorks />` sequentially in `src/app/about/page.tsx`.
  * Created staging files `src/app/about/raw-framer.html` and `src/app/about/raw-framer.css` for chunk-by-chunk pasting.
  * Updated `Header.tsx` to handle direct navigation and active state for the "About" link (`/about`).

### [2026-09-22]
* **Contact Section Spacing & Sizing Refinements**: Kept section max-width (1480px) and side padding (1.5rem); set balanced column gap (80px); aligned right-column list item typography and padding to `.9rem` (exact match with `/work` portfolio banner); converted "AVAILABLE FOR NEW PROJECTS" into a clean, modern editorial text without pill box or dot icon.
* **Linked GET IN TOUCH Buttons to `/contact`**: Updated the "GET IN TOUCH" buttons in both `Contact.tsx` and `Reviews.tsx` to navigate directly to the dedicated `/contact` page via Next.js `Link`.
* **Home Page Contact Section Cardless Editorial Redesign**: Completely removed the heavy boxed card container (`#0c0c0c` border box) and sub-card grid. Replaced with an ultra-clean, cardless editorial layout directly on pure black `#000` with the `/work` portfolio banner text-roll interaction, smooth expanding underline fillers, and an integrated minimalist status strip with inline social links.
* **Home Page Expertise Accordion Images Updated**: Replaced placeholder mockup images inside the 4 accordion services with the newly added high-resolution images from `public/`:
  * *CMS, E-Commerce & CRM Architecture*: `/CMS, E-Commerce & CRM Architecture.jpg` (1, 2, 3)
  * *Creative Frontend & Interactive UI*: `/Creative Frontend & Interactive UI.jpg` (1, 2, 3)
  * *Advanced AI Engineering & RAG Architecture*: `/Advanced AI Engineering & RAG Architecture.jpg` (1, 2, 3)
  * *Autonomous AI Agents & Voice Systems*: `/Autonomous AI Agents & Voice Systems.jpg` (1, 2, 3)
* **Changed Route Slug from `/portfolio` to `/work`**:
  * Created `src/app/work/page.tsx` for the main portfolio overview route `/work`.
  * Set `src/app/portfolio/page.tsx` to automatically redirect to `/work`.
  * Updated navigation in `Header.tsx` ("Work / Portfolio" tab) and `Footer.tsx` to route to `/work`.
  * Updated **"VIEW ALL PROJECTS"** button in `Portfolio.tsx` and `PortfolioV2.tsx` to link to `/work`.
* **Home Page Card Inner Portfolio Links**: Updated individual card **"VIEW PROJECT"** buttons and card images in `Portfolio.tsx` to link directly to their respective inner portfolio work detail pages (`/work/[slug]`, e.g. `/work/flyers-cocktail-co`, `/work/bite-toothpaste-bits`, `/work/tokyo-headspa`).
* **Added `MEMORY.md`**: Created project brain and context repository.
* **Portfolio Load More & Pagination**:
  * Added 6-project initial limit to `/portfolio` grid.
  * Built Load More button with global `.primary-btn` styling and `ArrowDown` icon.
  * Added 0.6s (600ms) reload icon spin state on click before revealing the next 6 items.
  * Automatically hides when all projects are displayed.

### [2026-09-21]
* **Replaced Old Demo Projects with Real Client Portfolio**:
  * Removed old placeholders (`sonder-goods`, `halo-wear`, `lucent-lab`, `arc-bloom`, `atelier-nara`).
  * Added 12 real production client projects with real mockups, live URLs, and tech stack tags.
  * Integrated all 12 projects with matching Platform filters (`Shopify`, `WordPress`, `Wix`, `React.js`, `Custom Website`) and Industry filters (`Ecommerce`, `Tech/SaaS`, `Agency`).

---

## 🔮 6. How to Add New Content in the Future

### When Adding a New Project:
1. Put the mockup image in `public/mockup/<MockupName>.<ext>`.
2. Open `src/data/projects.ts` and add an object at the end:
   ```ts
   {
       id: "13", // next incremental ID
       title: "Project Name",
       slug: "project-slug",
       tag: "Platform / Category",
       platform: "Shopify" | "WordPress" | "Wix" | "React.js" | "Custom Website",
       industry: "Ecommerce" | "Tech/SaaS" | "Agency",
       bgImage: "/mockup/YourImage.png",
       innerImage: "/mockup/YourImage.png",
       date: "Month Year",
       description: "Detailed description...",
       client: "Client Name",
       duration: "X - Y Weeks",
       location: "City, Country",
       link: "https://livewebsite.com/",
       gallery: ["/mockup/YourImage.png"]
   }
   ```
3. Update this `MEMORY.md` file's Project Table and Changelog section.
