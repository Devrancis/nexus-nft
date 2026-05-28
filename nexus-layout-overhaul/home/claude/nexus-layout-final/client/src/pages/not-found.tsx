import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase mb-6">404</p>
      <h1 className="font-display text-5xl md:text-7xl font-bold mb-4">
        Lost in<br />
        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          the Metaverse
        </span>
      </h1>
      <p className="text-muted-foreground text-lg mb-10 max-w-sm">
        This page doesn't exist — or hasn't been minted yet.
      </p>
      <Link href="/">
        <button className="flex items-center gap-2 h-11 px-6 rounded-xl font-semibold bg-primary text-white hover:bg-primary/90 transition-all hover:-translate-y-0.5">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
      </Link>
    </div>
  );
}
