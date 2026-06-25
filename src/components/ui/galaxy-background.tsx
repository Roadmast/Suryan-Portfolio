"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GalaxyBackgroundProps {
  className?: string;
}

interface GalaxyStar {
  rRatio: number;
  armIndex: number;
  angleOffset: number;
  size: number;
  color: string;
}

export function GalaxyBackground({ className }: GalaxyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Resize canvas to window size
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Original star properties
    const numStars = 500;
    const stars: { x: number; y: number; z: number; size: number; alpha: number; isFire: boolean }[] = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        isFire: Math.random() < 0.25, // 25% chance to be a fire ball
      });
    }

    // Central Blue Galaxy properties
    const numGalaxyStars = 380;
    const galaxyStars: GalaxyStar[] = [];
    const R_galaxy_ratio = 0.25; // Galaxy radius relative to min screen dim
    const twist = 3.2 * Math.PI; // Spiral tightness to avoid looking like a cross
    const tiltFactor = 0.38; // squash factor representing tilt angle
    const rollAngle = -Math.PI / 6; // diagonal tilt angle (-30 degrees)
    let rotationAngle = 0;

    for (let i = 0; i < numGalaxyStars; i++) {
      const rRatio = Math.random();
      const armIndex = Math.floor(Math.random() * 2); // 2 arms for a classic S-shape spiral (no cross)
      const angleOffset = (Math.random() - 0.5) * 0.25;
      const size = Math.random() * 1.2 + 0.4;

      let color = "";
      if (rRatio < 0.15) {
        // Bright blue-white core
        color = `hsla(${Math.floor(Math.random() * 20) + 195}, 70%, 90%, ${Math.random() * 0.4 + 0.4})`;
      } else {
        // Blue/cyan shades along the spiral arms
        const hue = Math.random() < 0.7
          ? Math.floor(Math.random() * 20) + 190  // Cyan/Light Blue (190 - 210)
          : Math.floor(Math.random() * 25) + 210; // Royal Blue/Blue (210 - 235)
        color = `hsla(${hue}, 95%, 70%, ${Math.random() * 0.35 + 0.15})`;
      }

      galaxyStars.push({
        rRatio,
        armIndex,
        angleOffset,
        size,
        color
      });
    }

    // Throttle to ~40fps for background canvas (saves CPU/GPU for foreground animations)
    let lastRenderTime = 0;
    const TARGET_FPS = 40;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    const render = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(render);
      const elapsed = timestamp - lastRenderTime;
      if (elapsed < FRAME_INTERVAL) return;
      lastRenderTime = timestamp - (elapsed % FRAME_INTERVAL);

      // Clear with dark transparent for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const R_galaxy = Math.min(width, height) * R_galaxy_ratio;

      // Draw ambient blue space nebula background & Nucleus (Tilted via 2D transformations)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rollAngle);
      ctx.scale(1, tiltFactor);

      // Nebula
      const nebulaGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, R_galaxy * 1.8);
      nebulaGlow.addColorStop(0, "rgba(29, 78, 216, 0.12)");  // Blue core glow
      nebulaGlow.addColorStop(0.5, "rgba(6, 182, 212, 0.05)"); // Cyan mid glow
      nebulaGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = nebulaGlow;
      ctx.beginPath();
      ctx.arc(0, 0, R_galaxy * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Bright nucleus
      const nucleusGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, R_galaxy * 0.35);
      nucleusGlow.addColorStop(0, "rgba(224, 242, 254, 0.6)"); // very light blue-white
      nucleusGlow.addColorStop(0.4, "rgba(56, 189, 248, 0.25)"); // soft cyan/sky blue
      nucleusGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = nucleusGlow;
      ctx.beginPath();
      ctx.arc(0, 0, R_galaxy * 0.35, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Update galaxy rotation
      rotationAngle += 0.0015;

      // 1. Render Central Blue Galaxy stars (Tilted manually to preserve star roundness)
      galaxyStars.forEach((star) => {
        const r = star.rRatio * R_galaxy;
        const armAngle = star.armIndex * Math.PI; // 2 arms (0 and PI)
        const theta = armAngle + Math.pow(star.rRatio, 0.9) * twist + rotationAngle + star.angleOffset;

        // Coordinates in flat galaxy plane
        const x_flat = r * Math.cos(theta);
        const y_flat = r * Math.sin(theta);

        // Apply pitch tilt (squashes Y)
        const x_pitch = x_flat;
        const y_pitch = y_flat * tiltFactor;

        // Apply roll rotation (orient diagonally)
        const px = centerX + x_pitch * Math.cos(rollAngle) - y_pitch * Math.sin(rollAngle);
        const py = centerY + x_pitch * Math.sin(rollAngle) + y_pitch * Math.cos(rollAngle);

        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });

      // 2. Update and draw original stars (previous bubbles)
      ctx.save();
      ctx.translate(centerX, centerY);

      stars.forEach((star) => {
        // Move stars forward (decrease z)
        star.z -= 0.5;
        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = width;
        }

        // Project 3D to 2D
        const scale = 300 / star.z;
        const px = star.x * scale;
        const py = star.y * scale;

        // Add some slight rotation around center
        const angle = 0.0005;
        const newX = star.x * Math.cos(angle) - star.y * Math.sin(angle);
        const newY = star.x * Math.sin(angle) + star.y * Math.cos(angle);
        star.x = newX;
        star.y = newY;

        ctx.beginPath();
        ctx.arc(px, py, star.size * scale, 0, Math.PI * 2);

        // Dynamic opacity based on z depth
        const opacity = Math.max(0, 1 - star.z / width) * star.alpha;
        
        if (star.isFire) {
          // Create realistic fire gradient
          const gradient = ctx.createRadialGradient(px, py, 0, px, py, star.size * scale * 1.5);
          gradient.addColorStop(0, `rgba(255, 255, 150, ${opacity})`);     // White/yellow hot center
          gradient.addColorStop(0.3, `rgba(255, 170, 0, ${opacity * 0.9})`); // Bright orange
          gradient.addColorStop(0.7, `rgba(220, 50, 0, ${opacity * 0.7})`);  // Red/orange mid
          gradient.addColorStop(1, `rgba(150, 0, 0, 0)`);                   // Fade out
          
          ctx.fillStyle = gradient;
          ctx.shadowBlur = 15;
          ctx.shadowColor = `rgba(255, 80, 0, ${opacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 pointer-events-none z-[-1]", className)}
      style={{ background: "#000", willChange: "transform" }}
    />
  );
}
