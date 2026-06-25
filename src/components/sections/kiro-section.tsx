"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, X, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function KiroSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      content: "Initializing LINCH Interface. How can I help you learn about Surya today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialRef = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isInitialRef.current) {
      isInitialRef.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleOpenLounge = () => setIsOpen(true);
    window.addEventListener("open-lounge", handleOpenLounge);
    return () => window.removeEventListener("open-lounge", handleOpenLounge);
  }, []);

  // Scroll to bottom when opening the chat
  useEffect(() => {
    if (isOpen) {
      // Small timeout to allow DOM to render
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/kiro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "[SYSTEM ERROR]: Unable to reach LINCH core. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Widget Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black flex items-center justify-center shadow-lg hover:shadow-cyan-500/25 cursor-pointer transition-all duration-300 pointer-events-auto hover:scale-110 active:scale-95 group"
        aria-label="Toggle Chat Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Floating Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[500px] bg-neutral-950/95 border border-white/10 rounded-2xl flex flex-col overflow-hidden backdrop-blur-md shadow-2xl z-50 pointer-events-auto"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col select-none">
                  <span className="text-sm font-bold text-white font-comfortaa">LINCH AI</span>
                  <span className="text-[10px] text-cyan-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 text-gray-400 hover:text-white transition-all cursor-pointer pointer-events-auto"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth no-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-7.5 h-7.5 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-blue-600" : "bg-cyan-950 border border-cyan-500/50"
                        }`}
                    >
                      {msg.role === "user" ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${msg.role === "user"
                        ? "bg-blue-600/20 text-blue-100 rounded-tr-sm"
                        : "bg-white/5 text-gray-200 border border-white/5 rounded-tl-sm"
                        }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap text-[12px]">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                    <div className="w-7.5 h-7.5 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center shrink-0">
                      <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-2.5 flex items-center">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/40">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask LINCH a question..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all text-xs text-white placeholder:text-gray-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-white/10 disabled:text-gray-500 text-black flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
