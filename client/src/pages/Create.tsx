import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNftSchema } from "@shared/schema";
import { z } from "zod";
import { useCreateNft } from "@/hooks/use-nfts";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Info, AlertCircle } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const formSchema = insertNftSchema.extend({
  priceSol: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Create() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { connected, publicKey } = useWallet();
  const createNft = useCreateNft();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      priceSol: "0.5",
      ownerAddress: publicKey?.toBase58() || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your Solana wallet to mint.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createNft.mutateAsync({
        ...data,
        ownerAddress: publicKey?.toBase58(),
      });

      toast({
        title: "NFT Minted Successfully",
        description: "Your digital asset has been created on the network.",
      });
      setLocation("/explore");
    } catch (error) {
      toast({
        title: "Minting failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left Side: Information */}
        <div className="space-y-8">
          <div>
            <h1 className="font-display text-4xl font-bold mb-4">Create New Item</h1>
            <p className="text-muted-foreground text-lg">
              Upload your artwork, set a price, and mint it to the Solana Devnet.
              Fast, cheap, and eco-friendly.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1 text-foreground/80">Devnet Environment</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Transactions are submitted to Solana Devnet. No real funds are required.
                  Your wallet signature is used to authorize the mint.
                </p>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="hidden lg:block">
            <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-muted-foreground/60">Live Preview</h3>
            <div className="w-full max-w-xs">
              <div className="neon-border rounded-xl bg-card p-4 shadow-2xl">
                <div className="aspect-square rounded-lg bg-muted/30 mb-4 overflow-hidden">
                  {form.watch("imageUrl") ? (
                    <img src={form.watch("imageUrl")} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                      <Upload className="h-8 w-8 opacity-20" />
                      <span className="text-xs opacity-40">Image preview</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {form.watch("title") ? (
                    <p className="font-bold text-sm">{form.watch("title")}</p>
                  ) : (
                    <div className="h-5 w-3/4 bg-white/10 rounded animate-pulse" />
                  )}
                  <div className="h-3.5 w-1/2 bg-white/5 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="glass-panel p-8 rounded-2xl">
          {!connected ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
              <p className="text-muted-foreground mb-8 max-w-xs">
                Connect your Solana wallet to proceed with minting.
              </p>
              <WalletMultiButton />
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Image URL */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <div className="relative">
                  <input
                    {...form.register("imageUrl")}
                    placeholder="https://..."
                    className="w-full h-12 px-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
                {form.formState.errors.imageUrl && (
                  <p className="text-xs text-destructive">{form.formState.errors.imageUrl.message}</p>
                )}
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  {...form.register("title")}
                  placeholder="e.g. Cyber Punk #2077"
                  className="w-full h-12 px-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
                {form.formState.errors.title && (
                  <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  {...form.register("description")}
                  rows={4}
                  placeholder="Tell the story behind your masterpiece..."
                  className="w-full p-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                />
                {form.formState.errors.description && (
                  <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Price (SOL)</label>
                <input
                  type="number"
                  step="0.01"
                  {...form.register("priceSol")}
                  className="w-full h-12 px-4 rounded-xl bg-background/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
                {form.formState.errors.priceSol && (
                  <p className="text-xs text-destructive">{form.formState.errors.priceSol.message}</p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={createNft.isPending}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {createNft.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Minting...
                    </>
                  ) : (
                    "Mint Item"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}