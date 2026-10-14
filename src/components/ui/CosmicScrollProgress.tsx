"use client";

import React, { useState, useEffect, useRef } from "react";
import { Compass, Sparkles } from "lucide-react";

interface CosmicScrollProgressProps {
  progress?: number;
  activeSection?: string;
  activeSectionLabel?: string;
}

const SECTIONS = [
  { id: "hero", label: "Origin" },
  { id: "team", label: "Who We Are" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "why-us", label: "The Outliers Advantage" },
  { id: "contact", label: "Contact" },
];

export function CosmicScrollProgress({
  progress: initialProgress = 0,
  activeSectionLabel: initialLabel = "Origin",
}: CosmicScrollProgressProps) {
  const [isHovered, setIsHovered] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const pctRef = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const trackHeightPx = 220;
  const initialH = Math.max(Math.min(initialProgress * trackHeightPx, trackHeightPx), 3);
  const initialPct = Math.round(initialProgress * 100);

  useEffect(() => {
    let animId: number;
    let lastScrollY = -1;

    const renderLoop = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      // Only execute DOM mutation if scroll position has actually moved
      if (scrollY !== lastScrollY) {
        lastScrollY = scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const normalized = scrollHeight > 0 ? Math.min(Math.max(scrollY / scrollHeight, 0), 1) : 0;
        const currentH = Math.max(Math.min(normalized * trackHeightPx, trackHeightPx), 3);
        const pct = Math.round(normalized * 100);

        // Instant hardware-accelerated DOM mutation (0ms lag, no React re-render cycle)
        if (trackRef.current) {
          trackRef.current.style.height = `${currentH}px`;
        }
        if (nodeRef.current) {
          nodeRef.current.style.transform = `translate3d(0, ${currentH}px, 0)`;
        }
        if (containerRef.current) {
          containerRef.current.setAttribute("aria-valuenow", String(pct));
          containerRef.current.setAttribute("aria-valuetext", `${pct}% traversed`);
        }
        if (pctRef.current) {
          pctRef.current.textContent = `${pct}% Traversed`;
        }

        // Real-time section detection
        const scrollMiddle = scrollY + window.innerHeight * 0.35;
        for (const sec of SECTIONS) {
          const el = document.getElementById(sec.id);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollMiddle >= top && scrollMiddle < top + height) {
              if (labelRef.current && labelRef.current.textContent !== sec.label) {
                labelRef.current.textContent = sec.label;
              }
              break;
            }
          }
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleJumpToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Page reading progress"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Interactive Tooltip / Active Section Label */}
      <div
        className={`absolute right-9 top-1/2 -translate-y-1/2 transition-all duration-150 pointer-events-auto ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        <div className="liquid-glass-gold px-3.5 py-2 rounded-xl text-right border border-[rgba(212,175,55,0.4)] shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-md min-w-[130px]">
          <div className="flex items-center justify-end gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#F6E27A]">
            <Compass className="w-3 h-3 text-[#F6E27A]" />
            <span>Cosmic Progress</span>
          </div>
          <p ref={labelRef} className="text-xs font-bold text-[#FFFDF5] mt-0.5 truncate">
            {initialLabel}
          </p>
          <p ref={pctRef} className="text-[10px] font-mono text-[#94A3B8]">
            {initialPct}% Traversed
          </p>
        </div>
      </div>

      {/* Cosmic Track Container */}
      <div
        ref={containerRef}
        role="progressbar"
        aria-valuenow={initialPct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${initialPct}% traversed, current section: ${initialLabel}`}
        className="relative w-7 flex flex-col items-center"
        style={{ height: `${trackHeightPx}px` }}
      >
        {/* Origin Celestial Marker (Top Anchor) */}
        <div className="absolute top-0 w-2 h-2 rounded-full bg-[#F6E27A] shadow-[0_0_10px_2px_rgba(246,226,122,0.8)] z-10">
          <div className="absolute inset-0 rounded-full animate-ping opacity-75 bg-[#F6E27A]" />
        </div>

        {/* 
          LIVE COSMIC PROGRESS TRACK (Direct 60-120fps hardware-accelerated tracking, zero lag)
          NO FUTURE TRACK rendered below progress point.
        */}
        <div
          ref={trackRef}
          className="absolute top-0 w-[2.5px] rounded-full pointer-events-none"
          style={{
            height: `${initialH}px`,
            background:
              "linear-gradient(to bottom, #F6E27A 0%, #E5A93C 30%, #38BDF8 65%, #A855F7 85%, #EC4899 100%)",
            boxShadow:
              "0 0 10px rgba(246, 226, 122, 0.75), 0 0 18px rgba(56, 189, 248, 0.45)",
            willChange: "height",
          }}
        />

        {/* 
          MOVING ENDPOINT STAR NODE (Direct 3D transform on RAF, zero transition delay)
        */}
        <div
          ref={nodeRef}
          className="absolute top-0 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 left-1/2 z-20 cursor-pointer group"
          style={{
            transform: `translate3d(0, ${initialH}px, 0)`,
            willChange: "transform",
          }}
          onClick={() => setIsHovered(!isHovered)}
          title={`Click to preview cosmic traversal`}
        >
          {/* Glowing Aura Ring */}
          <div className="absolute inset-0 rounded-full bg-[#F6E27A] blur-[3px] opacity-80 group-hover:scale-125 transition-transform" />

          {/* Core Star Node */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#FFFDF5] to-[#F6E27A] border border-[#FFFDF5] shadow-[0_0_14px_3px_rgba(246,226,122,0.9)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#07090E]" />
          </div>

          {/* Micro Sparkle Icon on Hover */}
          {isHovered && (
            <Sparkles className="absolute -top-3 -right-3 w-3 h-3 text-[#F6E27A] animate-spin" />
          )}
        </div>
      </div>

      {/* Quick-Jump Navigation Dots */}
      {isHovered && (
        <div className="mt-3 flex flex-col gap-1.5 p-1 rounded-full liquid-glass border border-[rgba(255,255,255,0.08)] animate-in fade-in duration-200">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleJumpToSection(sec.id)}
              className="w-2 h-2 rounded-full transition-all bg-[#64748B] hover:bg-[#F6E27A] hover:scale-125"
              title={`Jump to ${sec.label}`}
              aria-label={`Jump to ${sec.label}`}
            />
          ))}
        </div>
      )}
    </aside>
  );
}
