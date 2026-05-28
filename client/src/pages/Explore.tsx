import { useState, useMemo } from "react";
import { useNfts } from "@/hooks/use-nfts";
import { NftCard } from "@/components/NftCard";
import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SortKey = "default" | "price-asc" | "price-desc" | "newest";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default",    label: "Default"           },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "newest",     label: "Newest First"       },
];

export default function Explore() {
  const { data: nfts, isLoading, error } = useNfts();
  const [search, setSearch]           = useState("");
  const [sort, setSort]               = useState<SortKey>("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!nfts) return [];
    let list = nfts.filter(n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "price-asc")  list = [...list].sort((a, b) => Number(a.priceSol) - Number(b.priceSol));
    if (sort === "price-desc") list = [...list].sort((a, b) => Number(b.priceSol) - Number(a.priceSol));
    if (sort === "newest")     list = [...list].reverse();
    return list;
  }, [nfts, search, sort]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="p-6 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 inline-block">
          Error loading collection. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ── Page header ────────────────────────────────────────────────────── */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8 py-10">
          <div className="flex items-end justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase pt-1.5">03</span>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold">Explore</h1>
                <p className="text-muted-foreground mt-1">
                  {isLoading
                    ? "Loading..."
                    : `${filtered.length} item${filtered.length !== 1 ? "s" : ""}`}
                </p>
              </div>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className="lg:hidden flex items-center gap-2 h-10 px-4 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* ── Body: sidebar + grid ───────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="flex gap-8 lg:gap-10">

          {/* Sidebar — desktop always visible, mobile drawer */}
          <AnimatePresence>
            {(sidebarOpen || true) && (
              <motion.aside
                key="sidebar"
                initial={false}
                className="hidden lg:block w-56 xl:w-64 shrink-0"
              >
                <SidebarContent
                  search={search}
                  setSearch={setSearch}
                  sort={sort}
                  setSort={setSort}
                  onClose={() => setSidebarOpen(false)}
                />
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Mobile sidebar overlay */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                />
                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="lg:hidden fixed left-0 top-0 h-full w-72 z-50 bg-card border-r border-white/5 p-6 overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold">Filters</h2>
                    <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <SidebarContent
                    search={search}
                    setSearch={setSearch}
                    sort={sort}
                    setSort={setSort}
                    onClose={() => setSidebarOpen(false)}
                  />
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Main grid */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, n) => (
                  <div key={n} className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse border border-white/5" />
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((nft, i) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <NftCard nft={nft} index={i} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-32 flex flex-col items-center text-center gap-4">
                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
                  <Search className="h-7 w-7 text-muted-foreground/40" />
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">No results</p>
                  <p className="text-muted-foreground text-sm">Try a different search or clear filters.</p>
                </div>
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar content (shared between desktop + mobile) ────────────────────────
function SidebarContent({
  search, setSearch, sort, setSort, onClose,
}: {
  search: string;
  setSearch: (v: string) => void;
  sort: SortKey;
  setSort: (v: SortKey) => void;
  onClose: () => void;
}) {
  return (
    <div className="space-y-7">
      {/* Search */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Search</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Name or description…"
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-background border border-white/10 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5" />

      {/* Sort */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Sort By</p>
        <div className="flex flex-col gap-1">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => { setSort(opt.value); onClose(); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                sort === opt.value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5" />

      {/* Network */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Network</p>
        <button className="w-full text-left px-3 py-2.5 rounded-lg text-sm bg-primary/10 text-primary font-medium">
          Solana Devnet
        </button>
      </div>
    </div>
  );
}
