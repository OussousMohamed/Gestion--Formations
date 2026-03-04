import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaTrashAlt, FaTimes } from 'react-icons/fa';

export default function DeleteConfirmed({
  show,
  onCancel,
  onConfirm,
  itemName,
  item,
}) {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl overflow-hidden z-10 p-8 text-center"
          >
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <FaTimes size={20} />
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 animate-pulse">
                <FaExclamationTriangle size={40} />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
              Confirmation de suppression
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              Voulez-vous vraiment supprimer cet Element ? <br />
              <span className="font-extrabold text-red-600 dark:text-red-400 text-lg">
                {itemName}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={onCancel}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all order-2 sm:order-1 text-sm"
              >
                <FaTimes size={14} />
                <span>Annuler</span>
              </button>

              <button
                onClick={onConfirm}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-md shadow-red-200 dark:shadow-none transition-all order-1 sm:order-2 text-sm"
              >
                <FaTrashAlt size={14} />
                <span>Supprimer</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
