import { useState, useCallback } from 'react';
import { addMonths, subMonths, isSameDay } from '../utils/dateUtils';

/**
 * Custom hook for calendar navigation and range selection logic
 */
const useCalendar = (initialDate = new Date()) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [selectionRange, setSelectionRange] = useState({ start: null, end: null });
  const [activeDate, setActiveDate] = useState(null);

  /**
   * Navigate to next month
   */
  const nextMonth = useCallback(() => {
    setCurrentMonth(prev => addMonths(prev, 1));
  }, []);

  /**
   * Navigate to previous month
   */
  const prevMonth = useCallback(() => {
    setCurrentMonth(prev => subMonths(prev, 1));
  }, []);

  /**
   * Reset to current date
   */
  const goToToday = useCallback(() => {
    const today = new Date();
    setCurrentMonth(today);
    setActiveDate(today);
    setSelectionRange({ start: today, end: null });
  }, []);

  /**
   * Handle date click for range selection and focus
   * @param {Date} date 
   */
  const handleDateClick = useCallback((date) => {
    // Always update the active date for the schedule box context
    setActiveDate(date);

    setSelectionRange(prev => {
      // 1. If clicking the same date that was already the start and there's no end, clear it
      if (prev.start && !prev.end && isSameDay(prev.start, date)) {
        return { start: null, end: null };
      }

      // 2. If no start, or if a range is already complete, start a new range
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null };
      }

      // 3. Complete the range and auto-swap if necessary
      const [start, end] = date < prev.start ? [date, prev.start] : [prev.start, date];
      return { start, end };
    });
  }, []);

  /**
   * Clear selection
   */
  const clearSelection = useCallback(() => {
    setSelectionRange({ start: null, end: null });
    setActiveDate(null);
  }, []);

  return {
    currentMonth,
    selectionRange,
    activeDate,
    nextMonth,
    prevMonth,
    goToToday,
    handleDateClick,
    clearSelection,
    setCurrentMonth,
  };
};

export default useCalendar;
