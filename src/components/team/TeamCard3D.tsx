"use client";

import React, { useState } from "react";
import { TeamMember } from "@/types";
import { RotateCw, ArrowRight, Sparkles, User, Code2, Layers, CheckCircle2 } from "lucide-react";

interface TeamCard3DProps {
  member: TeamMember;
  index: number;
  onOpenModal: (member: TeamMember) => void;
  forceFlipped?: boolean;
}

export function TeamCard3D({ member, index, onOpenModal, forceFlipped }: TeamCard3DProps) {
  const [manualFlipped, setManualFlipped] = useState<boolean | null>(null);
  const [imgError, setImgError] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const isFlipped = manualFlipped !== null ? manualFlipped : Boolean(forceFlipped);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -8,
      y: ((x - centerX) / centerX) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setManualFlipped(!isFlipped);
  };

  // Reusable Professional Photo Component (Identical photo on both front and back)
  const renderProfessionalPhoto = (size = "w-32 h-32") => (
    <div className="relative my-2 flex flex-col items-center">
      <div
        className={`relative ${size} rounded-2xl p-1 bg-gradient-to-br from-[#1e1909] via-[#0d1222] to-[#040713] border-2 border-amber-400/50 group-hover:border-amber-300 shadow-[0_0_25px_rgba(246,226,122,0.25)] flex items-center justify-center transition-all overflow-hidden`}
      >
        {/* Orbiting Stardust Glow */}
        <div className="absolute inset-0 rounded-2xl dashed-arc-gold group-hover:rotate-180 transition-all duration-1000 opacity-60" />

        {/* Member Photo or Executive Fallback */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#182033] to-[#0b0f1d] flex flex-col items-center justify-center text-center overflow-hidden border border-amber-400/20">
          {member.avatarUrl && !imgError ? (
            <img
              src={member.avatarUrl}
              alt={member.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-900/60 to-amber-700/30 border border-amber-400/50 flex items-center justify-center mb-1 shadow-[0_0_15px_rgba(246,226,122,0.3)]">
                <span className="text-2xl font-display font-black text-[#F6E27A]">
                  {member.name.charAt(0)}
                </span>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-amber-300/90 bg-black/70 px-2 py-0.5 rounded-full border border-amber-400/30">
                Outliers #{String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="perspective-1000 w-full max-w-sm mx-auto h-[480px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out cursor-pointer group"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
        }}
        onClick={() => setManualFlipped(!isFlipped)}
      >
        {/* ================= FRONT OF CARD: PROFESSIONAL PROFILE ================= */}
        <div
          className="absolute inset-0 rounded-3xl p-6 border border-amber-400/30 group-hover:border-amber-400/80 group-hover:shadow-[0_0_35px_rgba(246,226,122,0.25)] transition-all duration-300 flex flex-col justify-between bg-[#080d1a]/95 shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
            zIndex: isFlipped ? 1 : 2,
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-950/60 text-amber-300 text-[11px] font-mono shadow-[0_0_10px_rgba(212,175,55,0.15)]">
              ✦ SQUAD #{String(index + 1).padStart(2, "0")}
            </span>
            <button
              onClick={toggleFlip}
              aria-label="Flip to technical focus"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-400/30 bg-amber-950/40 hover:bg-amber-400/20 text-[10px] font-mono text-amber-300 transition-colors"
            >
              <Code2 className="w-3 h-3 text-[#F6E27A]" />
              <span>Skills ↺</span>
            </button>
          </div>

          {/* Professional Photo */}
          {renderProfessionalPhoto("w-32 h-32")}

          {/* Member Name & Role */}
          <div className="text-center">
            <h3 className="text-xl font-display font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
              {member.name}
            </h3>
            <p className="text-xs font-mono text-amber-300/90 mt-1">
              {member.role}
            </p>
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mt-2 font-light">
              {member.tagline}
            </p>
          </div>

          {/* "Know Me" Primary CTA Button */}
          <div className="space-y-2 pt-2 border-t border-amber-400/15">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(member);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] hover:shadow-[0_0_25px_rgba(246,226,122,0.5)] hover:scale-[1.02] active:scale-95 text-[#07090e] font-bold text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Know Me</span>
              <ArrowRight className="w-4 h-4 text-[#07090e]" />
            </button>

            {/* Bottom Flip Prompt */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-amber-300 transition-colors">
              <Sparkles className="w-3 h-3 text-[#F6E27A]" />
              <span>Tap card to view technical focus</span>
              <RotateCw className="w-3 h-3 text-amber-400 ml-0.5" />
            </div>
          </div>
        </div>

        {/* ================= BACK OF CARD: TECHNICAL FOCUS & CORE ARSENAL (SAME PHOTO) ================= */}
        <div
          className="absolute inset-0 rounded-3xl p-6 border border-amber-300/60 shadow-[0_0_35px_rgba(246,226,122,0.3)] flex flex-col justify-between bg-gradient-to-b from-[#141009] via-[#0d1222] to-[#080d1a] shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            zIndex: isFlipped ? 2 : 1,
          }}
        >
          {/* Back Top Bar */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-950/70 text-amber-200 text-[11px] font-mono shadow-[0_0_12px_rgba(246,226,122,0.2)]">
              <Layers className="w-3 h-3 text-[#F6E27A]" />
              <span>CORE ARCHITECTURE</span>
            </span>
            <button
              onClick={toggleFlip}
              aria-label="Flip back to front"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-400/30 bg-amber-950/40 hover:bg-amber-400/20 text-[10px] font-mono text-amber-300 transition-colors"
            >
              <span>Front ↺</span>
            </button>
          </div>

          {/* Member Identity & Compact Photo */}
          <div className="flex items-center gap-3 py-1 px-2 rounded-2xl bg-amber-950/30 border border-amber-400/20">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-400/40 shrink-0 bg-[#182033] flex items-center justify-center">
              {member.avatarUrl && !imgError ? (
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-base font-display font-black text-[#F6E27A]">
                  {member.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-display font-bold text-white truncate">
                {member.name}
              </h4>
              <p className="text-[11px] font-mono text-amber-300 truncate">
                {member.role}
              </p>
            </div>
          </div>

          {/* Core Technical Arsenal (Pills) */}
          <div className="my-2">
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
              <Code2 className="w-3 h-3 text-[#F6E27A]" />
              <span>Primary Technical Arsenal:</span>
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-hidden">
              {member.skills.core.concat(member.skills.secondary.slice(0, 3)).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded-lg bg-amber-950/50 border border-amber-400/30 text-[10px] font-mono text-amber-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Flagship Impact */}
          <div className="p-2.5 rounded-xl bg-black/50 border border-white/5">
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Flagship Impact
            </p>
            <p className="text-xs font-display font-bold text-[#FFFDF5] mt-0.5">
              {member.strongestProject.title}
            </p>
            <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5 font-light">
              {member.strongestProject.description}
            </p>
          </div>

          {/* "Know Me" Primary CTA Button */}
          <div className="space-y-2 pt-2 border-t border-amber-400/15">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(member);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FFFDF5] via-[#F6E27A] to-[#D4AF37] hover:shadow-[0_0_25px_rgba(246,226,122,0.5)] hover:scale-[1.02] active:scale-95 text-[#07090e] font-bold text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Know Me</span>
              <ArrowRight className="w-4 h-4 text-[#07090e]" />
            </button>

            {/* Bottom Flip Prompt */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-amber-300 transition-colors">
              <User className="w-3 h-3 text-[#F6E27A]" />
              <span>Tap to return to overview</span>
              <RotateCw className="w-3 h-3 text-amber-400 ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
