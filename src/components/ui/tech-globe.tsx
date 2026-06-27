"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TechGlobeProps {
  className?: string;
  size?: number;
}

export function TechGlobe({ className, size = 400 }: TechGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [globeSize, setGlobeSize] = useState(size);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setGlobeSize(280);
      } else if (window.innerWidth < 1024) {
        setGlobeSize(340);
      } else {
        setGlobeSize(size);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution for crisp text (retina display support)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = globeSize * dpr;
    canvas.height = globeSize * dpr;
    ctx.scale(dpr, dpr);
    
    // Physical size in CSS
    canvas.style.width = `${globeSize}px`;
    canvas.style.height = `${globeSize}px`;

    const techStack = [
      "Python", "SQL", "RAG", "AI Agents", "Multi-Agent",
      "MCP", "Prompt Eng", "Conversational AI", "FastAPI", "REST APIs",
      "Microservices", "Event-Driven", "Distributed Systems", "PostgreSQL", "MongoDB",
      "Redis", "Vector DBs", "Object Storage", "Data Modeling", "LangGraph",
      "CrewAI", "LangChain", "LlamaIndex", "RabbitMQ", "Celery",
      "Taskiq", "Keycloak", "SSO", "OAuth 2.0", "JWT",
      "Docker", "CI/CD", "Linux", "Git", "GitHub"
    ];

    const radius = globeSize / 2.5;
    const centerX = globeSize / 2;
    const centerY = globeSize / 2;

    // Distribute points on a sphere (Fibonacci sphere)
    const points: { x: number, y: number, z: number, text: string }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < techStack.length; i++) {
      const y = 1 - (i / (techStack.length - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({ x: x * radius, y: y * radius, z: z * radius, text: techStack[i] });
    }

    let angleX = 0;
    let angleY = 0;
    let animationFrameId: number;
    let isVisible = true;

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, globeSize, globeSize);
      
      // Auto rotation
      angleX += 0.002;
      angleY += 0.002;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Render points
      points.forEach(point => {
        // Rotate around Y axis
        let x1 = point.x * cosY - point.z * sinY;
        let z1 = point.z * cosY + point.x * sinY;

        // Rotate around X axis
        let y2 = point.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + point.y * sinX;

        // Perspective projection
        const focalLength = globeSize;
        const scale = focalLength / (focalLength + z2);

        const xProjected = centerX + x1 * scale;
        const yProjected = centerY + y2 * scale;

        // Render Text
        const opacity = Math.max(0.1, (z2 + radius) / (2 * radius));
        ctx.font = `bold ${Math.max(10, 16 * scale)}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        // Cyan glow for text in front
        if (z2 > 0) {
          ctx.shadowColor = "rgba(6, 182, 212, 0.8)";
          ctx.shadowBlur = 10;
          ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(163, 163, 163, ${opacity})`; // muted text for back
        }
        
        ctx.fillText(point.text, xProjected, yProjected);
        ctx.shadowBlur = 0; // Reset shadow
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          // Restart loop if transitioned to visible
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Initial render trigger
    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [globeSize]);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <canvas ref={canvasRef} className="max-w-full h-auto" />
    </div>
  );
}
