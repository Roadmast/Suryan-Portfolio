"use client";

import { motion, Variants } from "framer-motion";
import {
  Bot,
  Phone,
  Database,
  Server,
  Globe,
  ShieldCheck,
  Compass,
  Cpu,
  Layers,
  Network,
  Zap,
  Briefcase,
  Code2,
  CheckCircle2,
} from "lucide-react";

const stats = [
  { value: "3+", label: "Years Experience", icon: Briefcase, color: "text-cyan-400" },
  { value: "2", label: "Companies", icon: CheckCircle2, color: "text-orange-400" },
  { value: "10+", label: "AI Projects", icon: Zap, color: "text-emerald-400" },
  { value: "15+", label: "Technologies", icon: Code2, color: "text-purple-400" },
];

export function AboutSection() {
  const capabilities = [
    {
      icon: Bot,
      text: "Design and build AI Agents using modern agent frameworks and LLMs",
      title: "Agentic Engineering"
    },
    {
      icon: Phone,
      text: "Develop Voice AI solutions using LiveKit, SIP, and telephony integrations",
      title: "Voice AI Systems"
    },
    {
      icon: Database,
      text: "Build RAG systems with vector databases, memory layers, and knowledge retrieval",
      title: "RAG & Knowledge Bases"
    },
    {
      icon: Server,
      text: "Architect scalable backend systems with FastAPI, PostgreSQL, Redis, RabbitMQ, and Docker",
      title: "Scalable Backends"
    },
    {
      icon: Globe,
      text: "Integrate AI across channels including Web, Email, WhatsApp, Voice, and Chat",
      title: "Omnichannel AI"
    },
    {
      icon: ShieldCheck,
      text: "Research and implement enterprise-grade AI governance, memory, and personalization systems",
      title: "AI Governance & Memory"
    }
  ];

  const focusAreas = [
    "Agentic AI Systems",
    "Voice AI & Contact Center Automation",
    "Multi-Agent Orchestration",
    "Retrieval-Augmented Generation (RAG)",
    "Enterprise AI Infrastructure",
    "LLM Inference & Self-Hosted AI",
    "AI Developer Platforms"
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  };

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center p-4 py-24 scroll-mt-20 relative overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl w-full flex flex-col gap-12 z-10"
      >
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            variants={itemVariants}
            className="text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase mb-3 bg-cyan-950/30 border border-cyan-500/20 px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.1)] animate-scale-in"
          >
            [ 01 // Overview ]
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold font-comfortaa animate-text-shimmer mb-4"
          >
            About Me
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-gray-400 max-w-2xl font-sans"
          >
            GenAI Engineer | AI Systems Architect | Applied AI Researcher
          </motion.p>

          {/* Open to Work Badge */}
          <motion.div
            variants={itemVariants}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider shadow-[0_0_16px_rgba(16,185,129,0.12)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Open to Opportunities
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                key={stat.label}
                className="flex flex-col items-center justify-center p-5 rounded-2xl bg-neutral-900/40 border border-white/5 backdrop-blur-md hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 group cursor-default relative overflow-hidden"
              >
                {/* Hover gradient backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <Icon className={`w-4 h-4 mb-2.5 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className={`text-2xl sm:text-3xl font-black font-comfortaa ${stat.color}`}>
                  {stat.value}
                </span>
                <span className="text-[11px] text-gray-500 mt-1 font-sans text-center">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Bio & Mission */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Bio Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="bg-neutral-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300 shadow-xl group card-lift"
            >
              <h3 className="text-xl font-bold font-comfortaa text-white mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                Surya Narayana Siddamurthi
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                I build production-grade AI systems that combine Large Language Models, Voice AI,
                Retrieval-Augmented Generation (RAG), Agentic Workflows, and Enterprise Infrastructure.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                My expertise spans the complete AI stack—from designing FastAPI backends and real-time
                communication systems to deploying multi-agent architectures powered by modern LLMs.
                I specialize in building AI-powered customer support platforms, voice automation systems,
                enterprise knowledge assistants, and intelligent agent ecosystems.
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-950/20 via-neutral-950/40 to-neutral-950/60 p-6 shadow-2xl group card-lift"
            >
              {/* Decorative side accent lines */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 via-amber-500 to-transparent" />

              <h4 className="text-sm font-bold tracking-widest text-orange-400 uppercase mb-2 flex items-center gap-2 font-comfortaa">
                <Compass className="w-4 h-4 text-orange-400 animate-spin-slow" />
                The Mission
              </h4>
              <p className="text-gray-300 text-sm italic font-light leading-relaxed">
                &ldquo;Building AI systems that move beyond simple chatbots—creating autonomous,
                reliable, and scalable AI agents capable of solving real business problems at enterprise scale.&rdquo;
              </p>
            </motion.div>
          </div>

          {/* Right Column: Capabilities & Focus */}
          <div className="lg:col-span-8 flex flex-col md:flex-row gap-6 items-stretch">

            {/* What I Do Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="w-full md:w-[100%] bg-neutral-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300 shadow-xl flex flex-col card-lift"
            >
              <h3 className="text-xl font-bold font-comfortaa text-white mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                What I Do
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4 flex-grow">
                {capabilities.map((cap, index) => {
                  const CapIcon = cap.icon;
                  return (
                    <div
                      key={index}
                      className="flex gap-3.5 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-200 group"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-cyan-950/40 border border-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/30 group-hover:bg-cyan-950/60 transition-all duration-300">
                        <CapIcon className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-gray-200 group-hover:text-cyan-400 transition-colors font-comfortaa">
                          {cap.title}
                        </span>
                        <span className="text-[11px] text-gray-400 leading-relaxed font-sans font-light">
                          {cap.text}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Current Focus Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="w-full md:w-[40%] bg-neutral-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300 shadow-xl flex flex-col card-lift"
            >
              <h3 className="text-xl font-bold font-comfortaa text-white mb-5 flex items-center gap-2">
                <Network className="w-5 h-5 text-cyan-400" />
                Current Focus Areas
              </h3>
              <div className="flex flex-wrap gap-2.5 content-start flex-grow">
                {focusAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold text-gray-300 bg-neutral-950/60 border border-neutral-800/80 px-3.5 py-2 rounded-xl hover:border-cyan-500/30 hover:text-cyan-400 hover:shadow-[0_0_12px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-default flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

