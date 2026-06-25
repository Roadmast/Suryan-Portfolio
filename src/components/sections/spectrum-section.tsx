"use client";

import { motion } from "framer-motion";

export function SpectrumSection() {
  return (
    <section id="spectrum" className="min-h-screen flex flex-col items-center justify-center p-4 py-24 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl w-full text-center"
      >
        <h2 className="text-4xl font-bold text-cyan-400 mb-8">Spectrum Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col items-center justify-center min-h-[200px] backdrop-blur-md"
          >
            <h3 className="text-xl font-bold text-gray-200 mb-2">Live Visitors</h3>
            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">1</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col items-center justify-center min-h-[200px] backdrop-blur-md"
          >
            <h3 className="text-xl font-bold text-gray-200 mb-2">Top Country</h3>
            <p className="text-3xl font-bold text-cyan-400">United States</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
