import React from 'react';
import { FaSearch, FaSync, FaChevronDown, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ExportActionFormation from './ExportActionFormation';

import toast from 'react-hot-toast';

const FormationFilterBar = ({
  filteredData,
  onSearch,
  onFilterChange,
  onReset,
  filters, 
}) => {
  const handleDateChange = (name, value) => {
    if (name === 'datefin' && filters.datedebut && value < filters.datedebut) {
      toast.error(
        'La date de fin ne peut pas être antérieure à la date de début',
      );
      return;
    }
    onFilterChange(name, value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mb-8 bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 dark:shadow-none border border-slate-100 dark:border-slate-700/50 relative overflow-hidden"
    >
      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto flex-1">
            {/* Search by Subject */}
            <div className="relative w-full md:w-64 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500">
                <FaSearch size={14} />
              </div>
              <input
                type="text"
                placeholder="Rechercher un sujet..."
                value={filters.search || ''}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-medium focus:border-indigo-500 outline-none transition-all dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative w-full md:w-40">
              <select
                value={filters.etat || ''}
                onChange={(e) => onFilterChange('etat', e.target.value)}
                className="w-full appearance-none pl-4 pr-8 py-3 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 outline-none focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="">Tous les États</option>
                <option value="programmée">Programmée</option>
                <option value="encours">En cours</option>
                <option value="terminée">Terminée</option>
              </select>
              <FaChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={10}
              />
            </div>

            {/* Date Début Filter */}
            <div className="relative w-full md:w-44">
              <input
                type="date"
                value={filters.datedebut || ''}
                onChange={(e) => handleDateChange('datedebut', e.target.value)}
                className="w-full pl-4 pr-3 py-3 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-500 outline-none focus:border-indigo-500"
              />
            </div>

            {/* Date Fin Filter */}
            <div className="relative w-full md:w-44">
              <input
                type="date"
                value={filters.datefin || ''}
                min={filters.datedebut}
                onChange={(e) => handleDateChange('datefin', e.target.value)}
                className="w-full pl-4 pr-3 py-3 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-xs font-bold text-slate-500 outline-none focus:border-indigo-500"
              />
            </div>

            {/* Reset */}
            <button
              onClick={onReset}
              className="p-3 text-slate-400 hover:text-red-500 bg-slate-50 dark:bg-slate-700 rounded-2xl transition-all"
              title="Réinitialiser"
            >
              <FaSync size={16} />
            </button>
          </div>

          {/* Export Actions */}
          <div className="flex-shrink-0">
            <ExportActionFormation data={filteredData} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FormationFilterBar;
