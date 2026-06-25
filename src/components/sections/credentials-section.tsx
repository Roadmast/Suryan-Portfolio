"use client";

import { motion, Variants } from "framer-motion";
import {
  Award,
  ExternalLink,
  CheckCircle2,
  Trophy,
  BookOpen,
  Cpu,
} from "lucide-react";

interface Credential {
  title: string;
  issuer: string;
  year: string;
  category: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  verified: boolean;
  link?: string;
}

const credentials: Credential[] = [
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI · Coursera",
    year: "2023",
    category: "AI / ML",
    color: "text-cyan-400",
    icon: Cpu,
    verified: true,
    link: "#",
  },
  {
    title: "LangChain for LLM Application Development",
    issuer: "DeepLearning.AI",
    year: "2024",
    category: "GenAI",
    color: "text-emerald-400",
    icon: BookOpen,
    verified: true,
    link: "#",
  },
  {
    title: "Multi AI Agent Systems with CrewAI",
    issuer: "DeepLearning.AI",
    year: "2024",
    category: "Agentic AI",
    color: "text-purple-400",
    icon: Award,
    verified: true,
    link: "#",
  },
  {
    title: "Hugging Face SDXL Fine-Tuning",
    issuer: "Self-Published · 192K+ Visitors",
    year: "2023",
    category: "Generative AI",
    color: "text-orange-400",
    icon: Trophy,
    verified: true,
    link: "#",
  },
  {
    title: "FastAPI & Microservices Architecture",
    issuer: "Udemy",
    year: "2022",
    category: "Backend",
    color: "text-sky-400",
    icon: Cpu,
    verified: true,
    link: "#",
  },
  {
    title: "Docker & Kubernetes for DevOps",
    issuer: "Udemy",
    year: "2023",
    category: "DevOps",
    color: "text-rose-400",
    icon: CheckCircle2,
    verified: true,
    link: "#",
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, mass: 1 },
  },
};

export function CredentialsSection() {
  return (
    <section
      id="credentials"
      className="min-h-auto flex flex-col items-center justify-center p-4 py-24 scroll-mt-20 relative overflow-hidden select-none"
    >
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

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
            [ 05 // Credentials ]
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold font-comfortaa animate-text-shimmer mb-4"
          >
            Certifications
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-gray-400 max-w-xl font-sans"
          >
            Continuous learning in AI, backend architecture, and cloud infrastructure.
          </motion.p>
        </div>

        {/* Credentials Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {credentials.map((cred) => {
            const Icon = cred.icon;
            return (
              <motion.div
                key={cred.title}
                variants={itemVariants}
                className="group relative bg-neutral-900/40 border border-white/5 p-5 rounded-2xl backdrop-blur-md hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] transition-all duration-300 shadow-xl flex flex-col gap-3 overflow-hidden card-lift shine-sweep-on-hover"
              >
                {/* Corner gradient accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/8 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full" />

                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="w-9 h-9 rounded-lg bg-neutral-950/60 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-cyan-500/20 transition-all duration-300">
                    <Icon className={`w-4 h-4 ${cred.color}`} />
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto">
                    {cred.verified && (
                      <span className="flex items-center gap-1 text-[9px] font-bold tracking-wide text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Verified
                      </span>
                    )}
                    {cred.link && (
                      <a
                        href={cred.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded hover:text-cyan-400 text-gray-600 hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Category badge */}
                <span className={`text-[9px] font-extrabold tracking-widest uppercase ${cred.color}`}>
                  {cred.category}
                </span>

                {/* Title + Issuer */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                    {cred.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-sans">
                    {cred.issuer}
                  </p>
                </div>

                {/* Year */}
                <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-gray-600 font-semibold">
                    {cred.year}
                  </span>
                  <Award className="w-3 h-3 text-gray-700 group-hover:text-cyan-500/50 transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
