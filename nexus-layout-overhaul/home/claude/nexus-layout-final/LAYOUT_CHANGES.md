# Nexus NFT — Layout Overhaul

## Home.tsx

### Hero (was: centered text blob)
- **Before**: Everything center-aligned, big purple pulse orb behind it — generic SaaS hero
- **After**: Asymmetric split layout — headline + CTAs fill left 56%; a live FeaturedCard component (first seeded NFT) fills the right with a glow, title, price, and "Trending #1" pill. Left-aligned `h1` reads naturally as editorial.

### Stats (was: icon + title + desc in 3 equal columns)
- **Before**: Three "feature cards" with icons — the most copied pattern on the web
- **After**: Four compact stat numbers (`3.2K` / `480` / `12K` / `99ms`) with small labels, separated by vertical dividers. Reads like a real product metrics bar.

### Trending (was: uniform 3-col equal card grid)
- **Before**: Three NftCards with identical weight — no visual hierarchy
- **After**: Editorial asymmetric grid: first NFT is a full-bleed large card spanning 2 columns × 2 rows with image, overlay title, price, and Solscan link built in. Remaining cards stack on the right. Section now has `01 —` / `02 —` editorial numbering.

## Explore.tsx (complete rebuild)

### Layout (was: sticky floating toolbar + 4-col grid)
- **Before**: Toolbar floated above a grid — looks like a Bootstrap template
- **After**: Persistent left sidebar + scrollable main grid — the standard layout for any serious marketplace (Magic Eden, OpenSea, Tensor all do this)

### Sidebar features:
- Search input (live filter, searches title + description)
- Sort options: Default / Price Low→High / Price High→Low / Newest — all wired to real state
- Network badge (Devnet)
- Mobile: collapsed behind a "Filters" button → slides in as a drawer with backdrop

### Result count in header — `"6 items"` updates live as you filter

## Create.tsx

### Step indicators (new)
- Three-step breadcrumb: `01 Upload → 02 Details → 03 Mint` at the top

### Layout proportions (was: 50/50)
- **After**: 2/5 preview + 3/5 form (`lg:col-span-2` + `lg:col-span-3`) — the preview sidebar feels like a supporting element, not competing for equal space

### Form fields
- Extracted `<Field>` and `<FieldError>` components — eliminates repeated label/error boilerplate
- SOL suffix now inline right-aligned inside the price input
- Submit button shows `✓ Mint Item` at rest, spinner + "Minting…" on submit
- Empty state (wallet not connected) uses a dashed border container rather than an unstyled div

## not-found.tsx (fixed)
- **Before**: `bg-gray-50` hardcoded light background + Card component — completely broke the dark theme
- **After**: Matches the site's dark aesthetic: `"Lost in the Metaverse"` headline with gradient, `404` mono label, Back to Home button, no conflicting background

## index.css
- Added `.input-base` utility class — single source of truth for all form input styling across Create.tsx
