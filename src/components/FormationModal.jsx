import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaChalkboardTeacher,
  FaCalendarPlus,
  FaSave,
} from 'react-icons/fa';
import toast from 'react-hot-toast';




export default function FormationModal({
  show,
  handleClose,
  handleSave,
  initialData,
}) {
  const [formData, setFormData] = useState({
    Sujet: '',
    datedebut: '',
    datefin: '',
    etat: 'programmée',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData({
        Sujet: '',
        datedebut: '',
        datefin: '',
        etat: 'programmée',
      });
    }
  }, [initialData, show]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // داخل دالة handleSubmit في FormationModal
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. تحويل التواريخ لمقارنتها بدقة (بدون توقيت الساعات)
    const today = new Date().setHours(0, 0, 0, 0);
    const start = new Date(formData.datedebut).setHours(0, 0, 0, 0);
    const end = new Date(formData.datefin).setHours(0, 0, 0, 0);

    // 2. التحقق من منطقية التواريخ (Validation)
    if (end < start) {
      toast.error('La date de fin لا يمكن أن تكون قبل تاريخ البداية !');
      return; // إيقاف العملية هنا
    }

    // 3. تحديد الحالة تلقائياً بناءً على تاريخ اليوم
    let autoEtat = 'programmée';

    if (today > end) {
      autoEtat = 'terminée';
    } else if (today >= start && today <= end) {
      autoEtat = 'encours';
    }

    // 4. الحفظ مع الحالة الجديدة
    handleSave({ ...formData, etat: autoEtat });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* الخلفية الضبابية - Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* نافذة الـ Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700"
      >
        {/* Header الفخم */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <FaChalkboardTeacher size={20} />
            </div>
            <h2 className="text-xl font-black tracking-tight">
              {initialData ? 'Modifier la Formation' : 'Nouvelle Formation'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Sujet Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Sujet de formation
            </label>
            <input
              type="text"
              name="Sujet"
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-slate-700 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              placeholder="Ex: Framework React.js"
              value={formData.Sujet}
              onChange={handleChange}
              required
            />
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                Date Début
              </label>
              <input
                type="date"
                name="datedebut"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold text-slate-600 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.datedebut}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                Date Fin
              </label>
              <input
                type="date"
                name="datefin"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold text-slate-600 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.datefin}
                onChange={handleChange}
                min={formData.datedebut} 
                required
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-4 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-200 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-[2] py-4 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <FaSave size={14} />
              {initialData ? 'Mettre à jour' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
