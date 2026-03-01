import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaChalkboardTeacher,
  FaChartPie,
  FaUserGraduate,
  FaMoon,
} from 'react-icons/fa';

// المكون الفرعي للرابط
const SidebarItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center gap-4 px-6 py-4 mx-4 my-1 rounded-2xl transition-all duration-300 group
      ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 font-bold'
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-indigo-600'
      }
    `}
  >
    {({ isActive }) => (
      <>
        <Icon
          size={20}
          className={`${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`}
        />
        <span className="text-sm tracking-wide">{label}</span>
      </>
    )}
  </NavLink>
);

// المكون الرئيسي - تأكد من وجود export default في الأسفل
function Sidebar() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 z-50"
    >
      {/* Logo Section */}
      <div className="px-6 py-10 flex items-center gap-3">
        <div className="relative flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-xl shadow-indigo-500/20 rotate-3">
          <div className="absolute inset-0 bg-white/10 rounded-2xl blur-[1px]"></div>
          <span className="relative text-white font-black text-xl tracking-tighter">
            GF
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-600 font-black mb-0.5">
            Platform
          </span>
          <h4 className="text-lg font-black text-slate-800 dark:text-white tracking-tighter leading-none">
            Gestion<span className="text-indigo-600 italic">—Formation</span>
          </h4>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-2 flex flex-col">
        <SidebarItem to="/" icon={FaChartPie} label="Tableau de bord" />
        <SidebarItem to="/employees" icon={FaUsers} label="Employés" />
        <SidebarItem
          to="/formations"
          icon={FaChalkboardTeacher}
          label="Formations"
        />
        <SidebarItem
          to="/participations"
          icon={FaUserGraduate}
          label="Participations"
        />
      </nav>

      {/* Theme Toggle Button */}
      <div className="p-6 mt-auto">
        <button className="w-full flex items-center justify-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 group">
          <FaMoon className="group-hover:rotate-[360deg] transition-transform duration-500" />
          <span className="text-xs font-black uppercase tracking-widest">
            Mode Sombre
          </span>
        </button>
      </div>
    </motion.div>
  );
}

// السطر الأهم الذي يحل مشكلة الـ SyntaxError
export default Sidebar;
