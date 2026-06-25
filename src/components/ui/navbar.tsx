"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Code2, User, Wrench, FolderGit2, Mail, Briefcase, GraduationCap } from "lucide-react";

const navItems = [
  { path: "#home", label: "Home", icon: <Code2 className="w-4 h-4" /> },
  { path: "#about", label: "About", icon: <User className="w-4 h-4" /> },
  { path: "#experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
  { path: "#education", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
  { path: "#skills", label: "Skills", icon: <Wrench className="w-4 h-4" /> },
  { path: "#projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" /> },
  { path: "#contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Setup Intersection Observer for scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center py-4 transition-all duration-300",
        scrolled ? "bg-black/50 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
    >
      <nav className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar px-4 max-w-7xl w-full justify-center">
        {navItems.map((item) => {
          const isActive = activeSection === item.path;
          return (
            <a
              key={item.path}
              href={item.path}
              className={cn(
                "relative flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                isActive ? "text-cyan-400" : "text-muted-foreground hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 rounded-full bg-cyan-950/30 border border-cyan-500/50 -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {item.icon}
              <span className="hidden md:inline">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </header>
  );
}
