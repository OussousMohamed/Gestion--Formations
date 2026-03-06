import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaUserAlt,
  FaBriefcase,
  FaVenusMars,
  FaMoneyBillWave,
} from 'react-icons/fa';
import toast from 'react-hot-toast';


export default function EmployeeModal({
  show,
  handleClose,
  handleSave,
  initialData,
}) {
  const [formData, setFormData] = useState({
    nom: '',
    grade: 'Technicien',
    sexe: 'm',
    salaire: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ nom: '', grade: 'Technicien', sexe: 'm', salaire: '' });
    }
  }, [initialData, show]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.salaire < 2000) {
      toast.error('Le salaire doit etre > 2000');
      return; 
    }
    handleSave(formData);
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {initialData ? 'Update Employee' : 'Add New Employee'}
              </h3>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-5">
                {/* Nom */}
                <div className="relative">
                  <label className="text-sm font-semibold text-slate-500 mb-1 block mr-1">
                   Nom de l'employé
                  </label>
                  <div className="relative">
                    <FaUserAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Entrez le nom de l'employé"
                      className="w-full pr-12 pl-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                      required
                    />
                  </div>
                </div>

                {/* Grade */}
                <div>
                  <label className="text-sm font-semibold text-slate-500 mb-1 block mr-1">
                   Grade
                  </label>
                  <div className="relative">
                    <FaBriefcase className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      className="w-full pr-12 pl-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white appearance-none"
                    >
                      <option value="Technicien">Technicien</option>
                      <option value="Ingénieur">Ingénieur</option>
                      <option value="Doctor">Doctor</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Sexe */}
                  <div>
                    <label className="text-sm font-semibold text-slate-500 mb-1 block mr-1">
                      Sexe
                    </label>
                    <div className="relative">
                      <FaVenusMars className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        name="sexe"
                        value={formData.sexe}
                        onChange={handleChange}
                        className="w-full pr-12 pl-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white appearance-none"
                      >
                        <option value="m">Masculin</option>
                        <option value="f">Féminin</option>
                      </select>
                    </div>
                  </div>

                  {/* salaire */}
                  <div>
                    <label className="text-sm font-semibold text-slate-500 mb-1 block mr-1">
                      Salaire (DH)
                    </label>
                    <div className="relative">
                      <FaMoneyBillWave className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="number"
                        name="salaire"
                        value={formData.salaire}
                        onChange={handleChange}
                        className="w-full pr-12 pl-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-10">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 px-6 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                >
                  Anuller
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-3 px-6 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none transition-all"
                >
                  {initialData ? 'Sauvegarder les modifications' : 'Ajouter un employé'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
