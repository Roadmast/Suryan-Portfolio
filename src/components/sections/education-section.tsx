"use client";

import { motion, Variants } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Award,
  MapPin,
  Calendar,
} from "lucide-react";

interface EducationEntry {
  degree: string;
  field: string;
  institution: string;
  period: string;
  grade?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  accentBorder: string;
  accentGlow: string;
}

const educationData: EducationEntry[] = [
  {
    degree: "Bachelor of Technology",
    field: "AI & Data Science (AI&DS)",
    institution: "NBKRIST",
    period: "2020 – 2024",
    grade: "B.Tech",
    icon: GraduationCap,
    color: "text-cyan-400",
    accentBorder: "border-cyan-500/30",
    accentGlow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]",
  },
  {
    degree: "Intermediate (MPC)",
    field: "Mathematics, Physics & Chemistry",
    institution: "Sri Chaitanya Junior College",
    period: "2018 – 2020",
    grade: "12th Grade",
    icon: BookOpen,
    color: "text-orange-400",
    accentBorder: "border-orange-500/20",
    accentGlow: "hover:shadow-[0_0_20px_rgba(251,146,60,0.1)]",
  },
  {
    degree: "10th Class (SSC)",
    field: "Secondary School Certificate",
    institution: "SPGR High School",
    period: "Until 2018",
    grade: "10th Grade",
    icon: Award,
    color: "text-emerald-400",
    accentBorder: "border-emerald-500/20",
    accentGlow: "hover:shadow-[0_0_20px_rgba(52,211,153,0.1)]",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, mass: 1 },
  },
};

export function EducationSection() {
  return (
    <section
      id="education"
      className="flex flex-col items-center justify-center p-4 py-20 scroll-mt-20 relative overflow-hidden select-none"
    >
      {/* Background glows */}
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-cyan-500/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[250px] h-[250px] bg-emerald-500/4 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-5xl w-full flex flex-col gap-10 z-10"
      >
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            variants={itemVariants}
            className="text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase mb-3 bg-cyan-950/30 border border-cyan-500/20 px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.1)] animate-scale-in"
          >
            [ 03 // Education ]
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold font-comfortaa animate-text-shimmer mb-3"
          >
            Academic Background
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-400 max-w-xl font-sans"
          >
            A strong foundation in AI, mathematics, and science built through formal education.
          </motion.p>
        </div>

        {/* Education Cards — horizontal row on large screens */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {educationData.map((edu, idx) => {
            const Icon = edu.icon;
            return (
              <motion.div
                key={edu.degree}
                variants={itemVariants}
                className={`group relative flex flex-col gap-4 p-6 rounded-2xl bg-neutral-900/40 border ${edu.accentBorder} backdrop-blur-sm shadow-xl ${edu.accentGlow} card-lift shine-sweep-on-hover overflow-hidden`}
              >
                {/* Top row accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30 ${edu.color}`}
                />

                {/* Step badge */}
                <div className="flex items-start justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center ${edu.accentBorder} bg-neutral-950/60 group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className={`w-4.5 h-4.5 ${edu.color}`} />
                  </div>
                  <span
                    className={`text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full border ${edu.accentBorder} ${edu.color} bg-neutral-950/40`}
                  >
                    {edu.grade}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5">
                  <h3
                    className={`text-base font-black font-comfortaa ${edu.color} leading-tight`}
                  >
                    {edu.degree}
                  </h3>
                  <p className="text-[12px] text-gray-300 font-medium">
                    {edu.field}
                  </p>
                </div>

                {/* Institution & Period */}
                <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-1.5">
                  <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <MapPin className="w-3 h-3 shrink-0 text-gray-600" />
                    {edu.institution}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <Calendar className="w-3 h-3 shrink-0 text-gray-600" />
                    {edu.period}
                  </span>
                </div>

                {/* Decorative index number */}
                <div className="absolute bottom-4 right-5 text-[48px] font-black text-white/[0.025] select-none pointer-events-none leading-none font-comfortaa">
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
