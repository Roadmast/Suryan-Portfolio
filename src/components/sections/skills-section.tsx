"use client";

import { motion } from "framer-motion";
import { TechGlobe } from "@/components/ui/tech-globe";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Inline High-Fidelity SVG Skill Logos
const PythonLogo = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M439.4 153.8c0-83.2-12-107-100.2-117.4-71.7-8.5-151.6-8.5-223.3 0C28.1 46.8 16 70.6 16 153.8c0 53.3 29.9 83.1 79 92.1v-34.9c0-50.6 37.1-91.8 82.9-91.8h82.9c13.7 0 24.8 11.1 24.8 24.8v82.9c0 45.8-37.1 82.9-82.9 82.9h-41.4V349h41.4c64.2 0 116.3-52.1 116.3-116.3v-41.4c0-13.7 11.1-24.8 24.8-24.8h41.4c29.1 0 53.6-24.5 53.6-53.6v-2.3zm-324.9-38.6c-11.5 0-20.7-9.3-20.7-20.7 0-11.5 9.3-20.7 20.7-20.7 11.5 0 20.7 9.3 20.7 20.7 0 11.4-9.2 20.7-20.7 20.7z" fill="#3776ab" />
    <path d="M8.6 358.2c0 83.2 12 107 100.2 117.4 71.7 8.5 151.6 8.5 223.3 0 87.9-10.4 100.2-34.2 100.2-117.4 0-53.3-29.9-83.1-79-92.1v34.9c0 50.6-37.1 91.8-82.9 91.8h-82.9c-13.7 0-24.8-11.1-24.8-24.8v-82.9c0-45.8 37.1-82.9 82.9-82.9h41.4V163h-41.4c-64.2 0-116.3 52.1-116.3 116.3v41.4c0 13.7-11.1 24.8-24.8 24.8H53.6c-29.1 0-53.6 24.5-53.6 53.6v2.3c.1-.1.1-.1.6-.1zm324.9 38.6c11.5 0 20.7 9.3 20.7 20.7 0 11.5-9.3 20.7-20.7 20.7-11.5 0-20.7-9.3-20.7-20.7 0-11.4 9.2-20.7 20.7-20.7z" fill="#ffe873" />
  </svg>
);

const SqlLogo = () => (
  <svg className="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="8" ry="3" fill="currentColor" fillOpacity="0.2" />
    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
  </svg>
);

const RagLogo = () => (
  <svg className="w-4 h-4 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <circle cx="9" cy="15" r="2" />
    <line x1="10.5" y1="16.5" x2="15" y2="20" />
  </svg>
);

const AgentsLogo = () => (
  <svg className="w-4 h-4 text-purple-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="10" rx="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16.01" />
    <line x1="16" y1="16" x2="16" y2="16.01" />
  </svg>
);

const MultiAgentLogo = () => (
  <svg className="w-4 h-4 text-orange-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
    <circle cx="5" cy="6" r="2" />
    <circle cx="19" cy="6" r="2" />
    <circle cx="12" cy="20" r="2" />
    <line x1="5" y1="6" x2="12" y2="12" />
    <line x1="19" y1="6" x2="12" y2="12" />
    <line x1="12" y1="20" x2="12" y2="12" />
  </svg>
);

const McpLogo = () => (
  <svg className="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 10h-1.25A3 3 0 0 0 14 7.25V6" />
    <path d="M6 10h1.25A3 3 0 0 1 10 12.75V14" />
    <rect x="8" y="2" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />
    <rect x="8" y="18" width="8" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

const PromptLogo = () => (
  <svg className="w-4 h-4 text-sky-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const ChatLogo = () => (
  <svg className="w-4 h-4 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

const FastApiLogo = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="6" fill="#009688" stroke="none" />
    <path d="M13 10V3L4 14h7v7l9-11h-7z" fill="white" stroke="none" />
  </svg>
);

const ApiLogo = () => (
  <svg className="w-4 h-4 text-rose-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="3 3" />
  </svg>
);

const MicroservicesLogo = () => (
  <svg className="w-4 h-4 text-yellow-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.2" />
    <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.2" />
    <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.2" />
    <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.2" />
    <line x1="10" y1="6.5" x2="14" y2="6.5" strokeDasharray="2 2" />
    <line x1="6.5" y1="10" x2="6.5" y2="14" strokeDasharray="2 2" />
  </svg>
);

const EventDrivenLogo = () => (
  <svg className="w-4 h-4 text-[#00E5FF] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

const DistributedLogo = () => (
  <svg className="w-4 h-4 text-teal-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" strokeDasharray="3 3" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
    <circle cx="12" cy="4" r="1.5" fill="currentColor" />
    <circle cx="12" cy="20" r="1.5" fill="currentColor" />
    <circle cx="4" cy="12" r="1.5" fill="currentColor" />
    <circle cx="20" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const PostgresLogo = () => (
  <svg className="w-4 h-4 text-[#336791] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="8" ry="3" fill="currentColor" fillOpacity="0.2" />
    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
  </svg>
);

const MongoLogo = () => (
  <svg className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8 6 6 10 6 14c0 3 2 5 6 8 4-3 6-5 6-8 0-4-2-8-6-12z" fill="currentColor" fillOpacity="0.2" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

const RedisLogo = () => (
  <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L1.5 5.2v13.6L12 24l10.5-5.2V5.2zm8.5 17.5l-8.5 4.3-8.5-4.3V7.7l8.5-4.3 8.5 4.3zM12 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
  </svg>
);

const VectorDbLogo = () => (
  <svg className="w-4 h-4 text-[#FF5722] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fillOpacity="0.2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const ObjectStorageLogo = () => (
  <svg className="w-4 h-4 text-cyan-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="18" r="1.5" fill="currentColor" />
  </svg>
);

const DataModelingLogo = () => (
  <svg className="w-4 h-4 text-indigo-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="6" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
    <rect x="15" y="16" width="6" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
    <path d="M9 5.5h3v13h3" />
    <line x1="12" y1="12" x2="15" y2="12" />
    <rect x="15" y="9.5" width="6" height="5" rx="1" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

const LangGraphLogo = () => (
  <svg className="w-4 h-4 text-[#FF6C37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
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

const CrewAiLogo = () => (
  <svg className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const LangChainLogo = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="6" fill="#1C3D5A" stroke="none" />
    <path d="M9 12h6m-6 3h6m-5-6h4" stroke="white" strokeLinecap="round" />
    <circle cx="12" cy="12" r="7" stroke="#38BDF8" strokeWidth="1.5" />
  </svg>
);

const LlamaIndexLogo = () => (
  <svg className="w-4 h-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

const RabbitMqLogo = () => (
  <svg className="w-4 h-4 text-[#FF6600] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M8 11h8" />
    <path d="M8 15h8" />
    <path d="M12 7h.01" />
  </svg>
);

const CeleryLogo = () => (
  <svg className="w-4 h-4 text-[#339933] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const TaskiqLogo = () => (
  <svg className="w-4 h-4 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const KeycloakLogo = () => (
  <svg className="w-4 h-4 text-sky-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="currentColor" fillOpacity="0.2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const SsoLogo = () => (
  <svg className="w-4 h-4 text-purple-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L21 2m0 0h-5m5 0v5" />
  </svg>
);

const OauthLogo = () => (
  <svg className="w-4 h-4 text-yellow-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

const JwtLogo = () => (
  <svg className="w-4 h-4 text-orange-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" fillOpacity="0.2" />
    <path d="M6 10h4M6 14h6" />
  </svg>
);

const DockerLogo = () => (
  <svg className="w-4 h-4 text-sky-400 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.983 11.078h2.119c.51 0 .926-.416.926-.925V8.22c0-.51-.416-.927-.926-.927h-2.119c-.51 0-.926.417-.926.927v1.933c0 .51.416.925.926.925M11.26 11.078h2.118c.51 0 .926-.416.926-.925V8.22c0-.51-.416-.927-.926-.927H11.26c-.51 0-.925.417-.925.927v1.933c0 .51.415.925.925.925M11.26 8.164h2.118c.51 0 .926-.416.926-.925V5.306c0-.51-.416-.926-.926-.926H11.26c-.51 0-.925.416-.925.926v1.933c0 .51.415.925.925.925M8.535 11.078h2.119c.51 0 .926-.416.926-.925V8.22c0-.51-.416-.927-.926-.927H8.535c-.51 0-.926.417-.926.927v1.933c0 .51.415.925.926.925M5.812 11.078h2.119c.51 0 .925-.416.925-.925V8.22c0-.51-.415-.927-.925-.927H5.812c-.51 0-.925.417-.925.927v1.933c0 .51.416.925.925.925M8.535 8.164h2.119c.51 0 .926-.416.926-.925V5.306c0-.51-.416-.926-.926-.926H8.535c-.51 0-.926.416-.926.926v1.933c0 .51.415.925.926.925M23.99 12.01c-.116-.275-.386-.445-.68-.445h-2.316a.625.625 0 0 0-.616.51c-.167.88-.675 1.597-1.426 2.023-.746.425-1.637.534-2.502.31a5.6 5.6 0 0 1-3.694-3.52c-.173-.49-.24-.984-.21-1.47a.64.64 0 0 0-.585-.68 18.23 18.23 0 0 0-3.513.064c-.496.06-.867.485-.867.986V12.18c0 .284.116.555.32.75l2.428 2.38a1.218 1.218 0 0 1 .373.916c-.05 1.632-.51 3.235-1.332 4.636a.612.612 0 0 0 .53.927 12.3 12.3 0 0 0 11.666-8.497 5.6 5.6 0 0 0 .393-2.15c.01-.284-.08-.564-.24-.783a.628.628 0 0 0-.648-.266c-.66.16-1.32.22-1.977.172-.016-.01-.035-.015-.052-.017H23.99z" />
  </svg>
);

const CicdLogo = () => (
  <svg className="w-4 h-4 text-[#00C853] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12c0 6-8 6-10 0s-10-6-10 0 8 6 10 0 10-6 10 0z" />
  </svg>
);

const LinuxLogo = () => (
  <svg className="w-4 h-4 text-gray-200 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const GitLogo = () => (
  <svg className="w-4 h-4 text-orange-500 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.546 10.93L13.07 4.54a2.24 2.24 0 0 0-3.13 0L3.52 10.93a2.24 2.24 0 0 0 0 3.14l10.48 6.41a2.24 2.24 0 0 0 3.13 0l6.41-10.48a2.24 2.24 0 0 0 0-3.07zM12.02 18.41a1.65 1.65 0 1 1 0-3.3 1.65 1.65 0 0 1 0 3.3zm2.39-4.88a1.65 1.65 0 0 1-2.39.81v-2.04a1.65 1.65 0 1 1 .83-1.42c0 .26-.06.5-.16.73l1.72 1.72v.2z" />
  </svg>
);

const GithubLogo = () => (
  <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const skillGroups = [
  {
    category: "Programming Languages",
    description: "Core coding languages for algorithms and analysis",
    skills: [
      { name: "Python", logo: PythonLogo },
      { name: "SQL", logo: SqlLogo }
    ]
  },
  {
    category: "Generative AI Technologies",
    description: "Architectures, agent templates and models contextual setups",
    skills: [
      { name: "RAG", logo: RagLogo },
      { name: "AI Agents", logo: AgentsLogo },
      { name: "Multi-Agent Systems", logo: MultiAgentLogo },
      { name: "MCP", logo: McpLogo },
      { name: "Prompt Engineering", logo: PromptLogo },
      { name: "Conversational AI", logo: ChatLogo }
    ]
  },
  {
    category: "Backend Development",
    description: "Robust services, microservices and APIs integrations",
    skills: [
      { name: "FastAPI", logo: FastApiLogo },
      { name: "REST APIs", logo: ApiLogo },
      { name: "Microservices", logo: MicroservicesLogo },
      { name: "Event-Driven", logo: EventDrivenLogo },
      { name: "Distributed Systems", logo: DistributedLogo }
    ]
  },
  {
    category: "Databases & Storage",
    description: "Relational, document, caching and multi-dim storage solutions",
    skills: [
      { name: "PostgreSQL", logo: PostgresLogo },
      { name: "MongoDB", logo: MongoLogo },
      { name: "Redis", logo: RedisLogo },
      { name: "Vector Databases", logo: VectorDbLogo },
      { name: "Object Storage", logo: ObjectStorageLogo },
      { name: "Data Modeling", logo: DataModelingLogo }
    ]
  },
  {
    category: "AI Orchestration",
    description: "Frameworks for LLM processing pipelines and flows control",
    skills: [
      { name: "LangGraph", logo: LangGraphLogo },
      { name: "CrewAI", logo: CrewAiLogo },
      { name: "LangChain", logo: LangChainLogo },
      { name: "LlamaIndex", logo: LlamaIndexLogo }
    ]
  },
  {
    category: "Messaging & Async Processing",
    description: "Asynchronous task workers and brokers structures",
    skills: [
      { name: "RabbitMQ", logo: RabbitMqLogo },
      { name: "Celery", logo: CeleryLogo },
      { name: "Taskiq", logo: TaskiqLogo }
    ]
  },
  {
    category: "Authentication & Security",
    description: "Identity and session federation and access control",
    skills: [
      { name: "Keycloak", logo: KeycloakLogo },
      { name: "SSO", logo: SsoLogo },
      { name: "OAuth 2.0", logo: OauthLogo },
      { name: "JWT", logo: JwtLogo }
    ]
  },
  {
    category: "Cloud & DevOps",
    description: "Virtualization, infrastructure configurations and actions",
    skills: [
      { name: "Docker", logo: DockerLogo },
      { name: "CI/CD", logo: CicdLogo },
      { name: "Linux", logo: LinuxLogo }
    ]
  },
  {
    category: "Version Control",
    description: "Source files storage layers and repositories control",
    skills: [
      { name: "Git", logo: GitLogo },
      { name: "GitHub", logo: GithubLogo }
    ]
  }
];

export function SkillsSection() {
  const [currentPage, setCurrentPage] = useState(0);

  // Chunk the skill groups into pages of 4 items each (forming a 2x2 grid layout on larger screens)
  const skillPages = [];
  const chunkSize = 4;
  for (let i = 0; i < skillGroups.length; i += chunkSize) {
    skillPages.push(skillGroups.slice(i, i + chunkSize));
  }

  // Auto-scroll every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % skillPages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [skillPages.length]);

  return (
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center p-4 py-24 scroll-mt-20 relative overflow-hidden w-full max-w-7xl mx-auto">
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16 max-w-2xl"
      >
        <h2 className="text-4xl md:text-5xl font-black tracking-wider text-cyan-400 uppercase mb-4 animate-text-shimmer">
          Technical Arsenal
        </h2>
        <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
        <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
          An interactive visualization of my backend architecture, Generative AI engineering, and distributed systems.
        </p>
      </motion.div>

      {/* Main Grid: 2 Columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Column: Tech Globe */}
        <motion.div
          className="lg:col-span-5 flex items-center justify-center relative min-h-[400px] w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Subtle surrounding glow behind globe */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px] -z-10" />
          <TechGlobe size={420} className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px]" />
        </motion.div>

        {/* Right Column: Grouped Skill Categories (2x2 Grid Carousel) */}
        <div className="lg:col-span-7 flex flex-col w-full overflow-hidden">
          {/* Slider controls header */}
          <div className="flex justify-between items-center mb-5">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
              Page {currentPage + 1} of {skillPages.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => (prev > 0 ? prev - 1 : skillPages.length - 1))}
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => (prev + 1) % skillPages.length)}
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Viewport */}
          <div className="overflow-hidden w-full relative">
            <motion.div
              className="flex w-full flex-nowrap"
              animate={{ x: `-${currentPage * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {skillPages.map((page, pageIdx) => (
                <div
                  key={pageIdx}
                  className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {page.map((group) => (
                    <motion.div
                      key={group.category}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group flex flex-col p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 backdrop-blur-md shadow-xl hover:border-cyan-500/40 hover:bg-neutral-900/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-colors duration-300 min-h-[165px] card-lift"
                    >
                      {/* Category Header */}
                      <h3 className="text-sm font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors mb-1 tracking-wide uppercase">
                        {group.category}
                      </h3>
                      <p className="text-[10px] text-neutral-500 leading-snug mb-5 font-normal h-8 overflow-hidden line-clamp-2">
                        {group.description}
                      </p>

                      {/* Skills Grid */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {group.skills.map((skill) => {
                          const Logo = skill.logo;
                          return (
                            <motion.div
                              key={skill.name}
                              whileHover={{ scale: 1.06, y: -2 }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-neutral-950/50 border border-neutral-800/60 hover:border-cyan-500/30 hover:bg-black/60 shadow-sm transition-all duration-200 cursor-default"
                            >
                              <Logo />
                              <span className="text-[10px] text-neutral-300 font-semibold tracking-wide select-none">
                                {skill.name}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {skillPages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === currentPage
                    ? "w-6 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                    : "w-1.5 bg-neutral-700 hover:bg-neutral-500"
                )}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
