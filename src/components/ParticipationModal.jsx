import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSave,
  FaLink,
} from 'react-icons/fa';

export default function ParticipationModal({
  show,
  onClose,
  onSave,
  initialData,
  employes = [],
  formations = [],
}) {
  const [formData, setFormData] = useState({
    idemp: '',
    idform: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        idemp: initialData.idemp || '',
        idform: initialData.idform || '',
      });
    } else {
      setFormData({ idemp: '', idform: '' });
    }
  }, [initialData, show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSave = {
      ...formData,
      idemp: Number(formData.idemp),
      idform: Number(formData.idform),
    };

    if (initialData?.id) {
      dataToSave.id = initialData.id;
    }

    onSave(dataToSave);
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                  <FaLink size={20} />
                </div>
                <h2 className="text-xl font-black tracking-tight">
                  {initialData
                    ? "Modifier l'Inscription"
                    : 'Nouvelle Inscription'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                type="button"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  <FaUserGraduate size={12} className="text-indigo-500" />
                  Collaborateur
                </label>
                <div className="relative">
                  <select
                    required
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold text-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none cursor-pointer"
                    value={formData.idemp}
                    onChange={(e) =>
                      setFormData({ ...formData, idemp: e.target.value })
                    }
                  >
                    <option value="">Sélectionner un employé</option>
                    {employes.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.nom} {emp.grade ? `- ${emp.grade}` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  <FaChalkboardTeacher size={12} className="text-indigo-500" />
                  Programme de Formation
                </label>
                <div className="relative">
                  <select
                    required
                    className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold text-slate-700 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none cursor-pointer"
                    value={formData.idform}
                    onChange={(e) =>
                      setFormData({ ...formData, idform: e.target.value })
                    }
                  >
                    <option value="">Sélectionner une formation</option>
                    {formations.map((form) => (
                      <option key={form.id} value={form.id}>
                        {form.Sujet}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!formData.idemp || !formData.idform}
                  className="flex-[2] py-4 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave size={14} />
                  {initialData ? 'Mettre à jour' : 'Confirmer'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
