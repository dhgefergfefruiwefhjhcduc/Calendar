import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, getIndianSeason } from '../utils/dateUtils';

const SEASONAL_DATA = {
  'Winter': { 
    label: 'Winter (Hemant)', 
    img: '/images/winter.png',
    desc: 'Cozy mornings and evening mists.'
  },
  'Spring (Vasant)': { 
    label: 'Spring (Vasant)', 
    img: '/images/spring.png',
    desc: 'The season of blooming colors.'
  },
  'Summer': { 
    label: 'Summer (Grishma)', 
    img: '/images/summer.png',
    desc: 'Golden sun and tropical vibes.'
  },
  'Monsoon': { 
    label: 'Monsoon (Varsha)', 
    img: '/images/monsoon.png',
    desc: 'Verdant landscapes and monsoon petrichor.'
  },
  'Autumn (Sharad)': { 
    label: 'Autumn (Sharad)', 
    img: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&q=80&w=1200',
    desc: 'Clear skies and festive spirits.'
  },
};

const HeroSection = ({ currentMonth }) => {
  const season = getIndianSeason(currentMonth);
  const data = SEASONAL_DATA[season.label] || SEASONAL_DATA['Winter'];

  return (
    <div className="w-full h-full glass-panel rounded-[2rem] overflow-hidden relative group border-white/20 shadow-premium">
      {/* High-Visibility Panoramic Background */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={data.img}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img 
            src={data.img} 
            alt={season.label} 
            className="w-full h-full object-cover opacity-90 transition-transform duration-[5s] group-hover:scale-105"
          />
          {/* Subtle Bottom Gradient for Text Legibility only */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay - Compressed for vertical space */}
      <div className="absolute inset-0 p-4 md:p-8 lg:p-10 flex items-center justify-between z-10">
        <div className="flex-1 max-w-2xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white font-black text-[10px] tracking-[0.3em] uppercase">
              {data.label}
            </span>
            <h1 className="mt-4 text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none drop-shadow-lg">
              Life in <span className="text-primary-400">{format(currentMonth, 'MMMM')}</span>
            </h1>
            <p className="mt-3 text-sm text-white/80 font-bold italic max-w-sm drop-shadow-md">
              {data.desc}
            </p>
          </motion.div>
        </div>

        {/* Brand/Year Badge - High Contrast */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden md:flex flex-col items-end text-right"
        >
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-xl mb-3">
             <span className="text-black font-black text-2xl italic">W</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Premium Edition</span>
          <span className="text-3xl font-black text-white tracking-tighter italic">{format(currentMonth, 'yyyy')}</span>
        </motion.div>
      </div>

      {/* Glass Gloss */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30" />
    </div>
  );
};

export default HeroSection;
