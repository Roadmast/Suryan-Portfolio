"use client";

import { motion, Variants } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Calendar,
  ChevronRight,
  Zap,
  Star,
} from "lucide-react";

interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  type: string;
  current: boolean;
  color: string;
  glowColor: string;
  dotColor: string;
  description: string;
  achievements: string[];
  tech: string[];
}

const experiences: ExperienceEntry[] = [
  {
    company: "ALLCOGNIX AI",
    role: "Gen AI Engineer",
    period: "Apr 2025 – Present",
    duration: "Current",
    location: "Hyderabad, India",
    type: "Full-Time",
    current: true,
    color: "text-cyan-400",
    glowColor: "border-cyan-500/40 bg-cyan-950/10",
    dotColor: "bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]",
    description:
      "Developed AI SaaS platforms including personalized learning, customer support, social media management, content generation, and AI call center solutions.",
    achievements: [
      "Developed AI SaaS platforms including personalized learning, customer support, and AI call center solutions using Python, FastAPI, and LLMs",
      "Built a personalized learning platform with an AI tutor, quiz generator, lesson planner, and notes generator",
      "Designed a multi-channel AI customer support system that automated 70%+ of routine customer queries",
      "Designed and implemented central SSO solution for 6 applications, enabling seamless cross-platform access",
      "Led and mentored a team of 7 engineers, driving projects from development to production",
    ],
    tech: ["Python", "FastAPI", "LLMs", "LangGraph", "CrewAI", "PostgreSQL", "Docker"],
  },
  {
    company: "WebMobi360",
    role: "AI/ML Engineer Intern",
    period: "Sep 2024 – Jan 2025",
    duration: "5 Months",
    location: "Hyderabad, India",
    type: "Internship",
    current: false,
    color: "text-orange-400",
    glowColor: "border-orange-500/30 bg-orange-950/10",
    dotColor: "bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.6)]",
    description:
      "Implemented computer vision techniques for identity verification and developed deep learning models for behavior monitoring during interviews.",
    achievements: [
      "Implemented computer vision techniques achieving 98% accuracy in identity verification to ensure interview integrity",
      "Developed deep learning models for facial emotion detection and head pose estimation, improving behavior monitoring by 40%",
      "Integrated Speech-to-Text (STT) and Text-to-Speech (TTS) models for real-time analysis of interview responses",
      "Developed a dynamic question generation system using LLMs based on candidate performance",
      "Designed face authentication, Firebase backend, and LLM text generation for a social media AI app",
    ],
    tech: ["Python", "PyTorch", "OpenCV", "LLMs", "Firebase", "FastAPI", "Deep Learning"],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, mass: 1 },
  },
};

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col items-center justify-center p-4 py-24 scroll-mt-20 relative overflow-hidden select-none"
    >
      {/* Background glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl w-full flex flex-col gap-12 z-10"
      >
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            variants={itemVariants}
            className="text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase mb-3 bg-cyan-950/30 border border-cyan-500/20 px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.1)] animate-scale-in"
          >
            [ 02 // Career ]
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold font-comfortaa animate-text-shimmer mb-4"
          >
            Experience
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-gray-400 max-w-2xl font-sans"
          >
            3+ years of building production AI systems — from computer vision pipelines to enterprise-grade agentic platforms.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-cyan-500/60 via-orange-500/40 to-transparent hidden sm:block animate-line-draw origin-top" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              variants={itemVariants}
              className="relative flex gap-6 sm:gap-10 group"
            >
              {/* Timeline Dot */}
              <div className="relative flex flex-col items-center shrink-0 hidden sm:flex">
                <div
                  className={`w-3 h-3 rounded-full mt-8 z-10 transition-all duration-300 ${exp.dotColor}`}
                />
              </div>

              {/* Card */}
              <div
                className={`flex-1 mb-8 p-6 rounded-2xl border backdrop-blur-sm shadow-xl transition-all duration-300 will-change-transform card-lift ${exp.glowColor} hover:border-opacity-60 hover:shadow-2xl hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div className="flex flex-col gap-1">
                    {/* Company + Current badge */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`text-xl font-black font-comfortaa ${exp.color}`}>
                        {exp.company}
                      </span>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                    {/* Role */}
                    <span className="text-base font-semibold text-white flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-gray-500" />
                      {exp.role}
                    </span>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-col items-start sm:items-end gap-1.5 text-[11px] text-gray-500 shrink-0">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-400 font-semibold">
                      {exp.type} · {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-5 font-sans font-light">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="mb-5">
                  <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-3 block">
                    Key Achievements
                  </span>
                  <ul className="space-y-2">
                    {exp.achievements.map((ach, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-[12px] text-gray-300 leading-relaxed"
                      >
                        <ChevronRight
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${exp.color}`}
                        />
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2 block">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-neutral-950/60 border border-neutral-800/80 text-gray-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-all duration-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats Row */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: "3+", label: "Years Experience", icon: Star, color: "text-cyan-400" },
            { value: "2", label: "Companies", icon: Briefcase, color: "text-orange-400" },
            { value: "10+", label: "AI Projects Shipped", icon: Zap, color: "text-emerald-400" },
            { value: "15+", label: "Tech Stack", icon: ChevronRight, color: "text-purple-400" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                key={stat.label}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300 text-center group cursor-default relative overflow-hidden"
              >
                {/* Hover gradient backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <Icon className={`w-4 h-4 mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className={`text-2xl font-black font-comfortaa ${stat.color}`}>
                  {stat.value}
                </span>
                <span className="text-[11px] text-gray-500 mt-0.5 font-sans">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
