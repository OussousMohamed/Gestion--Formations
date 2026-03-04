import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUsers,
  FaChalkboardTeacher,
  FaChartPie,
  FaUserGraduate,
  FaMoon,
  FaSun,
  FaChevronLeft,
} from 'react-icons/fa';
import useDarkMode from '../hooks/useDarkMode';

const SidebarItem = ({ to, icon: Icon, label, isCollapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center gap-4 px-6 py-4 mx-4 my-1 rounded-2xl transition-all duration-300 group
      ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 font-bold'
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-indigo-600'
      }
      ${isCollapsed ? 'px-0 justify-center mx-2' : ''}
    `}
    title={label} 
  >
    {({ isActive }) => (
      <>
        <Icon
          size={20}
          className={`${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'} shrink-0`}
        />
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm tracking-wide whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </>
    )}
  </NavLink>
);

function Sidebar() {
  const [theme, setTheme] = useDarkMode();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      animate={{ width: isCollapsed ? 88 : 288 }}
      className="h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col sticky top-0 z-50 transition-colors duration-300 relative"
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-12 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all z-[60]"
      >
        <FaChevronLeft
          className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          size={12}
        />
      </button>

      {/* Logo Section */}
      <div
        className={`px-6 py-10 flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3'}`}
      >
        <div className="relative flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-xl shadow-indigo-500/20 rotate-3">
          <span className="relative text-white font-black text-xl tracking-tighter">
            GF
          </span>
        </div>

        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-600 font-black mb-0.5">
              Platform
            </span>
            <h4 className="text-lg font-black text-slate-800 dark:text-white tracking-tighter leading-none">
              Gestion<span className="text-indigo-600 italic">—Formation</span>
            </h4>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-2 flex flex-col">
        <SidebarItem
          to="/"
          icon={FaChartPie}
          label="Tableau de bord"
          isCollapsed={isCollapsed}
          title="Tableau de bord"
        />
        <SidebarItem
          to="/employees"
          icon={FaUsers}
          label="Employés"
          isCollapsed={isCollapsed}
          title="Employés"
        />
        <SidebarItem
          to="/formations"
          icon={FaChalkboardTeacher}
          label="Formations"
          isCollapsed={isCollapsed}
          title="Formations"
        />
        <SidebarItem
          to="/participations"
          icon={FaUserGraduate}
          label="Participations"
          isCollapsed={isCollapsed}
          title="Participations"
        />
      </nav>

      {/* Theme Toggle Button */}
      <div className="p-6 mt-auto">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`w-full flex items-center justify-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 group ${isCollapsed ? 'p-0 h-12 w-12 mx-auto' : ''}`}
        >
          {theme === 'light' ? (
            <FaSun className="group-hover:rotate-180 transition-transform duration-500 text-yellow-500 group-hover:text-white" />
          ) : (
            <FaMoon className="group-hover:rotate-[360deg] transition-transform duration-500" />
          )}
          {!isCollapsed && (
            <span className="text-xs font-black uppercase tracking-widest">
              {theme === 'light' ? 'Clair' : 'Sombre'}
            </span>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default Sidebar;
