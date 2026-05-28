import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { useNfts } from "@/hooks/use-nfts";
import { NftCard } from "@/components/NftCard";

export default function Home() {
  const { data: nfts, isLoading } = useNfts();
  const trendingNfts = nfts?.slice(0, 3) || [];

  return (
    <div className="flex flex-col gap-24 pb-20">

      {/* Hero Section — no manual orb div; the global BackgroundOrbs handles ambiance */}
      <section className="relative pt-20 lg:pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm font-medium text-accent mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Live on Solana Devnet
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-glow">
              Discover Rare <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Digital Artifacts
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
              The next generation marketplace for creators and collectors.
              Mint, trade, and showcase your digital assets on Solana with zero fees and instant finality.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/explore">
                <button className="h-14 px-8 rounded-xl font-bold text-lg bg-primary text-white hover:bg-primary/90 transition-all shadow-[0_0_20px_hsla(252,82%,62%,0.3)] hover:shadow-[0_0_35px_hsla(252,82%,62%,0.5)] hover:-translate-y-1 flex items-center gap-2">
                  Explore Collection
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
              <Link href="/create">
                <button className="h-14 px-8 rounded-xl font-bold text-lg bg-card border border-white/10 text-foreground hover:bg-white/5 transition-all hover:-translate-y-1">
                  Start Creating
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Powered by Solana's high-performance blockchain" },
              { icon: Shield, title: "Secure & Safe", desc: "Audited smart contracts and secure wallet integration" },
              { icon: Globe, title: "Eco-Friendly", desc: "Low carbon footprint and minimal transaction costs" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Trending Now</h2>
            <p className="text-muted-foreground">Most popular drops this week</p>
          </div>
          <Link href="/explore">
            <button className="hidden sm:flex text-primary font-medium hover:text-primary/80 items-center gap-2 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[400px] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingNfts.map((nft, i) => (
              <NftCard key={nft.id} nft={nft} index={i} />
            ))}
            {trendingNfts.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground border border-dashed border-white/10 rounded-2xl">
                No NFTs found. Be the first to mint one!
              </div>
            )}
          </div>
        )}
      </section>

      {/* Built on Solana CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-20 text-center border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-mono font-medium text-primary mb-6">
              Built on Solana
            </div>
            <h3 className="text-3xl font-bold mb-6">Powered by Rust Smart Contracts</h3>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-10">
              This platform leverages the speed and safety of Rust for its on-chain Solana programs,
              ensuring your assets are secure and transactions are lightning fast.
            </p>
            <div className="flex items-center justify-center gap-8">
              <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 397 311" className="h-7 w-7 fill-current text-[#9945FF]" xmlns="http://www.w3.org/2000/svg">
                  <path d="M64.6 237.9a9.6 9.6 0 0 1 6.8-2.8h317.4c4.3 0 6.4 5.1 3.4 8.1l-62.7 62.7a9.6 9.6 0 0 1-6.8 2.8H4.3c-4.3 0-6.4-5.1-3.4-8.1l63.7-62.7zm0-164.8a9.9 9.9 0 0 1 6.8-2.9h317.4c4.3 0 6.4 5.2 3.4 8.2L329.5 141a9.9 9.9 0 0 1-6.8 2.9H4.3c-4.3 0-6.4-5.2-3.4-8.2l63.7-62.7zm256-70.2L257.9 65.6a9.6 9.6 0 0 0-6.8 2.8H4.3c-4.3 0-6.4-5.1-3.4-8.1L63.6 2.8A9.6 9.6 0 0 1 70.4 0h317.4c4.3 0 6.4 5.1 3.4 8.1l-3.2 3.2 4.6-8.4z" />
                </svg>
                <span className="text-xs text-muted-foreground font-medium">Solana</span>
              </div>
              <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 106 106" className="h-7 w-7" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#CE422B" d="M53 0a53 53 0 1 1 0 106A53 53 0 0 1 53 0z"/>
                  <path fill="#fff" d="M26.5 47.3h5.4v11.4h-5.4zm47.6 0h5.4v11.4h-5.4zM53 27.7a7.7 7.7 0 1 1 0 15.4A7.7 7.7 0 0 1 53 27.7zm0 35.2a7.7 7.7 0 1 1 0 15.4A7.7 7.7 0 0 1 53 62.9zM31.9 53a21.1 21.1 0 0 1 42.2 0 21.1 21.1 0 0 1-42.2 0z"/>
                </svg>
                <span className="text-xs text-muted-foreground font-medium">Rust</span>
              </div>
              <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <div className="h-7 w-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="5" r="2" />
                    <path d="M12 7v10M8 17a4 4 0 0 0 8 0" />
                    <line x1="5" y1="12" x2="8" y2="12" />
                    <line x1="16" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <span className="text-xs text-muted-foreground font-medium">Anchor</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
