import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameDay, 
  isSameMonth, 
  isToday,
  addMonths,
  subMonths,
  format,
  isWeekend,
  isWithinInterval,
  setMonth,
  setYear
} from 'date-fns';

/**
 * Generates the days for the calendar grid including padding from previous/next months
 */
export const getCalendarDays = (date) => {
  const start = startOfWeek(startOfMonth(date));
  // Always return 42 days (6 weeks) to ensure consistency and support for long months
  const days = [];
  for (let i = 0; i < 42; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    days.push(day);
  }
  return days;
};

/**
 * Indian Seasonal Mapping
 */
export const INDIAN_SEASONS = {
  WINTER: { label: 'Winter', months: [11, 0], color: 'indigo' },
  VASANT: { label: 'Spring (Vasant)', months: [1, 2], color: 'green' },
  SUMMER: { label: 'Summer', months: [3, 4, 5], color: 'amber' },
  MONSOON: { label: 'Monsoon', months: [6, 7, 8], color: 'blue' },
  SHARAD: { label: 'Autumn (Sharad)', months: [9, 10], color: 'orange' }
};

/**
 * Get the current Indian season based on month index (0-11)
 */
export const getIndianSeason = (date) => {
  const month = date.getMonth();
  if (INDIAN_SEASONS.WINTER.months.includes(month)) return INDIAN_SEASONS.WINTER;
  if (INDIAN_SEASONS.VASANT.months.includes(month)) return INDIAN_SEASONS.VASANT;
  if (INDIAN_SEASONS.SUMMER.months.includes(month)) return INDIAN_SEASONS.SUMMER;
  if (INDIAN_SEASONS.MONSOON.months.includes(month)) return INDIAN_SEASONS.MONSOON;
  if (INDIAN_SEASONS.SHARAD.months.includes(month)) return INDIAN_SEASONS.SHARAD;
  return INDIAN_SEASONS.WINTER;
};

/**
 * Mock holiday data
 */
export const MOCK_HOLIDAYS = {
  '01-01': 'New Year\'s Day',
  '01-26': 'Republic Day',
  '08-15': 'Independence Day',
  '10-02': 'Gandhi Jayanti',
  '12-25': 'Christmas',
};

export const getHoliday = (date) => {
  const key = format(date, 'MM-dd');
  return MOCK_HOLIDAYS[key] || null;
};

export { 
  isSameDay, 
  isSameMonth, 
  isToday, 
  isWeekend, 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth,
  setMonth,
  setYear
};
