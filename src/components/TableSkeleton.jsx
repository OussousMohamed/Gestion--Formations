import React from 'react';

const TableSkeleton = () => {
  const rows = Array(5).fill(0);

  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm animate-pulse">
      <div className="h-16 bg-slate-50 dark:bg-slate-900/50 flex items-center px-8 gap-4">
        <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
        <div className="h-4 w-1/6 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
        <div className="h-4 w-1/6 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
        <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-700 rounded-lg ml-auto"></div>
      </div>

      {rows.map((_, index) => (
        <div
          key={index}
          className="h-20 flex items-center px-8 gap-6 border-t border-slate-50 dark:border-slate-700/50"
        >
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700"></div>

          <div className="flex-1 space-y-3">
            <div className="h-4 w-48 bg-slate-100 dark:bg-slate-700 rounded-lg"></div>
            <div className="h-3 w-32 bg-slate-50 dark:bg-slate-800 rounded-lg"></div>
          </div>

          <div className="h-8 w-24 bg-slate-100 dark:bg-slate-700 rounded-xl"></div>
          <div className="h-8 w-32 bg-slate-100 dark:bg-slate-700 rounded-xl"></div>

          <div className="flex gap-2 ml-auto">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800"></div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
