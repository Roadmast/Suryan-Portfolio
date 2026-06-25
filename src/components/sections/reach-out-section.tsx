"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  ClipboardList,
  Brain,
  Code2,
  Search,
  FlaskConical,
  BookOpen,
  Mail,
  Activity,
  Bot,
  Send,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Inline SVG components for Github and Linkedin
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

interface WorkflowStep {
  name: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glowColor: string;
  desc: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    name: "IDEA",
    label: "Idea",
    icon: Lightbulb,
    color: "text-amber-400",
    glowColor: "shadow-amber-400/20 border-amber-500/40 bg-[#1e150c]",
    desc: "Brainstorming innovative system architectures and design approaches.",
  },
  {
    name: "PLAN",
    label: "Plan",
    icon: ClipboardList,
    color: "text-orange-400",
    glowColor: "shadow-orange-400/20 border-orange-500/40 bg-[#1e1108]",
    desc: "Defining project specifications, stack selection, and database structures.",
  },
  {
    name: "AI HELP",
    label: "AI Help",
    icon: Brain,
    color: "text-purple-400",
    glowColor: "shadow-purple-400/20 border-purple-500/40 bg-[#140a1e]",
    desc: "Co-piloting software engineering tasks and ML architectures using advanced LLMs.",
  },
  {
    name: "CODE",
    label: "Code",
    icon: Code2,
    color: "text-cyan-400",
    glowColor: "shadow-cyan-400/45 border-cyan-400/80 bg-[#08151a] ring-2 ring-cyan-500/15",
    desc: "Developing robust, clean, and type-safe frontend and backend codebases.",
  },
  {
    name: "REVIEW",
    label: "Review",
    icon: Search,
    color: "text-pink-400",
    glowColor: "shadow-pink-400/20 border-pink-500/40 bg-[#1e0812]",
    desc: "Performing static analysis, peer reviews, and performance optimizations.",
  },
  {
    name: "TEST",
    label: "Test",
    icon: FlaskConical,
    color: "text-rose-500",
    glowColor: "shadow-rose-500/20 border-rose-500/40 bg-[#1e0808]",
    desc: "Executing unit testing, integration sweeps, and system benchmark scenarios.",
  },
  {
    name: "LEARN",
    label: "Learn",
    icon: BookOpen,
    color: "text-emerald-400",
    glowColor: "shadow-emerald-400/20 border-emerald-500/40 bg-[#081a0e]",
    desc: "Evaluating analytics feedback, iterating designs, and researching new technologies.",
  },
];

export function ReachOutSection() {
  const [activeIndex, setActiveIndex] = useState<number>(3); // Default to CODE
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const triggerLounge = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-lounge"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="w-full flex flex-col items-center justify-center px-4 pt-24 pb-12 relative overflow-hidden select-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl flex flex-col items-center z-10 relative"
      >
        {/* Section Headers */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-neutral-500 tracking-[0.25em] uppercase block mb-3">
            SKILLS · WORKFLOW · IDENTITY
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight font-sans animate-text-shimmer mb-3">
            Get In Touch
          </h2>
          <p className="text-sm text-gray-500 mt-3 max-w-lg mx-auto font-sans">
            Open to full-time roles, freelance projects, and AI consulting. Let&apos;s build something remarkable together.
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full bg-[#0a0a0c]/40 border border-white/10 p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-2xl shadow-black/50 transition-all duration-300 hover:border-cyan-500/20 card-lift">
          {/* Glow nodes */}
          <div className="absolute -right-20 -top-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Workflow Header */}
          <div className="mb-6">
            <span className="text-[10px] font-bold text-neutral-500 tracking-[0.2em] uppercase">
              Workflow
            </span>
          </div>

          {/* Workflow Row */}
          <div className="w-full overflow-x-auto no-scrollbar pb-4 -mb-4">
            <div className="min-w-[720px] md:min-w-0 flex justify-between items-center relative py-6 px-4">
              {/* Connecting Line Segments */}
              {Array.from({ length: 6 }).map((_, idx) => {
                const isCompleted = idx < activeIndex;
                const gradients = [
                  "from-amber-400 to-orange-400",
                  "from-orange-400 to-purple-400",
                  "from-purple-400 to-cyan-400",
                  "from-cyan-400 to-pink-400",
                  "from-pink-400 to-rose-500",
                  "from-rose-500 to-emerald-400",
                ];
                const glows = [
                  "shadow-[0_0_8px_rgba(251,191,36,0.5)]",
                  "shadow-[0_0_8px_rgba(251,146,60,0.5)]",
                  "shadow-[0_0_8px_rgba(192,132,252,0.5)]",
                  "shadow-[0_0_8px_rgba(34,211,238,0.5)]",
                  "shadow-[0_0_8px_rgba(244,114,182,0.5)]",
                  "shadow-[0_0_8px_rgba(244,63,94,0.5)]",
                ];
                return (
                  <div
                    key={idx}
                    className={cn(
                      "absolute top-[52px] h-[1.5px] bg-gradient-to-r -z-10 transition-all duration-500",
                      gradients[idx],
                      isCompleted ? cn("opacity-100 h-[2px]", glows[idx]) : "opacity-20"
                    )}
                    style={{ left: `${idx * 14.28 + 7.14}%`, width: "14.28%" }}
                  />
                );
              })}

              {workflowSteps.map((step, idx) => {
                const isActive = idx === activeIndex;
                const Icon = step.icon;
                return (
                  <div
                    key={step.name}
                    className="flex flex-col items-center flex-1 cursor-pointer group"
                    onClick={() => setActiveIndex(idx)}
                  >
                    <motion.div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 relative z-10 ${
                        isActive
                          ? `border ${step.glowColor} shadow-[0_0_20px_rgba(6,182,212,0.15)]`
                          : "bg-[#09090b] border border-neutral-800 hover:border-neutral-700 hover:bg-[#121215]"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isActive ? step.color : "text-neutral-500 group-hover:text-neutral-300"
                        }`}
                      />
                    </motion.div>
                    <span
                      className={`text-[9px] md:text-[10px] font-bold tracking-wider mt-3 select-none text-center transition-colors duration-300 uppercase ${
                        isActive ? "text-cyan-400 font-extrabold" : "text-neutral-500 group-hover:text-neutral-400"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-[11px] text-neutral-500 mt-6 text-center font-sans leading-relaxed"
            >
              {workflowSteps[activeIndex]?.desc}
            </motion.p>
          </AnimatePresence>

          <div className="w-full h-[1px] bg-white/5 my-8" />

          {/* Two-column layout: Contact Form + Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <span className="text-[10px] font-bold text-neutral-500 tracking-[0.25em] uppercase mb-5 block">
                Send a Message
              </span>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-3 py-8 text-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  <p className="text-sm font-bold text-white">Message sent!</p>
                  <p className="text-xs text-gray-500">I&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3" suppressHydrationWarning>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all text-xs text-white placeholder:text-gray-600"
                    required
                    suppressHydrationWarning
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all text-xs text-white placeholder:text-gray-600"
                    required
                    suppressHydrationWarning
                  />
                  <textarea
                    placeholder="Your message..."
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all text-xs text-white placeholder:text-gray-600 resize-none"
                    required
                    suppressHydrationWarning
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-wider hover:bg-cyan-500/20 hover:border-cyan-400/60 hover:shadow-[0_0_16px_rgba(6,182,212,0.25)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {sending ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Social / Direct Links */}
            <div>
              <span className="text-[10px] font-bold text-neutral-500 tracking-[0.25em] uppercase mb-5 block">
                Reach Directly
              </span>
              <div className="flex flex-col gap-3">
                {/* Mail */}
                <a
                  href="mailto:surya@gmail.com"
                  className="flex items-center gap-3 px-5 py-3 bg-gradient-to-b from-[#2a1212] to-[#140808] border border-red-900/60 text-white rounded-xl font-bold hover:from-[#3a1a1a] hover:to-[#1c0c0c] hover:border-red-500/60 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 text-xs tracking-wider cursor-pointer shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] group card-lift"
                >
                  <Mail className="w-4 h-4 text-red-500 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 font-normal">Email</span>
                    <span>surya@gmail.com</span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/surya-narayana-siddamurthi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 bg-gradient-to-b from-[#202023] to-[#121214] border border-zinc-800 text-white rounded-xl font-bold hover:from-[#2a2a2e] hover:to-[#18181a] hover:border-zinc-600 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 text-xs tracking-wider cursor-pointer shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] card-lift"
                >
                  <GithubIcon className="w-4 h-4 text-zinc-300 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 font-normal">GitHub</span>
                    <span>View Projects</span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/surya-narayana-siddamurthi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 bg-gradient-to-b from-[#0f1b2d] to-[#080d16] border border-blue-950 text-[#3b82f6] rounded-xl font-bold hover:from-[#162740] hover:to-[#0c1422] hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 text-xs tracking-wider cursor-pointer shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] card-lift"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#3b82f6] shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 font-normal">LinkedIn</span>
                    <span>Connect</span>
                  </div>
                </a>

                {/* WhatsApp / Phone (optional) */}
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 bg-gradient-to-b from-[#0a1f0f] to-[#051008] border border-green-900/60 text-green-400 rounded-xl font-bold hover:from-[#132a17] hover:to-[#081510] hover:border-green-500/60 hover:shadow-[0_0_20px_rgba(34,197,94,0.25)] transition-all duration-300 text-xs tracking-wider cursor-pointer shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] card-lift"
                >
                  <Phone className="w-4 h-4 text-green-500 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 font-normal">WhatsApp</span>
                    <span>Message Me</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer */}
        <footer className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 pt-8 border-t border-white/5 text-neutral-500 text-xs font-sans">
          {/* Left Side Status */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-semibold tracking-widest select-none uppercase">
              © 2026 Surya Narayana Siddamurthi
            </span>
          </div>

          {/* Right Side Control Pills */}
          <div className="flex items-center gap-3">
            <button
              onClick={triggerLounge}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-black/50 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-950/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all duration-300 font-bold text-[10px] tracking-wider cursor-pointer font-comfortaa"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>LINCH AI</span>
            </button>
          </div>
        </footer>
      </motion.div>
    </section>
  );
}
