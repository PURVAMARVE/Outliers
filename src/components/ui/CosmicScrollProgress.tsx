"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Compass } from "lucide-react";

interface CosmicScrollProgressProps {
  progress?: number;
  activeSection?: string;
  activeSectionLabel?: string;
}

const SECTIONS = [
  { id: "hero", label: "Origin" },
  { id: "team", label: "Who We Are" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function CosmicScrollProgress({
  progress: propProgress,
  activeSection: propActiveSection,
  activeSectionLabel: propActiveLabel,
}: CosmicScrollProgressProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentLabel, setCurrentLabel] = useState(propActiveLabel || "Origin");
  const [currentActiveSec, setCurrentActiveSec] = useState(propActiveSection || "hero");
  const [displayPercentage, setDisplayPercentage] = useState(
    propProgress !== undefined ? Math.round(propProgress * 100) : 0
  );

  const trackRef = useRef<HTMLDivElement | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const trackHeightPx = 220;
  const initialHeight = Math.max(
    Math.min((propProgress ?? 0) * trackHeightPx, trackHeightPx),
    3
  );

  useEffect(() => {
    let animId: number;

    const updateLiveProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const normalized =
        scrollHeight > 0
          ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1)
          : (propProgress ?? 0);

      const currentHeight = Math.max(Math.min(normalized * trackHeightPx, trackHeightPx), 3);
      const pct = Math.round(normalized * 100);

      // Direct synchronous DOM updates for 0ms latency live tracking
      if (trackRef.current) {
        trackRef.current.style.height = `${currentHeight}px`;
      }
      if (nodeRef.current) {
        nodeRef.current.style.transform = `translate3d(0, ${currentHeight}px, 0)`;
      }

      // Check section in real-time
      const scrollMiddle = scrollTop + window.innerHeight * 0.35;
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollMiddle >= top && scrollMiddle < top + height) {
            setCurrentActiveSec(sec.id);
            setCurrentLabel(sec.label);
            break;
          }
        }
      }

      setDisplayPercentage(pct);
    };

    const onScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(updateLiveProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateLiveProgress();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
        className={`absolute right-9 top-1/2 -translate-y-1/2 transition-all duration-200 pointer-events-auto ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        <div className="liquid-glass-gold px-3.5 py-2 rounded-xl text-right border border-[rgba(212,175,55,0.4)] shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-md min-w-[130px]">
          <div className="flex items-center justify-end gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#F6E27A]">
            <Compass className="w-3 h-3 text-[#F6E27A]" />
            <span>Cosmic Progress</span>
          </div>
          <p className="text-xs font-bold text-[#FFFDF5] mt-0.5 truncate">
            {currentLabel}
          </p>
          <p className="text-[10px] font-mono text-[#94A3B8]">
            {displayPercentage}% Traversed
          </p>
        </div>
      </div>

      {/* Cosmic Track Container */}
      <div
        role="progressbar"
        aria-valuenow={displayPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${displayPercentage}% traversed, current section: ${currentLabel}`}
        className="relative w-7 flex flex-col items-center"
        style={{ height: `${trackHeightPx}px` }}
      >
        {/* Origin Celestial Marker (Top Anchor) */}
        <div className="absolute top-0 w-2 h-2 rounded-full bg-[#F6E27A] shadow-[0_0_10px_2px_rgba(246,226,122,0.8)] z-10">
          <div className="absolute inset-0 rounded-full animate-ping opacity-75 bg-[#F6E27A]" />
        </div>

        {/* 
          LIVE COSMIC PROGRESS TRACK (0ms lag, direct scroll lock)
          NO FUTURE TRACK below the point of travel.
        */}
        <div
          ref={trackRef}
          className="absolute top-0 w-[2.5px] rounded-full pointer-events-none"
          style={{
            height: `${initialHeight}px`,
            background:
              "linear-gradient(to bottom, #F6E27A 0%, #E5A93C 30%, #38BDF8 65%, #A855F7 85%, #EC4899 100%)",
            boxShadow:
              "0 0 10px rgba(246, 226, 122, 0.75), 0 0 18px rgba(56, 189, 248, 0.45)",
            willChange: "height",
          }}
        />

        {/* 
          LIVE MOVING ENDPOINT STAR NODE (Direct 3D transform, zero transition delay)
        */}
        <div
          ref={nodeRef}
          className="absolute top-0 w-3.5 h-3.5 -translate-x-1/2 -translate-y-1/2 left-1/2 z-20 cursor-pointer group"
          style={{
            transform: `translate3d(0, ${initialHeight}px, 0)`,
            willChange: "transform",
          }}
          onClick={() => setIsHovered(!isHovered)}
          title={`Currently at ${currentLabel} (${displayPercentage}%)`}
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
              className={`w-2 h-2 rounded-full transition-all ${
                currentActiveSec === sec.id
                  ? "bg-[#F6E27A] scale-125 shadow-[0_0_8px_#F6E27A]"
                  : "bg-[#64748B] hover:bg-[#FFFDF5]"
              }`}
              title={`Jump to ${sec.label}`}
              aria-label={`Jump to ${sec.label}`}
            />
          ))}
        </div>
      )}
    </aside>
  );
}
