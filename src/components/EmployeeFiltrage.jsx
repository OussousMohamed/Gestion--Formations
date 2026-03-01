import React from 'react';
import { FaSearch, FaFilter, FaSync, FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ExportActions from './ExportActions';

const FilterBar = ({
  filteredData,
  employees,
  onSearch,
  onFilterChange,
  onReset,
}) => {
  const uniqueGrades = employees
    ? [...new Set(employees.map((emp) => emp.grade).filter(Boolean))]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full mb-8 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700/50 relative overflow-hidden"
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="flex flex-col gap-6 relative z-10">
        {/* All Controls in One Row */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
          {/* Left Side: Search + Filters + Reset */}
          <div className="flex flex-col md:flex-row items-center gap-3 w-full xl:w-auto flex-1">
            {/* Search Input */}
            <div className="relative w-full md:w-80 lg:w-96 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300">
                <FaSearch size={16} />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 outline-none text-sm font-medium"
              />
            </div>

            {/* Gender Filter */}
            <div className="relative w-full md:w-48">
              <select
                onChange={(e) => onFilterChange('sexe', e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-3 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                <option value="">Sexe</option>
                <option value="m">Homme</option>
                <option value="f">Femme</option>
              </select>
              <FaChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={10}
              />
            </div>

            {/* Grade Filter */}
            <div className="relative w-full md:w-56">
              <select
                onChange={(e) => onFilterChange('grade', e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-3 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                <option value="">Grade</option>
                {uniqueGrades.map((grade, index) => (
                  <option key={index} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
              <FaChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={10}
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={onReset}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl text-sm font-bold transition-all duration-200 group relative overflow-hidden whitespace-nowrap"
              title="Réinitialiser"
            >
              <span className="absolute inset-0 bg-slate-100 dark:bg-slate-700 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-100 transition-opacity" />
              <FaSync
                className="group-hover:rotate-180 transition-transform duration-500"
                size={14}
              />
            </button>
          </div>

          {/* Right Side: Export Buttons */}
          <div className="flex-shrink-0 w-full md:w-auto flex justify-end mt-2 md:mt-0">
            {filteredData && <ExportActions data={filteredData} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
