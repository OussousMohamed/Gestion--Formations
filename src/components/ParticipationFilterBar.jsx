import React from 'react';
import {
  FaSearch,
  FaSync,
  FaChevronDown,
  FaUserGraduate,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import ExportActionParticipation from './ExportActionParticipation';

const ParticipationFilterBar = ({
  filteredData,
  onSearchEmp,
  onSearchForm,
  onReset,
  searchEmp,
  searchForm,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mb-8 bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 dark:shadow-none border border-slate-100 dark:border-slate-700/50 relative overflow-hidden"
    >
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto flex-1">
            {/* Search by Employee Name */}
            <div className="relative w-full md:w-72 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <FaUserGraduate size={14} />
              </div>
              <input
                type="text"
                placeholder="Filtrer par collaborateur..."
                value={searchEmp}
                onChange={(e) => onSearchEmp(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-medium focus:border-indigo-500 outline-none transition-all dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            {/* Search by Formation Subject */}
            <div className="relative w-full md:w-72 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <FaChalkboardTeacher size={14} />
              </div>
              <input
                type="text"
                placeholder="Filtrer par formation..."
                value={searchForm}
                onChange={(e) => onSearchForm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-medium focus:border-indigo-500 outline-none transition-all dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={onReset}
              className="p-3 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-700 rounded-2xl transition-all shadow-sm active:scale-95"
              title="Réinitialiser"
            >
              <FaSync size={16} />
            </button>
          </div>

          {/* Export Actions  */}
          <div className="flex-shrink-0">
            <ExportActionParticipation data={filteredData} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ParticipationFilterBar;
