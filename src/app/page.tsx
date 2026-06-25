"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { FileText, Code2, Sparkles, Terminal } from "lucide-react";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { CredentialsSection } from "@/components/sections/credentials-section";
import { ReachOutSection } from "@/components/sections/reach-out-section";
import { cn } from "@/lib/utils";

// Inline Tech Logos
const PythonIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M439.4 153.8c0-83.2-12-107-100.2-117.4-71.7-8.5-151.6-8.5-223.3 0C28.1 46.8 16 70.6 16 153.8c0 53.3 29.9 83.1 79 92.1v-34.9c0-50.6 37.1-91.8 82.9-91.8h82.9c13.7 0 24.8 11.1 24.8 24.8v82.9c0 45.8-37.1 82.9-82.9 82.9h-41.4V349h41.4c64.2 0 116.3-52.1 116.3-116.3v-41.4c0-13.7 11.1-24.8 24.8-24.8h41.4c29.1 0 53.6-24.5 53.6-53.6v-2.3zm-324.9-38.6c-11.5 0-20.7-9.3-20.7-20.7 0-11.5 9.3-20.7 20.7-20.7 11.5 0 20.7 9.3 20.7 20.7 0 11.4-9.2 20.7-20.7 20.7z" fill="#3776ab" />
    <path d="M8.6 358.2c0 83.2 12 107 100.2 117.4 71.7 8.5 151.6 8.5 223.3 0 87.9-10.4 100.2-34.2 100.2-117.4 0-53.3-29.9-83.1-79-92.1v34.9c0 50.6-37.1 91.8-82.9 91.8h-82.9c-13.7 0-24.8-11.1-24.8-24.8v-82.9c0-45.8 37.1-82.9 82.9-82.9h41.4V163h-41.4c-64.2 0-116.3 52.1-116.3 116.3v41.4c0 13.7-11.1 24.8-24.8 24.8H53.6c-29.1 0-53.6 24.5-53.6 53.6v2.3c.1-.1.1-.1.6-.1zm324.9 38.6c11.5 0 20.7 9.3 20.7 20.7 0 11.5-9.3 20.7-20.7 20.7-11.5 0-20.7-9.3-20.7-20.7 0-11.4 9.2-20.7 20.7-20.7z" fill="#ffe873" />
  </svg>
);

const DockerIcon = () => (
  <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.983 11.078h2.119c.51 0 .926-.416.926-.925V8.22c0-.51-.416-.927-.926-.927h-2.119c-.51 0-.926.417-.926.927v1.933c0 .51.416.925.926.925M11.26 11.078h2.118c.51 0 .926-.416.926-.925V8.22c0-.51-.416-.927-.926-.927H11.26c-.51 0-.925.417-.925.927v1.933c0 .51.415.925.925.925M11.26 8.164h2.118c.51 0 .926-.416.926-.925V5.306c0-.51-.416-.926-.926-.926H11.26c-.51 0-.925.416-.925.926v1.933c0 .51.415.925.925.925M8.535 11.078h2.119c.51 0 .926-.416.926-.925V8.22c0-.51-.416-.927-.926-.927H8.535c-.51 0-.926.417-.926.927v1.933c0 .51.415.925.926.925M5.812 11.078h2.119c.51 0 .925-.416.925-.925V8.22c0-.51-.415-.927-.925-.927H5.812c-.51 0-.925.417-.925.927v1.933c0 .51.416.925.925.925M8.535 8.164h2.119c.51 0 .926-.416.926-.925V5.306c0-.51-.416-.926-.926-.926H8.535c-.51 0-.926.416-.926.926v1.933c0 .51.415.925.926.925M23.99 12.01c-.116-.275-.386-.445-.68-.445h-2.316a.625.625 0 0 0-.616.51c-.167.88-.675 1.597-1.426 2.023-.746.425-1.637.534-2.502.31a5.6 5.6 0 0 1-3.694-3.52c-.173-.49-.24-.984-.21-1.47a.64.64 0 0 0-.585-.68 18.23 18.23 0 0 0-3.513.064c-.496.06-.867.485-.867.986V12.18c0 .284.116.555.32.75l2.428 2.38a1.218 1.218 0 0 1 .373.916c-.05 1.632-.51 3.235-1.332 4.636a.612.612 0 0 0 .53.927 12.3 12.3 0 0 0 11.666-8.497 5.6 5.6 0 0 0 .393-2.15c.01-.284-.08-.564-.24-.783a.628.628 0 0 0-.648-.266c-.66.16-1.32.22-1.977.172-.016-.01-.035-.015-.052-.017H23.99z" />
  </svg>
);

const GitIcon = () => (
  <svg className="w-5 h-5 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.546 10.93L13.07 4.54a2.24 2.24 0 0 0-3.13 0L3.52 10.93a2.24 2.24 0 0 0 0 3.14l10.48 6.41a2.24 2.24 0 0 0 3.13 0l6.41-10.48a2.24 2.24 0 0 0 0-3.07zM12.02 18.41a1.65 1.65 0 1 1 0-3.3 1.65 1.65 0 0 1 0 3.3zm2.39-4.88a1.65 1.65 0 0 1-2.39.81v-2.04a1.65 1.65 0 1 1 .83-1.42c0 .26-.06.5-.16.73l1.72 1.72v.2z" />
  </svg>
);

const FastApiIcon = () => (
  <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="6" fill="#009688" stroke="none" />
    <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="white" stroke="none" />
  </svg>
);

const LangChainIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="6" fill="#1C3D5A" stroke="none" />
    <path d="M9 12h6m-6 3h6m-5-6h4" stroke="white" strokeLinecap="round" />
    <circle cx="12" cy="12" r="7" stroke="#38BDF8" strokeWidth="1.5" />
  </svg>
);

const PostgreSqlIcon = () => (
  <svg className="w-5 h-5 text-[#336791]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
  </svg>
);

const RedisIcon = () => (
  <svg className="w-5 h-5 text-[#D82C20]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L1.5 5.2v13.6L12 24l10.5-5.2V5.2zm8.5 17.5l-8.5 4.3-8.5-4.3V7.7l8.5-4.3 8.5 4.3zM12 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
  </svg>
);

const LangGraphIcon = () => (
  <svg className="w-5 h-5 text-[#FF6C37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    <circle cx="5" cy="6" r="2" fill="currentColor" stroke="none" />
    <circle cx="19" cy="6" r="2" fill="currentColor" stroke="none" />
    <circle cx="7" cy="18" r="2" fill="currentColor" stroke="none" />
    <circle cx="17" cy="18" r="2" fill="currentColor" stroke="none" />
    <line x1="5" y1="6" x2="12" y2="12" />
    <line x1="19" y1="6" x2="12" y2="12" />
    <line x1="7" y1="18" x2="12" y2="12" />
    <line x1="17" y1="18" x2="12" y2="12" />
  </svg>
);

const CrewAiIcon = () => (
  <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const AiAgentsIcon = () => (
  <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8.01" y2="16" />
    <line x1="16" y1="16" x2="16.01" y2="16" />
  </svg>
);

// Individual Tech Badge Component
interface TechBadgeProps {
  name: string;
  icon: React.ComponentType;
}

function TechBadge({ name, icon: Icon }: TechBadgeProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md shadow-lg shadow-black/80 min-w-[80px] w-fit hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] hover:scale-105 transition-all duration-300 pointer-events-auto">
      <Icon />
      <span className="text-[10px] font-bold text-gray-400 select-none tracking-wide">{name}</span>
    </div>
  );
}

const roles = [
  { text: "DEVELOPER", gradient: "from-[#F0A011] via-[#A8C45A] to-[#06D8FA]" },
  { text: "DESIGNER", gradient: "from-[#F0A011] via-[#A8C45A] to-[#06D8FA]" },
  { text: "ENGINEER", gradient: "from-[#F0A011] via-[#A8C45A] to-[#06D8FA]" },
];

const orbitSkills = [
  // Inner Orbit (Radius 160px)
  { name: "Docker", icon: DockerIcon, radius: 160, angle: 60, floatDelay: 1.5 },
  { name: "Git", icon: GitIcon, radius: 160, angle: 120, floatDelay: 0 },

  // Middle Orbit (Radius 260px)
  { name: "FastAPI", icon: FastApiIcon, radius: 260, angle: 145, floatDelay: 0.8 },
  { name: "PostgreSQL", icon: PostgreSqlIcon, radius: 260, angle: 35, floatDelay: 2.2 },
  { name: "Redis", icon: RedisIcon, radius: 260, angle: 90, floatDelay: 1.2 },

  // Outer Orbit (Radius 360px)
  { name: "Python", icon: PythonIcon, radius: 360, angle: 10, floatDelay: 1.0 },
  { name: "LangChain", icon: LangChainIcon, radius: 360, angle: -40, floatDelay: 1.8 },
  { name: "LangGraph", icon: LangGraphIcon, radius: 360, angle: -90, floatDelay: 3.0 },
  { name: "CrewAI", icon: CrewAiIcon, radius: 360, angle: 220, floatDelay: 0.4 },
  { name: "AI Agents", icon: AiAgentsIcon, radius: 360, angle: 170, floatDelay: 2.6 },
];

// Magnetic button hook
function useMagneticHover(strength = 0.25) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };
  return { ref, springX, springY, onMouseMove, onMouseLeave };
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const activeRole = roles[activeIndex] || roles[0] || { text: "", gradient: "" };

  const magLounge = useMagneticHover(0.3);
  const magResume = useMagneticHover(0.3);


  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const triggerLounge = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-lounge"));
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section
        id="home"
        className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-20 relative overflow-hidden max-w-full w-full scroll-mt-20 select-none"
      >
        {/* Orbit Rings & Floating Tech Badges Wrapper */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-[0.42] sm:scale-[0.65] md:scale-[0.85] lg:scale-100 origin-center select-none z-0">

          {/* Inner Orbit (Radius 160px) — slow spin */}
          <div className="absolute left-1/2 top-1/2 orbit-ring-spin w-[320px] h-[320px] rounded-full border border-dashed border-white/15" />

          {/* Middle Orbit (Radius 260px) — reverse spin */}
          <div className="absolute left-1/2 top-1/2 orbit-ring-spin-rev w-[520px] h-[520px] rounded-full border border-dashed border-cyan-500/10" />

          {/* Outer Orbit (Radius 360px) — slow spin with glow */}
          <div className="absolute left-1/2 top-1/2 orbit-ring-spin w-[720px] h-[720px] rounded-full border border-dashed border-white/8" style={{ animationDuration: '65s' }} />

          {/* Floating Skills — pure CSS animations (GPU-accelerated, off JS thread) */}
          {mounted && orbitSkills.map((skill, skillIdx) => {
            const Icon = skill.icon;
            const angleRad = (skill.angle * Math.PI) / 180;
            const rawX = skill.radius * Math.cos(angleRad);
            const rawY = skill.radius * Math.sin(angleRad);
            const xVal = rawX.toFixed(3);
            const yVal = rawY.toFixed(3);
            const leftStr = xVal.startsWith('-') ? `calc(50% - ${xVal.slice(1)}px)` : `calc(50% + ${xVal}px)`;
            const topStr = yVal.startsWith('-') ? `calc(50% - ${yVal.slice(1)}px)` : `calc(50% + ${yVal}px)`;

            return (
              <div
                key={skill.name}
                className={`absolute orbit-float orbit-float-d${skillIdx + 1} pointer-events-auto`}
                style={{ left: leftStr, top: topStr }}
              >
                <TechBadge name={skill.name} icon={Icon} />
              </div>
            );
          })}
        </div>

        {/* Hero Text */}
        <motion.div
          className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full z-10 relative pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Label */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/20 border border-cyan-500/25 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-8 mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Hello! I&apos;m</span>
          </motion.div>

          {/* Main Name */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-2 font-comfortaa">
            Surya Narayana
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-400 font-medium tracking-wide uppercase max-w-xl mb-4 font-comfortaa">
            A passionate <span className="font-bold text-cyan-400">AI</span> & <span className="font-bold text-orange-500">Full-Stack</span> Engineer
          </p>

          {/* Huge Role cycler */}
          <div className="h-20 sm:h-28 md:h-32 flex items-center justify-center overflow-hidden w-full select-none">
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeIndex}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={cn(
                  "text-5xl sm:text-7xl md:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r font-comfortaa",
                  activeRole.gradient
                )}
              >
                {activeRole.text}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center justify-center gap-2.5 mt-2 mb-8">
            {roles.map((_, idx) => (
              <span
                key={idx}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === activeIndex
                    ? "w-8 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                    : "w-1.5 bg-neutral-700"
                )}
              />
            ))}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed mb-12 px-4 font-sans font-normal">
            {/* Building intelligent systems at the intersection of full-stack development and machine learning. */}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full px-4">
            {/* LINCH AI Button — magnetic */}
            <motion.button
              ref={magLounge.ref as React.Ref<HTMLButtonElement>}
              onClick={triggerLounge}
              onMouseMove={magLounge.onMouseMove as unknown as React.MouseEventHandler<HTMLButtonElement>}
              onMouseLeave={magLounge.onMouseLeave}
              style={{ x: magLounge.springX, y: magLounge.springY }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center justify-center gap-2.5 px-8 py-3.5 bg-neutral-900/60 border border-cyan-500/30 text-cyan-400 rounded-full font-bold overflow-hidden transition-colors duration-300 hover:border-cyan-500 hover:text-white hover:shadow-[0_0_28px_rgba(6,182,212,0.55)] backdrop-blur-md text-sm tracking-wider w-full sm:w-auto"
            >
              {/* Animated background sweep on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/8 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2 justify-center font-comfortaa">
                LINCH AI
                <motion.span
                  className="flex items-center justify-center w-5 h-5 text-[10px] font-extrabold bg-cyan-500 text-black rounded-full shadow-inner"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  1
                </motion.span>
              </span>
            </motion.button>

            {/* Resume Button — magnetic */}
            <motion.a
              ref={magResume.ref as React.Ref<HTMLAnchorElement>}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={magResume.onMouseMove as unknown as React.MouseEventHandler<HTMLAnchorElement>}
              onMouseLeave={magResume.onMouseLeave}
              style={{ x: magResume.springX, y: magResume.springY }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center justify-center gap-2.5 px-8 py-3.5 bg-neutral-900/60 border border-cyan-500/30 text-cyan-400 rounded-full font-bold overflow-hidden transition-colors duration-300 hover:border-cyan-500 hover:text-white hover:shadow-[0_0_28px_rgba(6,182,212,0.55)] backdrop-blur-md text-sm tracking-wider w-full sm:w-auto"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/8 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2 justify-center">
                <FileText className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                Resume &amp; CV
              </span>
            </motion.a>


          </div>
        </motion.div>
      </section>

      {/* Other Sections */}
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <CredentialsSection />
      <ReachOutSection />
    </div>
  );
}
