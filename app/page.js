'use client';

import React, { useState, useEffect } from 'react';
import useCalendar from '../hooks/useCalendar';
import useNotes from '../hooks/useNotes';
import CalendarGrid from '../components/CalendarGrid';
import HeroSection from '../components/HeroSection';
import NotesPanel from '../components/NotesPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { getIndianSeason } from '../utils/dateUtils';

// Background images for India seasons
const BACKDROP_IMAGES = {
  'Winter': '/images/winter.png',
  'Spring (Vasant)': '/images/spring.png',
  'Summer': '/images/summer.png',
  'Monsoon': '/images/monsoon.png',
  'Autumn (Sharad)': '/images/autumn.png',
};

export default function Home() {
  const {
    currentMonth,
    selectionRange,
    activeDate,
    nextMonth,
    prevMonth,
    goToToday,
    handleDateClick,
    clearSelection,
    setCurrentMonth
  } = useCalendar();

  const {
    notes,
    saveNote,
    deleteNote
  } = useNotes();

  const season = getIndianSeason(currentMonth);
  const backdropUrl = BACKDROP_IMAGES[season.label] || BACKDROP_IMAGES['Winter'];

  return (
    <main className="min-h-screen lg:h-screen w-full lg:overflow-hidden bg-[#050505] relative flex flex-col overflow-y-auto">
      
      {/* Immersive Backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <motion.div 
            key={backdropUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img src={backdropUrl} className="w-full h-full object-cover blur-[80px]" alt="" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex flex-col max-w-[1500px] w-full mx-auto p-4 md:p-6 lg:p-10 pb-20 md:pb-32 gap-6 md:gap-8 min-h-0">
        
        {/* Hero Header - Compressed for more grid space */}
        <header className="h-[10vh] md:h-[12vh] min-h-[100px] md:min-h-[120px] w-full">
           <HeroSection currentMonth={currentMonth} />
        </header>

        {/* Responsive Content Area - Centered for all devices */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-10 min-h-0 justify-center items-center lg:items-start">
          
          {/* Calendar Section */}
          <div className="flex-1 lg:flex-[0.72] min-h-0 flex flex-col">
            <CalendarGrid 
              currentMonth={currentMonth}
              nextMonth={nextMonth}
              prevMonth={prevMonth}
              goToToday={goToToday}
              selectionRange={selectionRange}
              activeDate={activeDate}
              onDateClick={handleDateClick}
              notes={notes}
              clearSelection={clearSelection}
              onMonthChange={setCurrentMonth}
            />
          </div>

          {/* Side Panel - Stacks on Mobile with extra bottom clearance */}
          <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col min-h-0 h-full pb-20 lg:pb-0">
            <NotesPanel 
              currentMonth={currentMonth} 
              selectionRange={selectionRange}
              activeDate={activeDate}
              notes={notes}
              saveNote={saveNote}
              deleteNote={deleteNote}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
