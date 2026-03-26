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
  const [selectedGrade, setSelectedGrade] = useState('All');

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

  // ألوان موحدة للمبيانات
  const COLORS = [
    '#6366f1',
    '#a855f7',
    '#ec4899',
    '#f43f5e',
    '#f59e0b',
    '#10b981',
  ];

  // 1. استخراج الرتب الفريدة
  const grades = useMemo(() => {
    const allGrades = employees.map((emp) => emp.grade).filter(Boolean);
    return ['All', ...new Set(allGrades)];
  }, [employees]);

  // 2. تصفية وحساب أداء الموظفين للمبيان (Bar Chart)
  const filteredEmployeePerformance = useMemo(() => {
    let filtered = employees;
    if (selectedGrade !== 'All') {
      filtered = employees.filter((emp) => emp.grade === selectedGrade);
    }
    return filtered
      .map((emp) => ({
        name: emp.nom.split(' ')[0],
        fullName: emp.nom,
        count: participations.filter((p) => String(p.idemp) === String(emp.id))
          .length,
      }))
      .sort((a, b) => b.count - a.count);
  }, [employees, participations, selectedGrade]);

  // 3. حساب الفائزين (Top Winners)
  const topWinners = useMemo(() => {
    const allPerf = employees
      .map((emp) => ({
        name: emp.nom.split(' ')[0],
        fullName: emp.nom,
        count: participations.filter((p) => String(p.idemp) === String(emp.id))
          .length,
      }))
      .sort((a, b) => b.count - a.count);

    if (allPerf.length === 0 || allPerf[0].count === 0) return [];
    return allPerf.filter((emp) => emp.count === allPerf[0].count);
  }, [employees, participations]);

  // 4. توزيع التكوينات (Pie Chart)
  const formationDistribution = useMemo(() => {
    return formations
      .map((f) => ({
        name: f.Sujet,
        value: participations.filter((p) => String(p.idform) === String(f.id))
          .length,
      }))
      .filter((f) => f.value > 0);
  }, [formations, participations]);

  // 5. بيانات مبيان الرادار
  const radarData = useMemo(() => {
    return formations.map((f) => ({
      subject: f.Sujet.length > 12 ? f.Sujet.substring(0, 10) + '..' : f.Sujet,
      A: participations.filter((p) => String(p.idform) === String(f.id)).length,
    }));
  }, [formations, participations]);

  if (empLoading || formLoading || partLoading) return <Spiner />;

  return (
    <>
      <div className="fixed inset-0 bg-slate-50 dark:bg-[#0f172a] z-0 transition-colors duration-300" />
      <div className="relative z-10 -mt-20 pt-28 lg:pt-32 px-6 lg:px-10 min-h-screen text-slate-800 dark:text-slate-200 font-sans space-y-10 pb-20 transition-colors duration-300">
        {/* Header */}
        <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase">
          Tableau du{' '}
          <span className="text-indigo-600 dark:text-indigo-500">bord</span>
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          {/* Top Learner Card */}
          <div className="relative h-full">
            <div
              onClick={() => setShowTopLearners(!showTopLearners)}
              className="cursor-pointer bg-white dark:bg-[#1e2335] p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-700/50 shadow-xl flex items-center gap-4 h-full"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50 dark:bg-[#3c1e5a] text-indigo-600 dark:text-[#a855f7]">
                <FaTrophy size={22} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  Top Learner
                </p>
                <h5 className="text-lg font-black italic text-slate-800 dark:text-white truncate uppercase tracking-tighter">
                  {topWinners.length > 1
                    ? 'Multiples'
                    : topWinners[0]?.name || 'N/A'}
                </h5>
              </div>
              <FaChevronDown
                className={`text-slate-400 transition-transform ${showTopLearners ? 'rotate-180' : ''}`}
              />
            </div>
            <AnimatePresence>
              {showTopLearners && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 mt-4 w-full bg-white dark:bg-[#1e2335] border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden"
                >
                  {topWinners.map((emp, i) => (
                    <div
                      key={i}
                      className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/50 last:border-0 font-bold text-sm"
                    >
                      {emp.fullName}{' '}
                      <span className="text-indigo-500 ml-1">
                        ({emp.count})
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bar Chart with Grade Filter */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-800/20 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-200 dark:border-slate-700/50 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h3 className="text-xl font-black italic uppercase flex items-center gap-3 text-slate-800 dark:text-white">
                <FaChartLine className="text-indigo-500" /> Inscriptions /
                Collaborateur
              </h3>

              {/* Select Input Filter */}
              <div className="relative group min-w-[180px]">
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 text-[10px] font-black uppercase tracking-widest py-3 px-4 rounded-2xl appearance-none cursor-pointer outline-none border border-transparent focus:border-indigo-500 transition-all"
                >
                  {grades.map((g) => (
                    <option key={g} value={g}>
                      {g === 'All' ? 'Tous les Grades' : g}
                    </option>
                  ))}
                </select>
                <FaChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={10}
                />
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredEmployeePerformance}
                  margin={{ top: 10, right: 10, left: -20, bottom: 40 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                    vertical={false}
                    opacity={0.1}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: '900' }}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '15px',
                      border: 'none',
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={32}>
                    {filteredEmployeePerformance.map((entry, index) => (
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
          <div className="lg:col-span-4 bg-white dark:bg-slate-800/20 backdrop-blur-xl p-8 rounded-[3rem] border border-slate-200 dark:border-slate-700/50 shadow-2xl flex flex-col items-center">
            <h3 className="text-xl font-black italic uppercase text-slate-800 dark:text-white mb-6">
              Part des Formations
            </h3>
            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formationDistribution}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {formationDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-white italic">
                  {formationDistribution.reduce((a, b) => a + b.value, 0)}
                </span>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                  Inscriptions
                </span>
              </div>
            </div>
            <div className="mt-6 w-full space-y-2 overflow-y-auto max-h-[150px] custom-scrollbar">
              {formationDistribution.map((f, i) => (
                <div key={i} className="flex justify-between items-center px-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-[10px] font-bold text-slate-400 uppercase truncate max-w-[100px]">
                      {f.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-2 rounded-md">
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Radar Chart */}
          <div className="lg:col-span-12 bg-white dark:bg-slate-800/20 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-700/50 shadow-2xl flex flex-col items-center relative overflow-hidden">
            <h3 className="text-2xl font-black italic uppercase text-slate-800 dark:text-white mb-8">
              Équilibre des Formations
            </h3>
            <div className="h-[450px] w-full max-w-[700px]">
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
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const StatCard = ({ label, value, icon, color }) => {
  const schemes = {
    indigo:
      'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20',
    rose: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20',
    emerald:
      'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20',
  };
  return (
    <div className="bg-white dark:bg-slate-800/40 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-700/50 shadow-xl flex flex-col justify-center">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${schemes[color]}`}
      >
        {icon}
      </div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
        {label}
      </p>
      <h3 className="text-4xl font-black italic text-slate-800 dark:text-white tracking-tighter">
        {value}
      </h3>
    </div>
  );
};

export default Dashboard;
