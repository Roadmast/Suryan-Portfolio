"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function VisitorLounge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: number; user: string; text: string }[]>([
    { id: 1, user: "Spider-Man", text: "Whoa, this portfolio is awesome!" },
    { id: 2, user: "Batman", text: "Needs more dark mode." }
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleOpenLounge = () => setIsOpen(true);
    window.addEventListener("open-lounge", handleOpenLounge);
    return () => window.removeEventListener("open-lounge", handleOpenLounge);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), user: "Guest", text: input }]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-cyan-500 rounded-full flex items-center justify-center text-black shadow-lg shadow-cyan-500/20 hover:scale-110 transition-transform z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="font-bold text-cyan-400">Visitor Lounge</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 no-scrollbar">
              {messages.map(msg => (
                <div key={msg.id} className="bg-white/5 border border-white/5 rounded-lg p-3">
                  <span className="text-xs font-bold text-cyan-500 block mb-1">{msg.user}</span>
                  <span className="text-sm text-gray-200">{msg.text}</span>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-white/10 bg-black/50">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Say hello..."
                  className="flex-1 bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
                />
                <button type="submit" className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-black shrink-0 hover:bg-cyan-400">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
