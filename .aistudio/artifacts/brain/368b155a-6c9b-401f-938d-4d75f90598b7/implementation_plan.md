# Cricket Adda E-Commerce Storefront (Handcrafted Cricket Bats)

A high-fidelity, pixel-accurate replica of the flagship cricket bats collection storefront branded for **Cricket Adda**. The application features an authentic catalog of handcrafted English and Kashmir willow cricket bats, live multi-attribute filtering (size, willow type, series range, dual price range slider, sort order), interactive quick-view modal with willow grain counts and bat specs, slide-over cart drawer with itemized pricing and free delivery tracker, an interactive bat finder advisor quiz, a dedicated WhatsApp consultation widget wired to `+91 92176 79479`, and the comprehensive cricket bat buying guide.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following revisions and preferences have been incorporated into this plan:

- **Confirmed Brand Name**: **Cricket Adda** — prominent in the top navigation wordmark with sporty wing-blade crest, page titles, metadata, brand copy, and footer.
- **Confirmed WhatsApp Number**: `+91 92176 79479` (`92176 79479`) — integrated into the floating WhatsApp widget, top utility bar "WhatsApp Helpline", quick consultation modal, and direct `https://wa.me/919217679479` link.
- **Confirmed Shopping Interactivity**: Full interactive cart drawer with real-time reactive filters, size pickers, and interactive quick view modals.
- **Confirmed Bat Specifications**: Quick View modal displaying authentic craftsmanship data (grain count, edge profile 38-42mm, sweet spot, willow grade, weight range, and optional knocking-in add-on).
- **Confirmed Extra Features**:
  1. *Bat Finder Advisor*: Multi-step interactive tool guiding players to their ideal willow based on experience level and ball type.
  2. *Interactive WhatsApp Consultation Widget*: Direct chat popup and quick-message launcher linked to `+91 92176 79479`.
- **Design Token Compliance**: DSC-inspired color hierarchy: primary brand orange (`#f15b28`), accent amber (`#f59e0b`), Raleway typography, and dark charcoal footer (`#24201e`).

---

### 1. Overview & Core Concept

- **What It Does**: Serves as the premier digital storefront for **Cricket Adda**, India's trusted cricket gear destination. Players can explore authentic cricket bats across English Willow, Kashmir Willow, and Tennis ranges. Users can filter by handle size (1-6, Harrow, Mens, Compact), willow type, bat collection range (BLAK, INTENSE, CONDOR, WILDFIRE, etc.), and price. Customers can open detailed quick views, inspect willow grains, add bats with customized sizes to a live slide-out shopping cart, consult the interactive bat advisor, and chat directly on WhatsApp with Cricket Adda bat experts at `+91 92176 79479`.
- **Target Audience**: Cricketers of all levels—from budding junior club players seeking durable Kashmir willow to competitive club and professional athletes seeking Grade 1+ English willow player editions.
- **Key Value**: Delivers the exact look, feel, visual weight, and authentic merchandising layout of the flagship reference store customized for Cricket Adda with modern responsive reactivity and active consultation channels.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Catalog Browsing & Discovery**:
   - Customer arrives at the page greeted by the orange top utility bar (with helpline `+91 92176 79479`, About Us, Contact Us, Locate Dealership, INR selector), clean white navigation header with **Cricket Adda** branding, and high-impact hero banner with angled cricket bats.
   - The left sidebar offers intuitive filter accordions (Size, Willow Type, Range, Price Slider) and sort options.
   - Product grid updates instantly as filters are applied, showing active item counts and status tags.
2. **Product Inspection via Quick View**:
   - Hovering over any bat reveals a "Quick View" action.
   - Clicking opens a rich modal with zoomable bat imagery, grain count, edge thickness (38-42mm), blade curve, size selector, knocking-in service checkbox (+₹799), and immediate "Add to Cart" button.
3. **Cart Slide-Over & Checkout Preparation**:
   - Adding a bat opens the slide-over cart drawer displaying the items, selected size, knocking-in status, quantity steppers, free shipping progress bar, subtotal in INR (₹), and simulated checkout flow.
4. **Bat Finder Advisor**:
   - An accessible banner or floating advisor prompt helps players find the right bat in 3 quick questions (Ball Type, Player Level, Shot Preference) and filters the catalog directly.
5. **WhatsApp Consultation (`+91 92176 79479`)**:
   - Floating WhatsApp badge opens an interactive chat popup pre-populated with Cricket Adda Bat Specialists to ask questions regarding bat weight, grain count, or custom knocking, with a direct click-to-chat button targeting `wa.me/919217679479`.

#### Visual Identity & Theme
- **Brand Identity**: **Cricket Adda** with bold athletic typography and clean blade icon.
- **Primary Color**: `#f15b28` (Signature Athletic Orange) for primary CTAs, active pagination, discount badges, and accent highlights.
- **Secondary / Accent**: `#f59e0b` (Amber gold) and `#c93c0d` (Deep terracotta hover).
- **Neutrals**: `#f8f7f7` (light canvas), `#dfdad8` (borders), `#37312f` and `#24201e` (footer, primary typography).
- **Hero Banner**: Deep emerald/cyan dark gradient (`#063333` to `#004851`) with high-resolution imagery and white Raleway headline.
- **Typography**: `Raleway` across all headers, buttons, and body prose, paired with tabular numerals for prices (`font-mono tabular-nums`).
- **Card Aesthetics**: Clean white cards with subtle border (`border-neutral-200`), wishlist heart button, "New" orange tag on bottom right of image, and structured pricing with strikethrough MRP.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Brand Adaptation to Cricket Adda**:
  - *Chosen Approach*: Unify all branding elements, navigation logo, copyright, about section, and buying guide under "Cricket Adda" while maintaining the handcrafted craftsmanship legacy.
  - *Why*: Perfectly fulfills the user's specific brand requirement while retaining 100% of the visual styling and catalog depth shown in the screenshots.
- **Decision 2: Seamless WhatsApp Helpline Integration**:
  - *Chosen Approach*: Highlight `+91 92176 79479` in both the top utility bar and the floating consultation widget, supporting pre-filled product inquiries (e.g. "Hi Cricket Adda, I want to inquire about the RS 080 English Willow Bat").
  - *Why*: Maximizes conversion and trust for Indian cricket equipment buyers who rely heavily on direct WhatsApp consultations for bat weights and knocking inquiries.
- **Decision 3: Complete Editorial Content Representation**:
  - *Chosen Approach*: Fully implement the comprehensive cricket bat buying guide, handle type comparison, sweet spot explanation, and FAQs tailored to Cricket Adda.
  - *Why*: Faithfully recreates the authentic brand footprint, search optimization, and educational value of the real e-commerce page.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

#### System Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Cricket Adda App Container                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ TopUtilityBar (WhatsApp: 92176 79479, About, Contact, INR)       │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ MainNavbar (Cricket Adda Logo, Bats, Gear, Shoes, Search, Cart)  │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ HeroBanner (Breadcrumbs, Title "Cricket Bats", Bat Trio Visual)  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────┐  │
│  │       FilterSidebar         │  │         CatalogGrid             │  │
│  │ - Size Selector Grid        │  │ - Header (Item Count, Sort)     │  │
│  │ - Willow Type Checkboxes    │  │ - 3-Column Bat Cards            │  │
│  │ - Range Filter Checkboxes   │  │   - Wishlist Toggle             │  │
│  │ - Dual Price Range Slider   │  │   - "New" Badge                 │  │
│  │ - Sort Order Radios         │  │   - Pricing (MRP, 5% Off, Net)  │  │
│  │                             │  │   - Quick View Trigger          │  │
│  │                             │  │ - Pagination Controls (1-5, >)  │  │
│  └──────────────┬──────────────┘  └────────────────┬────────────────┘  │
│                 │                                  │                   │
│                 └───────────────┬──────────────────┘                   │
│                                 ▼                                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Store State Manager (Filters, Cart, Wishlist, Active Modals)     │  │
│  └───────┬───────────────────────────────┬───────────────────┬──────┘  │
│          ▼                               ▼                   ▼         │
│  ┌──────────────────┐          ┌───────────────────┐ ┌───────────────┐ │
│  │ QuickViewModal   │          │ CartDrawer        │ │ BatFinderModal│ │
│  │ - Specs & Grains │          │ - Item list & Qty │ │ - Step Quiz   │ │
│  │ - Knock-in addon │          │ - Subtotal & Free │ │ - Tailored    │ │
│  │ - Add to Cart    │          │   Delivery Meter  │ │   Matches     │ │
│  │ - Ask on WhatsApp│          │ - Checkout flow   │ └───────────────┘ │
│  └──────────────────┘          └───────────────────┘                   │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ EditorialSection (Guide, Bat Types, Sweet Spot, Specs & FAQs)    │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ SiteFooter (Cricket Adda Story, Socials, 4 Link Columns, Pay)    │  │
│  ├──────────────────────────────────────────────────────────────────┤  │
│  │ Floating WhatsApp Widget (Direct wa.me/919217679479 Chat Popup)  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

#### Core Data Structures
```typescript
interface CricketBat {
  id: string;
  name: string;
  series: string; // "RS", "Thumpa", "BLAK", "Wildfire", "Player Edition"
  willowType: 'English Willow' | 'Kashmir Willow' | 'Incredible Willow';
  range: 'INTENSE' | 'CONDOR' | 'SPLIIT' | 'XLITE' | 'BLAK' | 'BLU' | 'WILDFIRE' | 'ROAR' | 'CYNOS';
  mrp: number;
  discountPercent: number;
  finalPrice: number;
  sizes: ('1' | '2' | '3' | '4' | '5' | '6' | 'Harrow' | 'Mens' | 'Compact')[];
  grainCount: string; // e.g. "8-11 Straight Grains"
  edgeThickness: string; // e.g. "39-40 mm"
  weightRange: string; // e.g. "1160 - 1200 grams"
  sweetSpot: string; // e.g. "Mid to Low"
  handleType: string; // e.g. "Round 12-piece Treble Cane"
  isNew?: boolean;
  isCompare?: boolean;
  imageAccentColor: string;
}
```
