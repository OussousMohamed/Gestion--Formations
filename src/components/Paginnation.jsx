import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center py-6">
      <ul className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <li>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-xl transition-all ${
              currentPage === 1
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600'
            }`}
          >
            <FaChevronRight size={14} className="rtl:rotate-180" />
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(number)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${
                currentPage === number
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600'
              }`}
            >
              {number}
            </motion.button>
          </li>
        ))}

        <li>
          <button
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`p-2 rounded-xl transition-all ${
              currentPage === totalPages
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600'
            }`}
          >
            <FaChevronLeft size={14} className="rtl:rotate-180" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
