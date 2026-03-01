import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaMoneyBillWave, FaVenusMars } from 'react-icons/fa';

export default function StatsSection({ employees }) {
  // 1. حساب الإحصائيات برمجياً
  const totalEmployees = employees.length;

  const totalSalaries = employees.reduce(
    (acc, curr) => acc + (Number(curr.salaire) || 0),
    0,
  );

  const males = employees.filter(
    (emp) => emp.sexe?.toLowerCase() === 'm',
  ).length;
  const females = employees.filter(
    (emp) => emp.sexe?.toLowerCase() === 'f',
  ).length;

  const stats = [
    {
      title: 'Total Employés',
      value: totalEmployees,
      icon: <FaUsers size={24} />,
      color: 'bg-indigo-600',
      shadow: 'shadow-indigo-200',
      label: 'Personnes',
    },
    {
      title: 'Masse Salariale',
      value: `${totalSalaries.toLocaleString()} DH`,
      icon: <FaMoneyBillWave size={24} />,
      color: 'bg-emerald-600',
      shadow: 'shadow-emerald-200',
      label: 'Par mois',
    },
    {
      title: 'Répartition H/F',
      value: `${males}H / ${females}F`,
      icon: <FaVenusMars size={24} />,
      color: 'bg-purple-600',
      shadow: 'shadow-purple-200',
      label: 'Mixité',
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
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-5 group transition-all"
        >
          {/* الأيقونة الملونة */}
          <div
            className={`${stat.color} p-4 rounded-2xl text-white shadow-lg ${stat.shadow} dark:shadow-none group-hover:scale-110 transition-transform`}
          >
            {stat.icon}
          </div>

          {/* النصوص */}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              {stat.title}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-800 dark:text-white leading-none">
                {stat.value}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {stat.label}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
