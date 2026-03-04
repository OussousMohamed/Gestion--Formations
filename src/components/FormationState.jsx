import React from 'react';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaClock, FaLayerGroup } from 'react-icons/fa';

export default function FormationStats({ formations }) {
  const data = formations || [];

  const total = data.length;

  const enCours = data.filter(
    (f) => f.etat?.trim().toLowerCase() === 'encours',
  ).length;
  const terminee = data.filter(
    (f) => f.etat?.trim().toLowerCase() === 'terminée',
  ).length;
  const programmee = data.filter(
    (f) => f.etat?.trim().toLowerCase() === 'programmée',
  ).length;

  const stats = [
    {
      title: 'Total Formations',
      value: total,
      icon: <FaChalkboardTeacher size={24} />,
      color: 'bg-indigo-600',
      shadow: 'shadow-indigo-200',
      label: 'Sessions',
    },
    {
      title: 'En Cours',
      value: enCours,
      icon: <FaClock size={24} />,
      color: 'bg-amber-500',
      shadow: 'shadow-amber-200',
      label: 'Actives',
    },
    {
      title: 'Répartition État',
      value: `${programmee}P / ${terminee}T`,
      icon: <FaLayerGroup size={24} />,
      color: 'bg-purple-600',
      shadow: 'shadow-purple-200',
      label: 'Prog / Term',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-2">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-5 group transition-all"
        >
          {/* Icon Box  */}
          <div
            className={`${stat.color} p-4 rounded-2xl text-white shadow-lg ${stat.shadow} dark:shadow-none group-hover:rotate-6 transition-transform`}
          >
            {stat.icon}
          </div>

          {/* Text Info */}
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
              {stat.title}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800 dark:text-white leading-none tracking-tight">
                {stat.value}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase italic">
                {stat.label}
              </span>
            </div>
          </div>

        </motion.div>
      ))}
    </div>
  );
}
