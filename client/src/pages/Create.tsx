import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNftSchema } from "@shared/schema";
import { z } from "zod";
import { useCreateNft } from "@/hooks/use-nfts";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Info, AlertCircle, CheckCircle2 } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const formSchema = insertNftSchema.extend({
  priceSol: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const STEPS = [
  { n: "01", label: "Upload" },
  { n: "02", label: "Details" },
  { n: "03", label: "Mint"   },
];

export default function Create() {
  const [, setLocation] = useLocation();
  const { toast }       = useToast();
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

  const imageUrl = form.watch("imageUrl");
  const title    = form.watch("title");

  const onSubmit = async (data: FormValues) => {
    if (!connected) {
      toast({ title: "Wallet not connected", description: "Connect your Solana wallet to mint.", variant: "destructive" });
      return;
    }
    try {
      await createNft.mutateAsync({ ...data, ownerAddress: publicKey?.toBase58() });
      toast({ title: "NFT Minted Successfully", description: "Your digital asset is now on the network." });
      setLocation("/explore");
    } catch (error) {
      toast({ title: "Minting failed", description: error instanceof Error ? error.message : "Something went wrong", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8 py-10">
          <div className="flex items-start gap-4">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.2em] uppercase pt-1.5"></span>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">Create New Item</h1>
              <p className="text-muted-foreground mt-1">Upload your artwork and mint it to Solana Devnet</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-5xl">

        {/* Step indicators */}
        <div className="flex items-center gap-0 mb-12">
          {STEPS.map((step, i) => (
            <div key={step.n} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}>
                <span className="font-mono text-xs">{step.n}</span>
                <span>{step.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="h-px w-6 bg-white/10 mx-1" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: Preview column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Live preview card */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Live Preview</p>
              <div className="rounded-2xl border border-white/8 bg-card overflow-hidden">
                <div className="aspect-square bg-muted/20">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground/30">
                      <Upload className="h-10 w-10" />
                      <span className="text-xs">Paste an image URL below</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-bold text-sm mb-1 truncate">
                    {title || <span className="text-muted-foreground/40">Item name</span>}
                  </p>
                  <p className="font-mono text-xs text-primary">{form.watch("priceSol") || "0.5"} SOL</p>
                </div>
              </div>
            </div>

            {/* Info note */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/8">
              <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Transactions are submitted to Solana Devnet. Your wallet signature authorizes the mint.
              </p>
            </div>
          </div>

          {/* Right: Form column */}
          <div className="lg:col-span-3">
            {!connected ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 border border-dashed border-white/10 rounded-2xl">
                <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
                <p className="text-muted-foreground mb-8 max-w-xs text-sm">
                  Connect your Solana wallet to authorize the minting transaction.
                </p>
                <WalletMultiButton />
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <Field label="Image URL" hint="Direct link to your image (JPEG, PNG, GIF, WebP)">
                  <input
                    {...form.register("imageUrl")}
                    placeholder="https://…"
                    className="input-base"
                  />
                  {form.formState.errors.imageUrl && (
                    <FieldError msg={form.formState.errors.imageUrl.message} />
                  )}
                </Field>

                <Field label="Name">
                  <input
                    {...form.register("title")}
                    placeholder="e.g. Cyber Punk #2077"
                    className="input-base"
                  />
                  {form.formState.errors.title && (
                    <FieldError msg={form.formState.errors.title.message} />
                  )}
                </Field>

                <Field label="Description">
                  <textarea
                    {...form.register("description")}
                    rows={4}
                    placeholder="Tell the story behind your masterpiece…"
                    className="input-base resize-none"
                  />
                  {form.formState.errors.description && (
                    <FieldError msg={form.formState.errors.description.message} />
                  )}
                </Field>

                <Field label="Price" hint="Listed price in SOL">
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      {...form.register("priceSol")}
                      className="input-base pr-14"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">SOL</span>
                  </div>
                  {form.formState.errors.priceSol && (
                    <FieldError msg={form.formState.errors.priceSol.message} />
                  )}
                </Field>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={createNft.isPending}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-accent font-bold text-white shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {createNft.isPending ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Minting…</>
                    ) : (
                      <><CheckCircle2 className="h-4 w-4" /> Mint Item</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium">{label}</label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return <p className="text-xs text-destructive mt-1">{msg}</p>;
}
