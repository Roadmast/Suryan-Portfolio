"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

export function GlassCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  // Motion values for direct, lag-free hardware accelerated translation
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring animations for the main cursor (optimized for better performance)
  const cursorX = useSpring(mouseX, { stiffness: 600, damping: 35, mass: 0.2 });
  const cursorY = useSpring(mouseY, { stiffness: 600, damping: 35, mass: 0.2 });

  // Spring animations for the trailing water droplet (heavier drag for liquid feel)
  const trailX = useSpring(mouseX, { stiffness: 120, damping: 25, mass: 0.8 });
  const trailY = useSpring(mouseY, { stiffness: 120, damping: 25, mass: 0.8 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Mouse movement handler
    const updateMousePosition = (e: MouseEvent) => {
      // If we receive mouse movement, ensure we show the custom cursor
      setIsTouchDevice(false);
      if (!hasMoved) setHasMoved(true);

      const x = e.clientX;
      const y = e.clientY;

      mouseX.set(x);
      mouseY.set(y);

      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }

      // Calculate distance from last ripple coordinate to spawn wave
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Spawn a single organic ripple when moved more than 50px (reduced frequency for better performance)
      if (distance > 50) {
        ripplesRef.current.push({
          x,
          y,
          radius: 2,
          maxRadius: 40 + Math.random() * 20, // organic size
          opacity: 0.5,
          speed: 0.8 + Math.random() * 1, // smooth, slower expand speed
        });
        lastPosRef.current = { x, y };
      }
    };

    // Hide custom cursor during screen touch events to avoid doubling
    const handleTouchStart = () => {
      setIsTouchDevice(true);
    };

    // Spawn a wave ripple on mouse click
    const handleMouseClick = (e: MouseEvent) => {
      if (isTouchDevice) return;
      const x = e.clientX;
      const y = e.clientY;
      // Generate multiple concentric ripples on click, but expand larger and glow
      for (let i = 0; i < 3; i++) {
        ripplesRef.current.push({
          x,
          y,
          radius: 2,
          maxRadius: 90 + i * 25,
          opacity: 0.65 - i * 0.15,
          speed: 1.5 - i * 0.2,
        });
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("click", handleMouseClick);

    // Ripple update and render loop
    let animationFrameId: number;
    const renderRipples = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animationFrameId = requestAnimationFrame(renderRipples);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animationFrameId = requestAnimationFrame(renderRipples);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const ripples = ripplesRef.current;

      // Apply shadow glow for a beautiful liquid wave aesthetic
      ctx.save();
      ctx.shadowColor = "rgba(6, 182, 212, 0.45)";
      ctx.shadowBlur = 6;

      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        ripple.radius += ripple.speed;
        ripple.opacity -= 0.01; // smooth, slower decay

        if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Draw a single, clean, glowing wave ring
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${ripple.opacity})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(renderRipples);
    };

    animationFrameId = requestAnimationFrame(renderRipples);

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    // Defer initial resize setup briefly to ensure ref is attached
    const resizeTimeout = setTimeout(handleResize, 100);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("click", handleMouseClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice, hasMoved, mouseX, mouseY]);

  // If touch input is currently active or mouse has not moved, hide the custom cursor elements
  if (!hasMoved || isTouchDevice) return null;

  return (
    <>
      {/* Wave ripples layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[90]"
      />

      {/* Trailing Fluid Water Droplet */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[95] mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          width: 18,
          height: 18,
          marginLeft: -9,
          marginTop: -9,
          background: "rgba(6, 182, 212, 0.2)",
          boxShadow: "0 0 10px rgba(6, 182, 212, 0.4), inset 0 0 4px rgba(255, 255, 255, 0.6)",
          filter: "blur(0.5px)",
        }}
        animate={{
          scale: isHovering ? 1.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      />

      {/* Main Cursor Outer Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] border border-cyan-500/40 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          width: 18,
          height: 18,
          marginLeft: -9,
          marginTop: -9,
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? "rgba(6, 182, 212, 0.85)" : "rgba(6, 182, 212, 0.4)",
          backgroundColor: isHovering ? "rgba(6, 182, 212, 0.18)" : "rgba(6, 182, 212, 0)"
        }}
        transition={{ type: "spring", stiffness: 700, damping: 40, mass: 0.25 }}
      />

      {/* Main Cursor Central Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[100] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          marginLeft: -3,
          marginTop: -3,
          boxShadow: "0 0 6px rgba(34, 211, 238, 0.9)",
        }}
        animate={{
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.15 }}
      />
    </>
  );
}
