import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';
import DayCell from './DayCell';
import {
  getCalendarDays,
  format,
  getHoliday,
  setMonth,
  setYear
} from '../utils/dateUtils';

const CalendarGrid = ({
  currentMonth,
  nextMonth,
  prevMonth,
  goToToday,
  selectionRange,
  activeDate,
  onDateClick,
  notes,
  clearSelection,
  onMonthChange,
}) => {
  const [days, setDays] = useState([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    setDays(getCalendarDays(currentMonth));
  }, [currentMonth]);

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  const currentYear = currentMonth.getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const handleMonthJump = (mIdx) => {
    onMonthChange(setMonth(currentMonth, mIdx));
  };

  const handleYearJump = (year) => {
    onMonthChange(setYear(currentMonth, year));
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">

      {/* ================= Header ================= */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">

        {/* Title + Controls */}
        <div className="flex items-center gap-6 w-full md:w-auto">

          <button
            onClick={() => setIsPickerOpen(true)}
            className="group flex flex-col items-start transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-400 mb-1">
              Select View
            </span>

            <motion.h2
              key={format(currentMonth, 'MMMM-yyyy')}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white"
            >
              {format(currentMonth, 'MMMM')}{' '}
              <span className="text-white/20">
                {format(currentMonth, 'yyyy')}
              </span>
            </motion.h2>
          </button>

          {/* Nav Buttons */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 ml-auto md:ml-0">
            <button
              onClick={prevMonth}
              className="p-2 md:p-3 hover:bg-white/10 rounded-xl text-white/50 hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={goToToday}
              className="px-4 py-2 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-white"
            >
              Today
            </button>

            <button
              onClick={nextMonth}
              className="p-2 md:p-3 hover:bg-white/10 rounded-xl text-white/50 hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                Today
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                Active Range
              </span>
            </div>
          </div>

          {selectionRange.start && (
            <button
              onClick={clearSelection}
              className="flex items-center gap-2 text-white/40 hover:text-primary-400"
            >
              <Sparkles size={12} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Reset
              </span>
            </button>
          )}
        </div>
      </div>

      {/* ================= Weekdays ================= */}
      <div className="grid grid-cols-7 mb-3 px-2">
        {weekdays.map(day => (
          <div
            key={day}
            className="text-center text-[11px] font-black uppercase tracking-[0.3em] text-white/10"
          >
            {day}
          </div>
        ))}
      </div>

      {/* ================= Calendar Grid ================= */}
      <div className="flex-1 min-h-0 relative">

        <AnimatePresence mode="wait">
          <motion.div
            key={format(currentMonth, 'yyyy-MM')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-7 grid-rows-6 h-full w-full gap-2 md:gap-3 lg:gap-4 will-change-transform"
          >
            {days.slice(0, 42).map((date, idx) => (
              <DayCell
                key={date.toISOString()}
                date={date}
                index={idx}
                currentMonth={currentMonth}
                selectionRange={selectionRange}
                activeDate={activeDate}
                onClick={onDateClick}
                hasNote={!!notes[format(date, 'yyyy-MM-dd')]}
                holiday={getHoliday(date)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* ================= Modal Picker ================= */}
      <AnimatePresence>
        {isPickerOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl bg-gray-900/95 p-10 rounded-[3rem] border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black text-white italic">
                  Jump to Date
                </h3>

                <button
                  onClick={() => setIsPickerOpen(false)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full"
                >
                  <X size={20} className="text-white/60" />
                </button>
              </div>

              {/* Picker */}
              <div className="grid grid-cols-2 gap-8">

                {/* Months */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary-400">
                    Month
                  </p>

                  <div className="grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto">
                    {months.map((m, i) => (
                      <button
                        key={m}
                        onClick={() => {
                          handleMonthJump(i);
                          setIsPickerOpen(false);
                        }}
                        className={`px-4 py-3 rounded-xl text-sm font-black text-left ${
                          currentMonth.getMonth() === i
                            ? 'bg-primary-600 text-white'
                            : 'text-white/40 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Years */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary-400">
                    Year
                  </p>

                  <div className="grid grid-cols-2 gap-2 max-h-[250px] overflow-y-auto">
                    {years.map((y) => (
                      <button
                        key={y}
                        onClick={() => {
                          handleYearJump(y);
                          setIsPickerOpen(false);
                        }}
                        className={`px-4 py-3 rounded-xl text-sm font-black text-left ${
                          currentYear === y
                            ? 'bg-primary-600 text-white'
                            : 'text-white/40 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
                <button
                  onClick={() => setIsPickerOpen(false)}
                  className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CalendarGrid;