"use client";

import { useState } from "react";
import { Phone, X, Loader2, CheckCircle, User, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export function SalesChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/superdash/lead-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name || "Anonymous",
          email: formData.email || "demo@skalix.ai",
          phone: formData.phone,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit");

      await new Promise((r) => setTimeout(r, 600));
      setIsSuccess(true);

      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
        setFormData({ name: "", email: "", phone: "" });
      }, 3500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            size="icon"
            className="h-[52px] w-[52px] rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 shadow-xl shadow-black/30 text-white transition-colors duration-150"
          >
            <Phone className="h-5 w-5" strokeWidth={1.75} />
          </Button>
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" style={{ animationDuration: "2.5s" }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[360px]"
          >
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/60 overflow-visible">

              {/* Header */}
              <div className="px-5 pt-5 pb-4 border-b border-zinc-800/60">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-zinc-300" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-white leading-tight">
                        Try the AI calling agent live
                      </h3>
                      <p className="text-[12px] text-zinc-500 mt-0.5 leading-snug">
                        Get a real demo call in under 30 seconds
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-600 hover:text-zinc-300 rounded-lg p-1.5 transition-colors duration-100 ml-2 flex-shrink-0"
                  >
                    <X className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="overflow-hidden rounded-b-2xl">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center text-center py-6 px-5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4"
                    >
                      <CheckCircle className="h-7 w-7 text-emerald-400" strokeWidth={1.5} />
                    </motion.div>
                    <h4 className="text-[14px] font-semibold text-white mb-1">
                      You&apos;re getting a call now
                    </h4>
                    <p className="text-[12px] text-zinc-500 leading-snug max-w-[240px]">
                      Pick up — your live demo is connecting. Hang tight for about 30 seconds.
                    </p>
                    <div className="mt-4 flex items-center gap-1.5">
                      <WaveformBars />
                      <span className="text-[11px] text-emerald-400 font-medium">Connecting...</span>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {/* Split layout: main form + email overflow panel */}
                    <div className="flex">

                      {/* Left — main card */}
                      <div className="flex-1 px-5 py-4">
                        {/* Trust signals */}
                        <div className="flex items-center gap-3 pb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                            ))}
                          </div>
                          <span className="text-[11px] text-zinc-500">Used by 500+ clinics</span>
                          <span className="text-zinc-700">·</span>
                          <span className="text-[11px] text-zinc-500">No spam. Just one call.</span>
                        </div>

                        {/* Name */}
                        <div className="relative mb-3">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600 pointer-events-none" strokeWidth={1.75} />
                          <Input
                            placeholder="Your name (optional)"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="pl-9 bg-zinc-900 border-zinc-800 text-white text-[13px] placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-0 focus:outline-none focus-visible:border-zinc-500 rounded-xl h-11 transition-colors duration-150 shadow-inner"
                          />
                        </div>

                        {/* Email */}
                        <div className="relative mb-3">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600 pointer-events-none" strokeWidth={1.75} />
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="pl-9 bg-zinc-900 border-zinc-800 text-white text-[13px] placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-0 focus:outline-none focus-visible:border-zinc-500 rounded-xl h-11 transition-colors duration-150 shadow-inner"
                          />
                        </div>

                        {/* Phone */}
                        <div className="relative mb-3">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600 pointer-events-none" strokeWidth={1.75} />
                          <Input
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            className="pl-9 bg-zinc-900 border-zinc-800 text-white text-[13px] placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-0 focus:outline-none focus-visible:border-zinc-500 rounded-xl h-11 transition-colors duration-150 shadow-inner"
                          />
                        </div>

                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[12px] text-red-400 bg-red-500/8 rounded-lg px-3 py-2 border border-red-500/15 mb-3"
                          >
                            {error}
                          </motion.p>
                        )}

                        <Button
                          type="submit"
                          disabled={isLoading || !formData.phone.trim()}
                          className="w-full h-11 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold text-[13px] rounded-xl shadow-sm transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{ letterSpacing: "0.01em" }}
                        >
                          {isLoading ? (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-2"
                            >
                              <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
                              <span>Connecting...</span>
                            </motion.div>
                          ) : (
                            <span>Call Me Now</span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function WaveformBars() {
  return (
    <div className="flex items-center gap-px h-4">
      {[0.3, 1, 0.6, 1, 0.3].map((h, i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full bg-emerald-400"
          animate={{ scaleY: [0.4, h, 0.4] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
          style={{ height: "16px" }}
        />
      ))}
    </div>
  );
}
