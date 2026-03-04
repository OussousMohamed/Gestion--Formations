import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaCalendarPlus,
} from 'react-icons/fa';
import {
  fetchFormations,
  deleteFormation,
  addFormation,
  updateFormation,
} from '../features/formationSlice';
import { fetchParticipations } from '../features/participationSlice'; 
import Paginnation from './Paginnation';
import FormationModal from './FormationModal';
import TableSkeleton from './TableSkeleton';
import DeleteConfirmed from './DeleteConfirmed';
import toast from 'react-hot-toast';
import FormationStats from './FormationState';
import FormationFilterBar from './FormationFiltrBar';

const FormationList = () => {
  const dispatch = useDispatch();

  
  const { formations: list } = useSelector((state) => state.formations);
  const { participations } = useSelector((state) => state.participations);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [currentFormation, setCurrentFormation] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formationToDelete, setFormationToDelete] = useState(null);

  // Filter State
  const [filters, setFilters] = useState({
    search: '',
    etat: '',
    datedebut: '',
    datefin: '',
  });

  const handleSearch = (val) => setFilters({ ...filters, search: val });
  const handleFilterChange = (name, val) =>
    setFilters({ ...filters, [name]: val });
  const handleReset = () =>
    setFilters({ search: '', etat: '', datedebut: '', datefin: '' });

  useEffect(() => {
    dispatch(fetchParticipations());
    dispatch(fetchFormations());
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  
  const filteredFormations = list?.filter((form) => {
    return (
      (!filters.search ||
        form.Sujet.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.etat || form.etat === filters.etat) &&
      (!filters.datedebut || form.datedebut >= filters.datedebut) &&
      (!filters.datefin || form.datefin <= filters.datefin)
    );
  });

  
  const formationsWithStats = filteredFormations?.map((form) => ({
    ...form,
    participantsCount:
      participations?.filter((p) => String(p.idform) === String(form.id))
        .length || 0,
  }));

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    formationsWithStats?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Modal Handlers
  const handleOpenModal = (formation = null) => {
    setCurrentFormation(formation);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentFormation(null);
  };

  const handleSaveFormation = async (formData) => {
    try {
      if (currentFormation) {
        await dispatch(
          updateFormation({ ...currentFormation, ...formData }),
        ).unwrap();
        toast.success('Formation mise à jour !');
      } else {
        const maxId =
          list.length > 0 ? Math.max(...list.map((f) => Number(f.id))) : 0;
        await dispatch(
          addFormation({ ...formData, id: String(maxId + 1) }),
        ).unwrap();
        toast.success('Formation ajoutée !');
      }
      handleCloseModal();
    } catch (error) {
      toast.error("Erreur d'enregistrement");
    }
  };

  const handleDeleteClick = (formation) => {
    setFormationToDelete(formation);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (formationToDelete) {
      try {
        await dispatch(deleteFormation(formationToDelete.id)).unwrap();
        toast.success('Formation supprimée !');
        setShowDeleteModal(false);
      } catch (error) {
        toast.error('Erreur de suppression');
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-50 dark:bg-slate-900 z-0" />
      <div className="relative z-10 p-8 min-h-screen font-sans pb-20">
        <DeleteConfirmed
          show={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          item={formationToDelete?.id}
          itemName={formationToDelete?.Sujet}
        />

        <AnimatePresence>
          {showModal && (
            <FormationModal
              show={showModal}
              handleClose={handleCloseModal}
              handleSave={handleSaveFormation}
              initialData={currentFormation}
            />
          )}
        </AnimatePresence>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              List des Formations
            </h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/30 transition-all font-bold"
          >
            <FaPlus /> Ajouter une formation
          </motion.button>
        </div>

        <FormationStats formations={list} />

        <FormationFilterBar
          filteredData={formationsWithStats}
          filters={filters}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />

        {/* Table Container */}
        {loading ? (
          <TableSkeleton />
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-6 transition-all">
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead className="bg-slate-50/50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                      ID
                    </th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                      Sujet
                    </th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                      Date Début
                    </th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                      Date Fin
                    </th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                      Participants
                    </th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                      État
                    </th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                      Actions
                    </th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  <AnimatePresence mode="wait">
                    {currentItems.map((form) => (
                      <motion.tr
                        key={form.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors duration-200 group"
                      >
                        {/* ID */}
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-slate-400 bg-slate-100 dark:bg-slate-700/50 py-1 px-2 rounded-md">
                            #{form.id}
                          </span>
                        </td>

                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex justify-start items-center pl-8">
                            {' '}
                            
                            <div className="flex items-center gap-4 w-full max-w-[300px]">
                              
                              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <FaChalkboardTeacher size={20} />
                              </div>
                              
                              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 transition-colors">
                                {form.Sujet}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Date Debut */}
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            <FaCalendarPlus
                              className="text-indigo-400"
                              size={12}
                            />
                            {form.datedebut}
                          </div>
                        </td>

                        {/* Date Fin */}
                        <td className="px-6 py-4">
                          <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            <FaCalendarAlt className="text-red-400" size={12} />
                            {form.datefin}
                          </div>
                        </td>

                        {/* PARTICIPANTS  */}
                        <td className="px-6 py-4">
                          <div className="flex justify-center items-center gap-4">
                            {/* Number Square */}
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-sm border border-indigo-100 dark:border-indigo-800 shadow-sm">
                              {form.participantsCount}
                            </div>

                            {/* Progress Label & Bar */}
                            <div className="flex flex-col items-start min-w-[80px]">
                              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase leading-none mb-1">
                                Formations
                              </span>
                              <div className="flex items-center gap-2 w-full">
                                {/* Mini Progress Bar */}
                                <div className="w-16 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden border border-slate-200 dark:border-slate-600">
                                  <div
                                    className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                                    style={{
                                      width: `${Math.min(form.participantsCount * 25, 100)}%`,
                                    }}
                                  />
                                </div>
                                <span className="text-[9px] font-black text-indigo-500 uppercase tracking-tighter">
                                  Active
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                              form.etat === 'encours'
                                ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20'
                                : form.etat === 'terminée'
                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20'
                                  : 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20'
                            }`}
                          >
                            {form.etat === 'encours' && (
                              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                            )}
                            {form.etat}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenModal(form)}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm border border-transparent hover:border-indigo-100"
                            >
                              <FaEdit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(form)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm border border-transparent hover:border-red-100"
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && (
          <div className="flex justify-center mt-6 pb-20">
            <Paginnation
              totalItems={formationsWithStats?.length || 0}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FormationList;
