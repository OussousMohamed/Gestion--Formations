import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLink,
  FaStar,
  FaUserCheck,
  FaTrophy,
  FaChevronDown,
} from 'react-icons/fa';

const ParticipationStats = ({
  participations = [],
  formations = [],
  employes = [],
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 1. الحسابات الأساسية
  const total = participations.length;
  const uniqueParticipantsCount = [
    ...new Set(participations.map((p) => p.idemp)),
  ].length;

  // 2. منطق البيانات للمتصدرين
  const getTopLearners = () => {
    if (total === 0) return [];
    const counts = participations.reduce((acc, p) => {
      acc[p.idemp] = (acc[p.idemp] || 0) + 1;
      return acc;
    }, {});
    const max = Math.max(...Object.values(counts));
    return Object.keys(counts)
      .filter((id) => counts[id] === max)
      .map((id) => ({
        name:
          employes.find((e) => String(e.id) === String(id))?.nom || 'Inconnu',
        count: max,
      }));
  };

  const getTopFormations = () => {
    if (total === 0) return [];
    const counts = participations.reduce((acc, p) => {
      acc[p.idform] = (acc[p.idform] || 0) + 1;
      return acc;
    }, {});
    const max = Math.max(...Object.values(counts));
    return Object.keys(counts)
      .filter((id) => counts[id] === max)
      .map((id) => ({
        subject:
          formations.find((f) => String(f.id) === String(id))?.Sujet || 'N/A',
        count: max,
      }));
  };

  const stats = [
    {
      title: 'TOTAL INSCRIPTIONS',
      value: total,
      sub: 'SESSIONS',
      icon: <FaLink />,
      theme: 'indigo',
    },
    {
      title: 'COLLABORATEURS',
      value: uniqueParticipantsCount,
      sub: 'ACTIFS',
      icon: <FaUserCheck />,
      theme: 'emerald',
    },
    {
      id: 'top-form',
      title: 'TOP FORMATION',
      isList: true,
      placeholder: 'Découvrir Top Formation',
      items: getTopFormations().map((f) => `${f.subject} (${f.count})`),
      icon: <FaStar />,
      theme: 'amber',
    },
    {
      id: 'top-learner',
      title: 'TOP LEARNER',
      isList: true,
      placeholder: 'Découvrir Top Learner',
      items: getTopLearners().map((l) => `${l.name} (${l.count})`),
      icon: <FaTrophy />,
      theme: 'purple',
    },
  ];

  const themes = {
    indigo:
      'bg-indigo-50 text-indigo-600 dark:bg-indigo-600/20 dark:text-indigo-500',
    emerald:
      'bg-emerald-50 text-emerald-600 dark:bg-emerald-600/20 dark:text-emerald-500',
    amber:
      'bg-amber-50 text-amber-600 dark:bg-amber-600/20 dark:text-amber-500',
    purple:
      'bg-purple-50 text-purple-600 dark:bg-purple-600/20 dark:text-purple-500',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 shadow-xl dark:shadow-lg flex items-center gap-5 relative transition-all duration-300"
        >
          {/* Icon Section */}
          <div
            className={`${themes[stat.theme]} w-14 h-14 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-colors duration-300`}
          >
            {stat.icon}
          </div>

          <div className="flex flex-col min-w-0 w-full">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 transition-colors duration-300">
              {stat.title}
            </span>

            <div className="flex items-baseline gap-2 mt-1">
              {stat.isList ? (
                <div className="relative w-full">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === stat.id ? null : stat.id,
                      )
                    }
                    className="flex items-center justify-between w-full text-left outline-none group"
                  >
                    <span className="text-sm font-black text-slate-800 dark:text-white truncate pr-2 transition-colors duration-300">
                      {stat.placeholder}
                    </span>
                    <FaChevronDown
                      className={`text-slate-400 dark:text-slate-500 text-[10px] transition-transform duration-300 ${activeDropdown === stat.id ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Custom Dropdown UI */}
                  <AnimatePresence>
                    {activeDropdown === stat.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setActiveDropdown(null)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl z-20 overflow-hidden"
                        >
                          {stat.items.length > 0 ? (
                            stat.items.map((item, i) => (
                              <div
                                key={i}
                                className="px-4 py-3 text-[11px] font-bold text-slate-700 dark:text-slate-200 border-b border-slate-100 dark:border-slate-700/50 last:border-none hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-default"
                              >
                                {item}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-[11px] text-slate-400 dark:text-slate-500 italic text-center">
                              Aucune donnée
                            </div>
                          )}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-800 dark:text-white leading-none transition-colors duration-300">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter transition-colors duration-300">
                    {stat.sub}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParticipationStats;
