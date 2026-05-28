import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { useNfts } from "@/hooks/use-nfts";
import { NftCard } from "@/components/NftCard";
import type { Nft } from "@shared/schema";

// ─── Featured Hero Card ───────────────────────────────────────────────────────
function FeaturedCard({ nft }: { nft: Nft }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative w-full max-w-sm"
    >
      <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl -z-10" />
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-card shadow-2xl">
        <div className="aspect-square overflow-hidden">
          <img src={nft.imageUrl} alt={nft.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Featured Drop</p>
              <h3 className="font-display font-bold text-lg leading-tight truncate">{nft.title}</h3>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-muted-foreground mb-1">Price</p>
              <p className="font-mono font-bold text-primary">{nft.priceSol} SOL</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-full bg-card border border-white/10 px-3 py-2 shadow-xl backdrop-blur-md">
        <TrendingUp className="h-3.5 w-3.5 text-secondary" />
        <span className="text-xs font-semibold text-secondary">Trending #1</span>
      </div>
    </motion.div>
  );
}

const STATS = [
  { value: "3.2K", label: "Items minted" },
  { value: "480",  label: "Active creators" },
  { value: "12K",  label: "SOL volume" },
  { value: "99ms", label: "Avg. settlement" },
];

export default function Home() {
  const { data: nfts, isLoading } = useNfts();
  const [featured, ...rest] = nfts || [];
  const sideCards = rest.slice(0, 2);

  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 lg:px-8 pt-16 lg:pt-28 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">

          {/* Left: Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 lg:max-w-[56%]"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase">01</span>
              <span className="h-px w-8 bg-muted-foreground/40" />
              <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Live on Solana Devnet
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight mb-8">
              Discover<br />
              Rare Digital<br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Artifacts
              </span>
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl">
              The next-generation marketplace for creators and collectors.
              Mint, trade, and showcase digital assets on Solana — zero fees, instant finality.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/explore">
                <button className="group h-13 px-7 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 transition-all shadow-[0_0_20px_hsla(252,82%,62%,0.3)] hover:shadow-[0_0_35px_hsla(252,82%,62%,0.5)] hover:-translate-y-0.5 flex items-center gap-2.5">
                  Explore Collection
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <Link href="/create">
                <button className="h-13 px-7 rounded-xl font-bold border border-white/10 text-foreground hover:bg-white/5 hover:-translate-y-0.5 transition-all">
                  Start Creating
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Featured NFT */}
          <div className="flex-1 flex justify-center lg:justify-end">
            {isLoading ? (
              <div className="w-full max-w-sm aspect-[4/5] rounded-2xl bg-white/5 animate-pulse" />
            ) : featured ? (
              <FeaturedCard nft={featured} />
            ) : (
              <div className="w-full max-w-sm aspect-square rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-muted-foreground/40 text-sm">
                No NFTs yet — mint the first!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────────────── */}
      <section className="border-y border-white/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="py-8 px-6 lg:px-10"
              >
                <p className="font-display text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending ─────────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div className="flex items-start gap-4">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase pt-1.5">02</span>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold">Trending Now</h2>
              <p className="text-muted-foreground mt-1">Most popular drops this week</p>
            </div>
          </div>
          <Link href="/explore">
            <button className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors">
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 h-[360px] md:h-[560px] rounded-2xl bg-white/5 animate-pulse" />
            <div className="flex flex-col gap-5">
              <div className="flex-1 min-h-[160px] rounded-2xl bg-white/5 animate-pulse" />
              <div className="flex-1 min-h-[160px] rounded-2xl bg-white/5 animate-pulse" />
            </div>
          </div>
        ) : nfts && nfts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:grid-rows-2">
            {/* Featured — large, spans 2 rows and 2 cols */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-2 md:row-span-2"
              >
                <div className="group relative h-full min-h-[360px] md:min-h-[560px] rounded-2xl overflow-hidden border border-white/8 cursor-pointer">
                  <img
                    src={featured.imageUrl}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 text-xs font-medium">
                    <TrendingUp className="h-3 w-3 text-secondary" />
                    <span className="text-secondary">Top Pick</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs text-white/50 uppercase tracking-widest mb-2">Featured</p>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">{featured.title}</h3>
                    <p className="text-white/60 text-sm line-clamp-2 mb-5">{featured.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-white/40 mb-0.5">Current Price</p>
                        <p className="font-mono text-xl font-bold text-primary">{featured.priceSol} SOL</p>
                      </div>
                      <a
                        href={`https://solscan.io/token/${featured.id}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                      >
                        View on Solscan <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Side cards */}
            {sideCards.map((nft, i) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <NftCard nft={nft} index={i} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-muted-foreground border border-dashed border-white/10 rounded-2xl">
            No NFTs yet — be the first to mint one.
          </div>
        )}
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 lg:px-8 pb-24">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 px-10 py-16 md:px-20 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Built on Solana</p>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">Powered by Rust Smart Contracts</h3>
              <p className="text-muted-foreground max-w-lg">
                On-chain programs written in Rust via Anchor — fast, safe, and auditable.
                Your assets are always on-chain, never custodial.
              </p>
            </div>
            <div className="flex items-center gap-8 shrink-0">
              {[
                { label: "Solana", el: <svg viewBox="0 0 397 311" className="h-7 w-7" style={{fill:"#9945FF"}} xmlns="http://www.w3.org/2000/svg"><path d="M64.6 237.9a9.6 9.6 0 0 1 6.8-2.8h317.4c4.3 0 6.4 5.1 3.4 8.1l-62.7 62.7a9.6 9.6 0 0 1-6.8 2.8H4.3c-4.3 0-6.4-5.1-3.4-8.1l63.7-62.7zm0-164.8a9.9 9.9 0 0 1 6.8-2.9h317.4c4.3 0 6.4 5.2 3.4 8.2L329.5 141a9.9 9.9 0 0 1-6.8 2.9H4.3c-4.3 0-6.4-5.2-3.4-8.2l63.7-62.7zm256-70.2L257.9 65.6a9.6 9.6 0 0 0-6.8 2.8H4.3c-4.3 0-6.4-5.1-3.4-8.1L63.6 2.8A9.6 9.6 0 0 1 70.4 0h317.4c4.3 0 6.4 5.1 3.4 8.1l-3.2 3.2 4.6-8.4z"/></svg> },
                { label: "Rust",   el: <svg viewBox="0 0 106 106" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg"><path fill="#CE422B" d="M53 0a53 53 0 1 1 0 106A53 53 0 0 1 53 0z"/><path fill="#fff" d="M26.5 47.3h5.4v11.4h-5.4zm47.6 0h5.4v11.4h-5.4zM53 27.7a7.7 7.7 0 1 1 0 15.4A7.7 7.7 0 0 1 53 27.7zm0 35.2a7.7 7.7 0 1 1 0 15.4A7.7 7.7 0 0 1 53 62.9zM31.9 53a21.1 21.1 0 0 1 42.2 0 21.1 21.1 0 0 1-42.2 0z"/></svg> },
                { label: "Anchor", el: <div className="h-7 w-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center"><svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="2"/><path d="M12 7v10M8 17a4 4 0 0 0 8 0"/><line x1="5" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="19" y2="12"/></svg></div> },
              ].map(({ label, el }) => (
                <div key={label} className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                  {el}
                  <span className="text-xs text-muted-foreground font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
