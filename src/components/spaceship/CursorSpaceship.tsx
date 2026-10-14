"use client";

import React, { useEffect, useState, useRef } from "react";

interface FogParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export function CursorSpaceship() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    let mouseX = -100;
    let mouseY = -100;
    let shipX = -100;
    let shipY = -100;
    let angle = -Math.PI / 4; // Default sleek 45deg pointer angle when stationary
    let currentAngle = -Math.PI / 4;
    let animId: number;
    let hasMoved = false;

    const fogParticles: FogParticle[] = [];

    // Multi-color cosmic fog palette (Magenta, Cyan, Gold, Violet, Emerald)
    const colorfulFogPalette = [
      { r: 236, g: 72, b: 153 },  // Hot Neon Pink / Magenta
      { r: 56, g: 189, b: 248 },  // Electric Celestial Cyan
      { r: 246, g: 226, b: 122 }, // Liquid Champagne Gold
      { r: 168, g: 85, b: 247 },  // Cosmic Deep Violet
      { r: 251, g: 146, b: 60 },  // Solar Flare Orange
      { r: 52, g: 211, b: 153 },  // Emerald Stardust
    ];

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        shipX = mouseX;
        shipY = mouseY;
        setIsVisible(true);
        document.documentElement.classList.add("spaceship-cursor-active");
        document.body.classList.add("spaceship-cursor-active");
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!(
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer")
        );
        setIsHovering(isClickable);
      }
    };

    const onMouseDown = () => {
      setIsClicking(true);
      // Click shockwave particle puff
      for (let i = 0; i < 8; i++) {
        const pAngle = (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 2 + 1.5;
        const color = colorfulFogPalette[Math.floor(Math.random() * colorfulFogPalette.length)];
        fogParticles.push({
          x: shipX,
          y: shipY,
          vx: Math.cos(pAngle) * speed,
          vy: Math.sin(pAngle) * speed,
          size: Math.random() * 3 + 2.5,
          alpha: 0.9,
          color: `rgba(${color.r}, ${color.g}, ${color.b}, `,
        });
      }
    };

    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => {
      setIsVisible(false);
      document.documentElement.classList.remove("spaceship-cursor-active");
      document.body.classList.remove("spaceship-cursor-active");
    };

    const onMouseEnter = () => {
      if (hasMoved) {
        setIsVisible(true);
        document.documentElement.classList.add("spaceship-cursor-active");
        document.body.classList.add("spaceship-cursor-active");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (hasMoved && shipRef.current) {
        const dx = mouseX - shipX;
        const dy = mouseY - shipY;
        const dist = Math.hypot(dx, dy);

        // Responsive cursor follow: fast responsive spring to mouse location
        shipX += dx * 0.45;
        shipY += dy * 0.45;

        // Determine flight heading angle while moving
        if (dist > 1.2) {
          angle = Math.atan2(dy, dx) + Math.PI / 2;
        } else {
          // At rest, tilt slightly like a precision cursor arrow (-25 to -45 deg)
          angle = -Math.PI / 6;
        }

        // Angle lerp for smooth banking
        let diff = angle - currentAngle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        currentAngle += diff * 0.28;

        // Position the miniature spaceship cursor
        shipRef.current.style.transform = `translate3d(${shipX}px, ${shipY}px, 0) rotate(${currentAngle}rad)`;

        // Emit vibrant colorful engine fog smoke puffs when traveling
        if (dist > 0.8) {
          // Thruster nozzle position at rear of the ship
          const nozzleOffset = 11;
          const nozzleX = shipX - Math.sin(currentAngle) * nozzleOffset;
          const nozzleY = shipY + Math.cos(currentAngle) * nozzleOffset;

          const puffsCount = dist > 5 ? 2 : 1;
          for (let i = 0; i < puffsCount; i++) {
            const spreadAngle = currentAngle + Math.PI / 2 + (Math.random() - 0.5) * 0.6;
            const puffSpeed = Math.random() * 1.6 + 0.6;
            const color = colorfulFogPalette[Math.floor(Math.random() * colorfulFogPalette.length)];

            fogParticles.push({
              x: nozzleX + (Math.random() - 0.5) * 3,
              y: nozzleY + (Math.random() - 0.5) * 3,
              vx: Math.cos(spreadAngle) * puffSpeed,
              vy: Math.sin(spreadAngle) * puffSpeed,
              size: Math.random() * 3.5 + 2.5, // Initial puff size
              alpha: Math.min(0.85, 0.4 + dist * 0.05),
              color: `rgba(${color.r}, ${color.g}, ${color.b}, `,
            });
          }
        }
      }

      // Update & render colorful billowing cosmic gas fog
      for (let i = fogParticles.length - 1; i >= 0; i--) {
        const p = fogParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.35; // Billows & expands outward like rocket fog
        p.alpha -= 0.025; // Gentle dissipation

        if (p.alpha <= 0) {
          fogParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = "#F6E27A";
        ctx.shadowBlur = p.size * 1.4;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.documentElement.classList.remove("spaceship-cursor-active");
      document.body.classList.remove("spaceship-cursor-active");
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Canvas for Colorful Thruster Smoke & Fog Plumes */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ willChange: "transform" }}
      />

      {/* Miniature Spaceship Cursor (Regular Cursor Size: ~18px x 20px) */}
      <div
        ref={shipRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-100 filter drop-shadow-[0_0_8px_rgba(246,226,122,0.85)] ${
            isClicking ? "scale-125" : isHovering ? "scale-115" : "scale-100"
          }`}
        >
          <defs>
            {/* Liquid Champagne Gold Body */}
            <linearGradient id="cursorShipHull" x1="9" y1="0" x2="9" y2="19" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFDF5" />
              <stop offset="40%" stopColor="#F6E27A" />
              <stop offset="75%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            {/* Glowing Cockpit / Visor */}
            <linearGradient id="cursorCockpit" x1="9" y1="5" x2="9" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Precision Delta Wing Body */}
          <path
            d="M9 1 L13 8 L17 14 L14 16 L11 14.5 L9 17 L7 14.5 L4 16 L1 14 L5 8 Z"
            fill="url(#cursorShipHull)"
            stroke="#FFFDF5"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* Cyan Cockpit Core */}
          <polygon
            points="9,5 10.5,10.5 9,12 7.5,10.5"
            fill="url(#cursorCockpit)"
            stroke="#FFFDF5"
            strokeWidth="0.4"
          />

          {/* Wingtip Micro Navigation Beacons */}
          <circle cx="1" cy="14" r="0.8" fill="#F43F5E" />
          <circle cx="17" cy="14" r="0.8" fill="#38BDF8" />

          {/* Nose Tip Starlight (The exact hotspot click location) */}
          <circle cx="9" cy="1.2" r="0.9" fill="#FFFDF5" />
        </svg>
      </div>
    </div>
  );
}
