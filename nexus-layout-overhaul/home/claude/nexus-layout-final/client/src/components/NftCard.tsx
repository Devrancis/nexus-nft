import { motion } from "framer-motion";
import type { Nft } from "@shared/schema";
import { ExternalLink, Tag, ArrowUpRight } from "lucide-react";

interface NftCardProps {
  nft: Nft;
  index: number;
  featured?: boolean;
}

export function NftCard({ nft, index, featured = false }: NftCardProps) {
  const rank = String(index + 1).padStart(2, "0");

  if (featured) {
    // Horizontal layout for the first/featured card
    return (
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group col-span-full lg:col-span-2 relative overflow-hidden rounded-2xl border border-white/[0.07] bg-card hover:border-white/[0.14] transition-all duration-500"
      >
        <div className="flex flex-col sm:flex-row h-full min-h-[280px]">
          {/* Image */}
          <div className="relative sm:w-[55%] overflow-hidden">
            <img
              src={nft.imageUrl}
              alt={nft.title}
              className="h-60 sm:h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* rank badge */}
            <div className="absolute top-4 left-4 font-mono text-xs font-bold text-white/40 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md">
              #{rank}
            </div>
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/15 border border-green-500/25 px-2.5 py-1 text-green-400 text-xs font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                Devnet
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between p-6 sm:w-[45%]">
            <div>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-3">Featured Drop</p>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {nft.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {nft.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Current Price</p>
                <div className="flex items-center gap-1.5 text-primary">
                  <Tag className="h-3.5 w-3.5" />
                  <span className="font-mono font-bold text-lg">{nft.priceSol} SOL</span>
                </div>
              </div>
              <a
                href={`https://solscan.io/token/${nft.id}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 h-10 px-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors"
              >
                View <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Standard portrait card
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-card hover:border-white/[0.14] transition-all duration-500 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={nft.imageUrl}
          alt={nft.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Rank */}
        <div className="absolute top-3 left-3 font-mono text-xs font-bold text-white/50 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md leading-none">
          #{rank}
        </div>
        {/* Hover CTA overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <a
            href={`https://solscan.io/token/${nft.id}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 h-9 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
          >
            View on Solscan <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Creator row — placeholder avatar */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-primary/60 to-accent/60 shrink-0" />
          <span className="text-xs text-muted-foreground font-mono truncate">
            {nft.ownerAddress ? `${nft.ownerAddress.slice(0, 6)}…${nft.ownerAddress.slice(-4)}` : "Unknown"}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {nft.title}
        </h3>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Price</p>
            <div className="flex items-center gap-1 text-primary">
              <Tag className="h-3 w-3" />
              <span className="font-mono font-bold text-sm">{nft.priceSol} SOL</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 border border-green-500/20 px-2 py-0.5 text-green-400 text-[10px]">
            <span className="h-1 w-1 rounded-full bg-green-400" />
            Devnet
          </span>
        </div>
      </div>
    </motion.article>
  );
}
