import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { SolanaWalletProvider } from "./components/WalletProvider";
import { Navbar } from "./components/Navbar";

import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import Create from "@/pages/Create";
import NotFound from "@/pages/not-found";

// Ambient background orbs — fixed behind all content, managed globally
function BackgroundOrbs() {
  return (
    <div className="bg-orbs" aria-hidden="true">
      <div className="bg-orbs__orb bg-orbs__orb--1" />
      <div className="bg-orbs__orb bg-orbs__orb--2" />
      <div className="bg-orbs__orb bg-orbs__orb--3" />
    </div>
  );
}

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/explore" component={Explore} />
          <Route path="/create" component={Create} />
          <Route component={NotFound} />
        </Switch>
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-primary" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
              <path d="M6 3h12l4 6-10 13L2 9z" />
              <path d="M2 9h20" />
              <path d="M12 22V9" />
              <path d="M6 3l6 6 6-6" />
            </svg>
            <span className="font-semibold text-foreground/70">NEXUS</span>
          </div>
          <p>© {new Date().getFullYear()} Nexus NFT Marketplace. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SolanaWalletProvider>
        <BackgroundOrbs />
        <Router />
        <Toaster />
      </SolanaWalletProvider>
    </QueryClientProvider>
  );
}

export default App;
