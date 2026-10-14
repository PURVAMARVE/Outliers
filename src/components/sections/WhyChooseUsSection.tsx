"use client";

import React from "react";
import { Check, ShieldCheck, Zap, Layers, Trophy, Cpu, Users2, Sparkles, ArrowRight } from "lucide-react";

export function WhyChooseUsSection() {
  const pillars = [
    {
      icon: Users2,
      tag: "01 • ARCHITECTURAL SYNERGY",
      title: "Zero Redundancy, 100% Full-Stack Mastery",
      description:
        "Most hackathon teams have overlapping roles or missing capabilities. Outliers is precision-engineered: Tejas commands Backend & Systems, Purva leads Frontend & Agentic AI, Anuradha anchors Full-Stack MERN & Security, and Shreeraj directs Deep Learning & NLP. Every layer of the software stack is owned by a proven domain specialist.",
      highlight: "4 Complementary Minds",
    },
    {
      icon: Zap,
      tag: "02 • HIGH-VELOCITY EXECUTION",
      title: "Battle-Tested Under 24h & 36h Sprint Pressure",
      description:
        "We don't need days to spin up boilerplate. With experience spanning Smart India Hackathon, GirlScript Summer of Code (Top 3% globally), and 4 consecutive national hackathon podium finals across Pune, Nagpur, and Indore, our team has refined sprint coordination into a fine science. We ship working MVPs within hours.",
      highlight: "Proven Hackathon Finalists",
    },
    {
      icon: ShieldCheck,
      tag: "03 • AUTHENTIC ENGINEERING",
      title: "Working Production Code, Zero Vaporware",
      description:
        "We never present superficial mockups or synthetic placeholders. Every platform we present is backed by real databases (PostgreSQL/MongoDB), caching layers (Redis), trained neural network weights (BiLSTMs), and secure cookie-based JWT authentication. When judges test our apps live, everything works.",
      highlight: "100% Live Deployable Code",
    },
    {
      icon: Trophy,
      tag: "04 • DEFENSE & PRODUCT IMPACT",
      title: "End-to-End Problem Solving to Jury Defense",
      description:
        "Building great code is only half the battle. We dissect complex, ambiguous problem statements, distill them into human-centered products, and defend our architectural decisions with mathematical precision, benchmark telemetry, and compelling live demonstrations.",
      highlight: "Jury-Ready Product Defense",
    },
  ];

  return (
    <section id="why-us" aria-label="Why Choose Outliers" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/40 bg-amber-950/40 text-amber-300 text-xs font-mono uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#F6E27A]" />
            <span>03 • THE OUTLIERS ADVANTAGE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-3">
            Why We Are The Perfect Squad
          </h2>

          <p className="text-base sm:text-lg font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] mb-3 italic">
            “When high stakes demand zero compromises, here is why Outliers delivers.”
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            The winning equation: complementary technical mastery, national hackathon pedigrees, and a culture of relentless execution.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl p-7 bg-gradient-to-br from-[#0c1220] via-[#090d1a] to-[#060810] border border-amber-400/25 hover:border-amber-400/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(246,226,122,0.15)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300/80">
                      {pillar.tag}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-amber-950/50 border border-amber-400/30 flex items-center justify-center text-[#F6E27A] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-[#F6E27A]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white group-hover:text-amber-300 transition-colors mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#F6E27A]">
                    <Check className="w-3.5 h-3.5 text-[#F6E27A]" />
                    <span>{pillar.highlight}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 group-hover:text-amber-300 transition-colors">
                    Verified Outlier Benchmark →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Squad Synergy Metric Banner */}
        <div className="rounded-3xl p-8 bg-gradient-to-r from-amber-950/40 via-[#0d1322] to-amber-950/40 border border-amber-400/40 text-center max-w-4xl mx-auto shadow-[0_0_35px_rgba(246,226,122,0.15)]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div className="p-3">
              <p className="text-3xl font-display font-black text-[#FFFDF5]">4</p>
              <p className="text-[11px] font-mono text-amber-300/90 mt-1 uppercase">Distinct Verticals</p>
            </div>
            <div className="p-3">
              <p className="text-3xl font-display font-black text-[#F6E27A]">5+</p>
              <p className="text-[11px] font-mono text-amber-300/90 mt-1 uppercase">National Podiums</p>
            </div>
            <div className="p-3">
              <p className="text-3xl font-display font-black text-[#FFFDF5]">100%</p>
              <p className="text-[11px] font-mono text-amber-300/90 mt-1 uppercase">Real Production Code</p>
            </div>
            <div className="p-3">
              <p className="text-3xl font-display font-black text-[#F6E27A]">0%</p>
              <p className="text-[11px] font-mono text-amber-300/90 mt-1 uppercase">Hallucination or Fluff</p>
            </div>
          </div>

          <p className="text-sm font-display font-semibold text-[#FFFDF5] max-w-xl mx-auto mb-5 leading-relaxed">
            “Give us a challenge. We don’t just participate to finish — we engineer to win.”
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] hover:shadow-[0_0_30px_rgba(246,226,122,0.6)] text-[#07090E] font-bold text-xs tracking-wide transition-all"
          >
            <span>Partner With Our Squad</span>
            <ArrowRight className="w-4 h-4 text-[#07090E]" />
          </a>
        </div>
      </div>
    </section>
  );
}
