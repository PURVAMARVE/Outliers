"use client";

import React, { useState } from "react";
import { achievementsData } from "@/data/achievements";
import { AchievementCategory } from "@/types";
import { Trophy, Award, Sparkles, ExternalLink, Calendar, CheckCircle2, Star, Zap, BookOpen } from "lucide-react";

const CATEGORIES: { label: string; value: AchievementCategory }[] = [
  { label: "All Records", value: "All" },
  { label: "Hackathons", value: "Hackathon" },
  { label: "Open Source", value: "Open Source" },
  { label: "Research", value: "Research" },
];

export function AchievementsSection() {
  const [activeCategory, setActiveCategory] = useState<AchievementCategory>("All");

  const filteredAchievements = achievementsData.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Winner":
        return {
          bg: "bg-emerald-950/60 border-emerald-400/50 text-emerald-300",
          icon: Trophy,
        };
      case "Finalist":
        return {
          bg: "bg-amber-950/60 border-amber-400/50 text-amber-300",
          icon: Sparkles,
        };
      case "Special Award":
        return {
          bg: "bg-purple-950/60 border-purple-400/50 text-purple-300",
          icon: Award,
        };
      default:
        return {
          bg: "bg-blue-950/60 border-blue-400/50 text-blue-300",
          icon: Star,
        };
    }
  };

  return (
    <section id="achievements" aria-label="Team Achievements" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/40 bg-amber-950/40 text-amber-300 text-xs font-mono uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <Trophy className="w-3.5 h-3.5 text-[#F6E27A]" />
            <span>03 • TRACK RECORD & HONORS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-3">
            Team Achievements
          </h2>

          <p className="text-base sm:text-lg font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] mb-3 italic">
            “Battle-tested across national arenas, verified by industry juries.”
          </p>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            From premier 24-hour sprint showdowns to global open-source rankings and peer-reviewed research publications, our pedigree is earned under pressure.
          </p>

          {/* Metric Summary Strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-[#0a0f1d]/80 border border-amber-400/20 backdrop-blur-md">
              <p className="text-2xl font-display font-bold text-[#F6E27A]">5+</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                Hackathon Podiums
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0a0f1d]/80 border border-amber-400/20 backdrop-blur-md">
              <p className="text-2xl font-display font-bold text-[#FFFDF5]">Top 3%</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                GSSoC Global Rank
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0a0f1d]/80 border border-amber-400/20 backdrop-blur-md">
              <p className="text-2xl font-display font-bold text-[#F6E27A]">1</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                IJSDR Paper Published
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#0a0f1d]/80 border border-amber-400/20 backdrop-blur-md">
              <p className="text-2xl font-display font-bold text-[#FFFDF5]">100%</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                Verified Deliverables
              </p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  activeCategory === cat.value
                    ? "bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] text-[#07090E] font-bold shadow-[0_0_15px_rgba(246,226,122,0.4)]"
                    : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((item) => {
            const badge = getStatusBadge(item.status);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={item.id}
                className="rounded-3xl p-6 bg-gradient-to-br from-[#0c1220] via-[#090d1a] to-[#060810] border border-amber-400/25 hover:border-amber-400/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(246,226,122,0.15)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Highlight Pill & Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-[#F6E27A]">
                      {item.highlightTag || item.category}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${badge.bg}`}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      <span>{item.status}</span>
                    </span>
                  </div>

                  {/* Title & Event */}
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-1.5">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-3">
                    <Calendar className="w-3 h-3 text-[#F6E27A]" />
                    <span>{item.event}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>

                  {/* Summary & Description */}
                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-slate-400 font-mono mb-4 leading-relaxed">
                    {item.description}
                  </div>
                </div>

                {/* Footer: Evidence Link */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500">
                    <CheckCircle2 className="w-3 h-3 text-[#F6E27A]" />
                    <span>Verified Honor</span>
                  </span>

                  {item.evidenceUrl && (
                    <a
                      href={item.evidenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-[#F6E27A] hover:text-white transition-colors"
                    >
                      <span>{item.evidenceLabel || "View Evidence"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
