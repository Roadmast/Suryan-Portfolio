"use client";

import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { FileText, Code2, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { PythonIcon, DockerIcon, GitIcon, FastApiIcon, LangChainIcon, PostgreSqlIcon, RedisIcon, LangGraphIcon, CrewAiIcon, AiAgentsIcon } from "@/components/ui/tech-icons";

// Lazy load sections for better initial load performance
const AboutSection = lazy(() => import("@/components/sections/about-section").then(m => ({ default: m.AboutSection })));
const ExperienceSection = lazy(() => import("@/components/sections/experience-section").then(m => ({ default: m.ExperienceSection })));
const EducationSection = lazy(() => import("@/components/sections/education-section").then(m => ({ default: m.EducationSection })));
const SkillsSection = lazy(() => import("@/components/sections/skills-section").then(m => ({ default: m.SkillsSection })));
const ProjectsSection = lazy(() => import("@/components/sections/projects-section").then(m => ({ default: m.ProjectsSection })));
const CredentialsSection = lazy(() => import("@/components/sections/credentials-section").then(m => ({ default: m.CredentialsSection })));
const ReachOutSection = lazy(() => import("@/components/sections/reach-out-section").then(m => ({ default: m.ReachOutSection })));

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

// Magnetic button hook - optimized springs for better performance
function useMagneticHover(strength = 0.25) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Reduced stiffness for less CPU usage while maintaining responsiveness
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

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
        {/* Orbit Rings & Floating Tech Badges Wrapper - Desktop Only */}
        <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none md:scale-[0.85] lg:scale-100 origin-center select-none z-0">

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

          {/* Mobile-only core tech stack display (hidden on md and above) */}
          <div className="mt-14 w-full md:hidden flex flex-col items-center gap-3">
            <p className="text-[10px] font-bold tracking-[0.25em] text-cyan-400/90 uppercase font-comfortaa">
              Core Tech Stack
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-sm px-4">
              {orbitSkills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/50 border border-white/5 backdrop-blur-md"
                  >
                    <span className="w-3.5 h-3.5 shrink-0"><Icon /></span>
                    <span className="text-[10px] font-bold text-gray-300 font-sans tracking-wide">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Other Sections - Lazy loaded with Suspense */}
      <Suspense fallback={<div className="min-h-screen" />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen" />}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen" />}>
        <EducationSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen" />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen" />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen" />}>
        <CredentialsSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen" />}>
        <ReachOutSection />
      </Suspense>
    </div>
  );
}
