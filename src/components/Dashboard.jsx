import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {
  FaUsers,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaChartLine,
  FaGem,
  FaChevronDown,
  FaTrophy,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Spiner from './Spinner';

import { fetchEmployees } from '../features/employeeSlice';
import { fetchFormations } from '../features/formationSlice';
import { fetchParticipations } from '../features/participationSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showTopLearners, setShowTopLearners] = useState(false);

  const { employees = [], loading: empLoading } = useSelector(
    (state) => state.employees,
  );
  const { formations = [], loading: formLoading } = useSelector(
    (state) => state.formations,
  );
  const { participations = [], loading: partLoading } = useSelector(
    (state) => state.participations,
  );

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchFormations());
    dispatch(fetchParticipations());
  }, [dispatch]);

  const employeePerformance = useMemo(() => {
    return employees
      .map((emp) => ({
        name: emp.nom.split(' ')[0],
        fullName: emp.nom,
        count: participations.filter((p) => String(p.idemp) === String(emp.id))
          .length,
      }))
      .sort((a, b) => b.count - a.count);
  }, [employees, participations]);

  const topWinners = useMemo(() => {
    if (employeePerformance.length === 0) return [];
    const maxScore = employeePerformance[0].count;
    if (maxScore === 0) return []; 
    return employeePerformance.filter((emp) => emp.count === maxScore);
  }, [employeePerformance]);

  const formationDistribution = useMemo(() => {
    return formations
      .map((f) => ({
        name: f.Sujet,
        value: participations.filter((p) => String(p.idform) === String(f.id))
          .length,
      }))
      .filter((f) => f.value > 0);
  }, [formations, participations]);

  const radarData = useMemo(() => {
    return (
      formations
        .map((f) => ({
          subject:
            f.Sujet.length > 12 ? f.Sujet.substring(0, 10) + '..' : f.Sujet,
          A: participations.filter((p) => String(p.idform) === String(f.id))
            .length,
        }))
        .filter((d) => d.A >= 0)
    ); 
  }, [formations, participations]);

  const COLORS = [
    '#6366f1',
    '#a855f7',
    '#ec4899',
    '#f43f5e',
    '#f59e0b',
    '#10b981',
  ];

  if (empLoading || formLoading || partLoading) return <Spiner />;

  return (
    <>
      <div className="fixed inset-0 bg-slate-50 dark:bg-[#0f172a] z-0 transition-colors duration-300" />
      <div className="relative z-10 -mt-20 pt-28 lg:pt-32 px-6 lg:px-10 min-h-screen text-slate-800 dark:text-slate-200 font-sans space-y-10 pb-20 transition-colors duration-300">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase transition-colors duration-300">
              Tableau du
              <span className="text-indigo-600 dark:text-indigo-500 transition-colors duration-300">
                {' '}
                bord
              </span>
            </h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          <StatCard
            label="Total Employés"
            value={employees.length}
            icon={<FaUsers />}
            color="indigo"
          />
          <StatCard
            label="Participations"
            value={participations.length}
            icon={<FaUserGraduate />}
            color="rose"
          />
          <StatCard
            label="Formations"
            value={formations.length}
            icon={<FaChalkboardTeacher />}
            color="emerald"
          />

          {/* Top Learner Card - Fixed Height & Logic */}
          <div className="relative h-full">
            <div
              onClick={() => setShowTopLearners(!showTopLearners)}
              className="cursor-pointer bg-white dark:bg-[#1e2335] p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-700/50 shadow-xl dark:shadow-none transition-all hover:bg-slate-50 dark:hover:bg-[#252b41] h-full flex flex-col justify-center"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50 dark:bg-[#3c1e5a] text-indigo-600 dark:text-[#a855f7] shrink-0 transition-colors duration-300">
                  <FaTrophy size={22} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                    Top Learner
                  </p>
                  <h5 className="text-lg font-black italic text-slate-800 dark:text-white truncate uppercase tracking-tighter transition-colors duration-300">
                    {topWinners.length > 1
                      ? 'Decouvrir top learners'
                      : topWinners[0]?.name || 'N/A'}
                  </h5>
                </div>
                <FaChevronDown
                  className={`text-slate-400 dark:text-slate-500 transition-transform duration-300 ${showTopLearners ? 'rotate-180' : ''}`}
                />
              </div>
            </div>

            <AnimatePresence>
              {showTopLearners && topWinners.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 mt-4 w-full bg-white dark:bg-[#1e2335] border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl"
                >
                  {topWinners.map((emp, index) => (
                    <div
                      key={index}
                      className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-white/5 border-b border-slate-100 dark:border-slate-700/50 last:border-0 transition-colors"
                    >
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                        {emp.fullName}{' '}
                        <span className="text-indigo-500 dark:text-indigo-400 ml-1">
                          ({emp.count})
                        </span>
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bar Chart */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-800/20 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-200 dark:border-slate-700/50 shadow-2xl dark:shadow-none transition-all duration-300">
            <h3 className="text-xl font-black italic uppercase mb-8 flex items-center gap-3 text-slate-800 dark:text-white transition-colors duration-300">
              <FaChartLine className="text-indigo-500" /> Inscriptions par
              Collaborateur
            </h3>
            <div className="h-[450px] w-full">
              {' '}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={employeePerformance}
                  margin={{ top: 10, right: 10, left: -20, bottom: 60 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                    vertical={false}
                    opacity={0.2}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    tickFormatter={(value) =>
                      value.length > 10 ? `${value.substring(0, 8)}..` : value
                    }
                    tick={{
                      fill: '#94a3b8',
                      fontSize: 11, 
                      fontWeight: '900', 
                      dy: 10, 
                    }}
                    angle={-45} 
                    textAnchor="end"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '15px',
                    }}
                    itemStyle={{ color: '#ffffff', fontWeight: 'bold' }}
                    labelStyle={{
                      color: '#6366f1',
                      fontWeight: 'black',
                      marginBottom: '5px',
                    }}
                  />
                  <Bar
                    dataKey="count"
                    radius={[10, 10, 0, 0]} 
                    barSize={30}
                    activeBar={{ fill: '#ffffff' }}
                  >
                    {employeePerformance.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.count === 0
                            ? '#334155'
                            : COLORS[index % COLORS.length]
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-800/20 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-200 dark:border-slate-700/50 shadow-2xl dark:shadow-none flex flex-col items-center min-h-full transition-all duration-300">
            <h3 className="text-2xl font-black italic uppercase mb-2 tracking-tighter text-slate-800 dark:text-white transition-colors duration-300">
              Part des Formations
            </h3>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Répartition Globale
            </p>

            <div className="h-[280px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formationDistribution}
                    innerRadius={80} 
                    outerRadius={105}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none" 
                  >
                    {formationDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        className="hover:opacity-80 transition-opacity cursor-pointer"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-white italic">
                  {formationDistribution.reduce(
                    (acc, curr) => acc + curr.value,
                    0,
                  )}
                </span>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                  Total Inscr.
                </span>
              </div>
            </div>

            <div className="mt-6 w-full space-y-3 overflow-y-auto max-h-[150px] pr-2 custom-scrollbar">
              {formationDistribution.map((f, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full shadow-lg shadow-black/20 group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-[11px] font-bold text-slate-400 uppercase truncate max-w-[120px]">
                      {f.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Radar Chart */}
          <div className="lg:col-span-12 bg-white dark:bg-slate-800/20 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-700/50 shadow-2xl dark:shadow-none flex flex-col items-center relative overflow-hidden transition-all duration-300">
            <div className="text-center mb-8 relative z-10">
              <h3 className="text-2xl font-black italic uppercase text-slate-800 dark:text-white transition-colors duration-300">
                Équilibre des Formations (Complet)
              </h3>
              <p className="text-slate-500 text-xs font-bold uppercase">
                Vue d'ensemble de tous les cours disponibles
              </p>
            </div>
            <div className="h-[500px] w-full max-w-[800px] relative z-10">
              {' '}
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={radarData}
                >
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} 
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 'auto']}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    name="Participations"
                    dataKey="A"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.5}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff',
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px]" />
          </div>
        </div>
      </div>
    </>
  );
};

const StatCard = ({ label, value, icon, color }) => {
  const schemes = {
    indigo:
      'text-indigo-600 dark:text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20',
    rose: 'text-rose-600 dark:text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20',
    emerald:
      'text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20',
  };
  return (
    <div className="bg-white dark:bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-700/50 shadow-xl dark:shadow-none h-full flex flex-col justify-center transition-all duration-300">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border shrink-0 transition-colors duration-300 ${schemes[color]}`}
      >
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
        {label}
      </p>
      <h3 className="text-4xl font-black italic tracking-tighter text-slate-800 dark:text-white transition-colors duration-300">
        {value}
      </h3>
    </div>
  );
};

export default Dashboard;
