import { useState, useCallback, useEffect } from 'react';
import { format } from '../utils/dateUtils';

/**
 * Custom hook for persistent storage of calendar notes
 */
const useNotes = () => {
  const [notes, setNotes] = useState({});

  /**
   * Load notes from localStorage on mount
   */
  useEffect(() => {
    const storedNotes = localStorage.getItem('calendar-notes');
    if (storedNotes) {
      try {
        setNotes(JSON.parse(storedNotes));
      } catch (error) {
        console.error('Failed to parse notes:', error);
      }
    }
  }, []);

  /**
   * Add or update a note
   * @param {string|Date} dateKey - Date string (yyyy-MM-dd) or "general-month-year" or Date object
   * @param {string} content - Note content
   */
  const saveNote = useCallback((dateKey, content) => {
    let key = dateKey;
    if (dateKey instanceof Date) {
      key = format(dateKey, 'yyyy-MM-dd');
    }

    setNotes(prev => {
      const updated = { ...prev };
      if (!content || content.trim() === '') {
        delete updated[key];
      } else {
        updated[key] = content;
      }
      localStorage.setItem('calendar-notes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  /**
   * Get a note by key
   */
  const getNote = useCallback((dateKey) => {
    let key = dateKey;
    if (dateKey instanceof Date) {
      key = format(dateKey, 'yyyy-MM-dd');
    }
    return notes[key] || '';
  }, [notes]);

  /**
   * Delete a note
   */
  const deleteNote = useCallback((dateKey) => {
    saveNote(dateKey, '');
  }, [saveNote]);

  /**
   * Clear all notes
   */
  const clearAllNotes = useCallback(() => {
    setNotes({});
    localStorage.removeItem('calendar-notes');
  }, []);

  return {
    notes,
    saveNote,
    getNote,
    deleteNote,
    clearAllNotes,
  };
};

export default useNotes;
