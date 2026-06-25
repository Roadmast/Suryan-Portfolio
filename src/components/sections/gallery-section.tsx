"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

export function GallerySection() {
  return (
    <section id="gallery" className="min-h-screen flex flex-col items-center justify-center p-4 py-24 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl w-full text-center"
      >
        <h2 className="text-4xl font-bold text-cyan-400 mb-8">Interactive Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <GalleryItem key={item} id={item} delay={index * 0.1} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function GalleryItem({ id, delay }: { id: number; delay: number }) {
  const [likes, setLikes] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white/5 border border-white/10 aspect-square rounded-xl flex flex-col items-center justify-center backdrop-blur-md relative overflow-hidden group"
    >
      <span className="font-medium text-gray-500">Image {id} Placeholder</span>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setLikes(l => l + 1)}
          className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/70 transition-colors"
        >
          <Heart className="w-4 h-4 text-red-500" />
          <span className="text-white font-medium">{likes}</span>
        </button>
      </div>
    </motion.div>
  );
}
