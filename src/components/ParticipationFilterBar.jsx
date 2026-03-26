import React from 'react';
import {
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
  // أضفنا هذه الخصائص لجلب القوائم من الأب
  employees = [],
  formations = [],
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mb-8 bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-xl shadow-indigo-100/50 dark:shadow-none border border-slate-100 dark:border-slate-700/50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto flex-1">
            {/* 👤 Select par Collaborateur */}
            <div className="relative w-full md:w-64 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors z-10">
                <FaUserGraduate size={14} />
              </div>
              <select
                value={searchEmp}
                onChange={(e) => onSearchEmp(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold focus:border-indigo-500 outline-none transition-all dark:text-slate-200 appearance-none cursor-pointer"
              >
                <option value="">Tous les Collaborateurs</option>
                {employees.map((emp) => (
                  <option
                    key={emp.id}
                    value={emp.nom}
                    className="bg-white dark:bg-slate-800"
                  >
                    {emp.nom}
                  </option>
                ))}
              </select>
              <FaChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={10}
              />
            </div>

            {/* 📚 Select par Formation */}
            <div className="relative w-full md:w-64 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors z-10">
                <FaChalkboardTeacher size={14} />
              </div>
              <select
                value={searchForm}
                onChange={(e) => onSearchForm(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold focus:border-indigo-500 outline-none transition-all dark:text-slate-200 appearance-none cursor-pointer"
              >
                <option value="">Toutes les Formations</option>
                {formations.map((form) => (
                  <option
                    key={form.id}
                    value={form.Sujet}
                    className="bg-white dark:bg-slate-800"
                  >
                    {form.Sujet}
                  </option>
                ))}
              </select>
              <FaChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={10}
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={onReset}
              className="p-3 text-slate-400 hover:text-white hover:bg-red-500 bg-slate-50 dark:bg-slate-700 rounded-2xl transition-all shadow-sm active:scale-95 group"
              title="Réinitialiser"
            >
              <FaSync
                size={16}
                className="group-hover:rotate-180 transition-transform duration-500"
              />
            </button>
          </div>

          <div className="flex-shrink-0">
            <ExportActionParticipation data={filteredData} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ParticipationFilterBar;
