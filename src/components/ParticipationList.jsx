import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaPlus,
  FaTrash,
  FaEdit,
  FaArrowRight,
  FaUsers,
  FaBookOpen,
} from 'react-icons/fa';
import { fetchEmployees } from '../features/employeeSlice';
import { fetchFormations } from '../features/formationSlice';
import {
  fetchParticipations,
  addParticipation,
  deleteParticipation,
  updateParticipation,
} from '../features/participationSlice';
import ParticipationModal from './ParticipationModal';
import DeleteConfirmed from './DeleteConfirmed';
import TableSkeleton from './TableSkeleton';
import Paginnation from './Paginnation';
import ParticipationFilterBar from './ParticipationFilterBar';
import ExportActionParticipation from './ExportActionParticipation';
import toast from 'react-hot-toast';
import ParticipationStats from './ParticipationStats';

export default function ParticipationList() {
  const dispatch = useDispatch();
  const { participations = [], loading: partLoading } = useSelector(
    (state) => state.participations,
  );
  const { employees: employes = [] } = useSelector((state) => state.employees);
  const { formations = [] } = useSelector((state) => state.formations);

  const [loading, setLoading] = useState(true);
  const [searchEmp, setSearchEmp] = useState('');
  const [searchForm, setSearchForm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modals State
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentParticipation, setCurrentParticipation] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [participationToDelete, setParticipationToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchFormations());
    dispatch(fetchEmployees());
    dispatch(fetchParticipations());
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const filteredList = (participations || []).filter((p) => {
    const emp = employes?.find((e) => String(e.id) === String(p.idemp));
    const form = formations?.find((f) => String(f.id) === String(p.idform));

    const matchEmp =
      emp?.nom?.toLowerCase().includes(searchEmp.toLowerCase()) ?? false;
    const matchForm =
      form?.Sujet?.toLowerCase().includes(searchForm.toLowerCase()) ?? false;

    return matchEmp && matchForm;
  });

  const dataForExport = filteredList.map((p) => ({
    ...p,
    empNom:
      employes.find((e) => String(e.id) === String(p.idemp))?.nom || 'Inconnu',
    formSujet:
      formations.find((f) => String(f.id) === String(p.idform))?.Sujet ||
      'Inconnu',
  }));

  const currentItems = filteredList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSave = async (data) => {
    try {
      if (isEdit) {
        await dispatch(
          updateParticipation({ id: currentParticipation.id, ...data }),
        ).unwrap();
        toast.success('Inscription mise à jour !');
      } else {
        const alreadyExists = participations.find(
          (p) =>
            String(p.idemp) === String(data.idemp) &&
            String(p.idform) === String(data.idform),
        );
        if (alreadyExists) return toast.error('Déjà inscrit !');

        const maxId =
          participations.length > 0
            ? Math.max(...participations.map((p) => Number(p.id) || 0))
            : 0;
        const newId = String(maxId + 1);

        await dispatch(addParticipation({ ...data, id: newId })).unwrap();
        toast.success('Mouvement enregistré !');
      }
      setShowModal(false);
    } catch {
      toast.error("Erreur d'opération");
    }
  };

  if (loading || partLoading)
    return (
      <div className="p-8">
        <TableSkeleton />
      </div>
    );

  return (
    <>
      <div className="fixed inset-0 bg-slate-50 dark:bg-slate-900 z-0" />
      <div className="relative z-10 p-8 min-h-screen font-sans pb-20">
        <DeleteConfirmed
          show={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => {
            dispatch(deleteParticipation(participationToDelete.id));
            toast.success('Supprimé !');
            setShowDeleteModal(false);
          }}
          itemName="cette inscription"
        />

        {/* Modals */}
        <ParticipationModal
          show={showModal}
          onClose={() => setShowModal(false)}
          initialData={currentParticipation}
          employes={employes}
          formations={formations}
          onSave={handleSave}
          isEdit={isEdit}
        />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              Liste des Inscriptions
            </h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsEdit(false);
              setCurrentParticipation(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl shadow-lg shadow-indigo-500/30 transition-all font-bold"
          >
            <FaPlus /> Nouvelle Inscription
          </motion.button>
        </div>

        <ParticipationStats
          participations={participations}
          formations={formations}
          employes={employes}
        />

        <ParticipationFilterBar
          filteredData={dataForExport} 
          onSearchEmp={setSearchEmp}
          onSearchForm={setSearchForm}
          onReset={() => {
            setSearchEmp('');
            setSearchForm('');
          }}
          searchEmp={searchEmp}
          searchForm={searchForm}
        />

        {/* Main Table Card */}
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    ID
                  </th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Participant
                  </th>

                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Formation
                  </th>
                  <th className="px-8 py-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                <AnimatePresence mode="popLayout">
                  {currentItems.map((p, index) => {
                    const emp = employes?.find(
                      (e) => String(e.id) === String(p.idemp),
                    );
                    const form = formations?.find(
                      (f) => String(f.id) === String(p.idform),
                    );

                    return (
                      <motion.tr
                        key={p.id || index} 
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{
                          opacity: 0,
                          scale: 0.98,
                          transition: { duration: 0.2 },
                        }}
                        className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors group"
                      >
                        <td className="px-8 py-5">
                          <span className="font-mono text-xs text-slate-400 bg-slate-100 dark:bg-slate-700/50 py-1 px-2 rounded-md">
                            #{p.id}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
                              {emp?.nom.substring(0, 2).toUpperCase()}
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                              {emp?.nom}
                            </span>
                          </div>
                        </td>

                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600">
                              <FaBookOpen size={14} />
                            </div>
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 italic">
                              {form?.Sujet}
                            </span>
                          </div>
                        </td>

                        <td className="px-8 py-5">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => {
                                setIsEdit(true);
                                setCurrentParticipation(p);
                                setShowModal(true);
                              }}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all border border-transparent hover:border-indigo-100 shadow-sm"
                            >
                              <FaEdit size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setParticipationToDelete(p);
                                setShowDeleteModal(true);
                              }}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all border border-transparent hover:border-red-100 shadow-sm"
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <Paginnation
            totalItems={filteredList.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}
