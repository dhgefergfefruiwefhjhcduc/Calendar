import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Trash2,
  Save,
  X,
  Calendar as CalendarIcon,
  Plus,
  Edit3
} from 'lucide-react';
import { format } from '../utils/dateUtils';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const NotesPanel = ({
  currentMonth,
  activeDate,
  notes,
  saveNote,
  deleteNote
}) => {
  const [editingNote, setEditingNote] = useState({ key: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);

  const monthKey = `month-${format(currentMonth, 'yyyy-MM')}`;
  const safeSelectionKey = activeDate
    ? format(activeDate, 'yyyy-MM-dd')
    : null;

  const currentSelectionNote = safeSelectionKey
    ? notes[safeSelectionKey]
    : '';

  const currentMonthNote = notes[monthKey] || '';

  const handleSave = () => {
    saveNote(editingNote.key, editingNote.content);
    setIsEditing(false);
  };

  const startEdit = (key, content) => {
    setEditingNote({ key, content: content || '' });
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col gap-6 h-full min-h-0">

      {/* ================= Monthly Focus ================= */}
      <motion.section
        layout
        className="flex-[0.45] min-h-[180px] glass-panel p-6 md:p-8 rounded-[2.5rem] flex flex-col relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/10 blur-3xl rounded-full -mr-16 -mt-16" />

        <div className="flex items-center justify-between mb-4 md:mb-6 z-10">
          <div className="flex items-center gap-2 leading-none">
            <FileText className="text-primary-400 shrink-0 w-4 h-4 md:w-[18px] md:h-[18px]" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/40">
              Monthly Focus
            </span>
          </div>

          <button
            onClick={() => startEdit(monthKey, currentMonthNote)}
            className="p-2 md:p-3 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white/40 hover:text-white"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scroll-smooth no-scrollbar z-10">
          {currentMonthNote ? (
            <div className="flex flex-col h-full">
              <p className="text-sm md:text-base font-bold text-white leading-relaxed break-words">
                {currentMonthNote}
              </p>

              <button
                onClick={() => deleteNote(monthKey)}
                className="mt-4 md:mt-6 flex items-center gap-2 text-[9px] md:text-[10px] font-black text-red-500/40 hover:text-red-500 transition-colors uppercase tracking-[0.3em]"
              >
                <Trash2 size={12} /> Clear Focus
              </button>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center text-center opacity-20 border-2 border-dashed border-white/5 rounded-[2rem] p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em]">
                Establish your goals
              </p>
            </div>
          )}
        </div>
      </motion.section>

      {/* ================= Daily Planner ================= */}
      <motion.section
        layout
        className="flex-[0.55] min-h-[290px] glass-panel p-6 md:p-8 rounded-[2.5rem] flex flex-col relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="flex items-center gap-2 mb-6 md:mb-8">
          <CalendarIcon className="text-amber-400 w-4 h-4" />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/40">
            Daily Schedule
          </span>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            {activeDate ? (
              <motion.div
                key={safeSelectionKey}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="flex flex-col h-full"
              >
                {/* Date */}
                <div className="mb-6 md:mb-8">
                  <p className="text-3xl md:text-4xl font-black text-white leading-none">
                    {format(activeDate, 'MMM do')}
                  </p>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                    {format(activeDate, 'yyyy')}
                  </p>
                </div>

                {/* Card */}
                <motion.button
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() =>
                    startEdit(safeSelectionKey, currentSelectionNote)
                  }
                  className="flex-1 flex text-left outline-none group"
                >
                  <div className="w-full h-full p-4 md:p-4 rounded-[2.5rem] bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all flex flex-col">
                    {currentSelectionNote ? (
                      <>
                        <p className="text-base md:text-lg text-white leading-relaxed font-bold break-words">
                          {currentSelectionNote}
                        </p>

                        <div className="mt-6 flex items-center justify-end gap-3 text-primary-400 opacity-0 group-hover:opacity-100 transition-all">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em]">
                            Modify
                          </span>
                          <Edit3 size={14} />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-1 flex-col items-center justify-center gap-6">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary-500/10 group-hover:border-primary-500/20 transition-all">
                          <Plus className="text-white/20 group-hover:text-primary-400 w-6 h-6" />
                        </div>

                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10 group-hover:text-white/40">
                          Create Entry
                        </p>
                      </div>
                    )}
                  </div>
                </motion.button>
              </motion.div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 animate-pulse">
                  <CalendarIcon className="text-white/20 w-6 h-6" />
                </div>

                <p className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">
                  Select a date <br /> to access your workflow
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* ================= Modal ================= */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl mx-auto glass-panel p-6 md:p-10 rounded-[3rem] border-white/20 flex flex-col gap-6 max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h4 className="text-xl md:text-2xl font-black text-white italic">
                  Edit Schedule
                </h4>

                <button
                  onClick={() => setIsEditing(false)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full"
                >
                  <X className="text-white/60 w-5 h-5" />
                </button>
              </div>

              {/* Textarea */}
              <textarea
                autoFocus
                value={editingNote.content}
                onChange={(e) =>
                  setEditingNote((prev) => ({
                    ...prev,
                    content: e.target.value
                  }))
                }
                placeholder="Transcribe your thoughts..."
                className="w-full h-64 bg-black/30 rounded-[2rem] p-6 text-lg font-bold text-white outline-none focus:ring-4 ring-primary-500/30 border border-white/5 resize-none"
              />

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                <button
                  onClick={handleSave}
                  className="flex-1 h-16 rounded-xl bg-white text-black flex items-center justify-center gap-3 font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Save size={18} /> Deploy Entry
                </button>

                {editingNote.content && (
                  <button
                    onClick={() => {
                      deleteNote(editingNote.key);
                      setIsEditing(false);
                    }}
                    className="w-16 h-16 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20"
                  >
                    <Trash2 size={22} />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotesPanel;