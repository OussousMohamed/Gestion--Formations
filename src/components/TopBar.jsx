import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
import {
  FaUserCircle,
  FaSignOutAlt,
  FaCalendarAlt,
  FaUsers,
} from 'react-icons/fa';

const TopBar = ({ userName = 'Mohamed Oussous' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <header className="h-20 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-10 sticky top-0 z-40 transition-all shadow-sm">
      <div className="flex items-center gap-5">
        <div className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/20 hidden sm:block">
          <FaUsers size={22} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight leading-none">
            Salut,{' '}
            <span className="text-indigo-600 dark:text-indigo-400">
              {userName}
            </span>{' '}
            👋
          </h2>
          <div className="flex items-center gap-2 text-slate-400 mt-1.5">
            <FaCalendarAlt size={12} />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {currentDate}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md shadow-red-500/20 active:scale-95 group"
        >
          <FaSignOutAlt
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-sm">Se Déconnecter</span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 pl-4 pr-1 py-1 rounded-2xl border border-slate-100 dark:border-slate-800">
          <span className="text-sm font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest">
            Admin
          </span>
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-600 shadow-sm">
            <FaUserCircle size={26} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
