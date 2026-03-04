import React from 'react';
import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-20 h-20 border-4 border-slate-200 dark:border-slate-700 border-t-indigo-600 rounded-full"
        />

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute w-8 h-8 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200 dark:shadow-none"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex flex-col items-center gap-2"
      >
        <span className="text-lg font-bold text-slate-800 dark:text-white tracking-widest uppercase">
          EduManage
        </span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              className="w-1.5 h-1.5 bg-blue-600 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Spinner;
