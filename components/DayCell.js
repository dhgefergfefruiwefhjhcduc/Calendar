import React from 'react';
import { motion } from 'framer-motion';
import { 
  isSameDay, 
  isSameMonth, 
  isToday, 
  isWeekend, 
  format 
} from '../utils/dateUtils';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

/**
 * Premium Day Card Component
 */
const DayCell = ({ 
  date, 
  currentMonth, 
  selectionRange, 
  activeDate, // Track the most recently clicked date
  onClick, 
  hasNote, 
  holiday,
  index 
}) => {
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isSelectedStart = selectionRange.start && isSameDay(date, selectionRange.start);
  const isSelectedEnd = selectionRange.end && isSameDay(date, selectionRange.end);
  const isActive = activeDate && isSameDay(date, activeDate);
  
  // Refined Range Logic: Subtler Highlight
  const isInRange = selectionRange.start && selectionRange.end && 
                   date >= selectionRange.start && date <= selectionRange.end;
  
  const today = isToday(date);
  const weekend = isWeekend(date);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: index * 0.005, 
        duration: 0.4,
        type: "spring",
        stiffness: 260,
        damping: 20 
      }}
      className="p-1 w-full h-full"
    >
      <motion.button
        whileHover={{ 
          scale: 1.05, 
          y: -4,
          boxShadow: "0 15px 30px rgba(0,0,0,0.4)" 
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onClick(date)}
        className={cn(
          "relative w-full h-full rounded-2xl flex flex-col items-center justify-center transition-all duration-300 overflow-hidden",
          "glass-card group outline-none border border-transparent",
          !isCurrentMonth && "opacity-20 pointer-events-none scale-95",
          isCurrentMonth && "opacity-100",
          weekend && isCurrentMonth && "bg-white/[0.02]",
          
          // Subtler Range Highlight
          isInRange && !isSelectedStart && !isSelectedEnd && "bg-primary-500/10 ring-1 ring-primary-500/20",
          
          // Selection States
          isSelectedStart && "bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-xl shadow-indigo-500/30 z-20",
          isSelectedEnd && "bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-xl shadow-indigo-500/30 z-20",
          
          // Active Focus State (The single most recently clicked date)
          isActive && !isSelectedStart && !isSelectedEnd && "ring-2 ring-primary-400 bg-white/[0.05]"
        )}
      >
        {/* Background Decorative Layer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/5 to-transparent pointer-events-none transition-opacity" />

        {/* Date Number */}
        <span className={cn(
          "text-xl md:text-2xl font-black transition-all",
          today && !isSelectedStart && !isSelectedEnd && "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]",
          (isSelectedStart || isSelectedEnd) ? "text-white text-2xl md:text-3xl" : "text-white/80",
          isActive && "text-white"
        )}>
          {format(date, 'd')}
        </span>

        {/* Indicators */}
        <div className="absolute bottom-1.5 md:bottom-2.5 flex gap-0.5 md:gap-1">
          {hasNote && (
            <motion.div 
              layoutId={`note-${date.getTime()}`}
              className={cn(
                "w-1 md:w-1.5 h-1 md:h-1.5 rounded-full",
                isSelectedStart || isSelectedEnd ? "bg-white" : "bg-primary-400"
              )} 
            />
          )}
          {holiday && (
            <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-pink-400" title={holiday} />
          )}
        </div>

        {/* Today Indicator */}
        {today && !isSelectedStart && !isSelectedEnd && (
          <div className="absolute top-1.5 md:top-2.5 right-1.5 md:right-2.5 w-1 md:w-1.5 h-1 md:h-1.5 bg-amber-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
        )}
      </motion.button>
    </motion.div>
  );
};

export default DayCell;
