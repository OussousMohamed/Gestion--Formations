import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaUserTie,
} from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import {
  fetchEmployees,
  deleteEmployee,
  addEmployee,
  updateEmployee,
} from '../features/employeeSlice';
import { fetchParticipations } from '../features/participationSlice';
import Paginnation from './Paginnation';
import EmployeeModal from './EmployeeModal';
import Spinner from './Spinner';
import toast from 'react-hot-toast';
import DeleteConfirmed from './DeleteConfirmed';
import EmployeeFiltrage from './EmployeeFiltrage';
import EmployeeStatsSection from './EmployeeStatsSection';
import TableSkeleton from './TableSkeleton';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const { employees: list } = useSelector((state) => state.employees);
  const { participations } = useSelector((state) => state.participations);
  const [loading, setLoading] = useState(true);

  // Merge Data
  const employeesWithStats = list?.map((emp) => ({
    ...emp,
    formationsCount:
      participations?.filter((p) => String(p.idemp) === String(emp.id))
        .length || 0,
  }));

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterGrade, setFilterGrade] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchParticipations());
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Filter Logic
  const filteredList = employeesWithStats
    ? employeesWithStats.filter((employee) => {
        const matchesSearch =
          (employee.nom &&
            employee.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (employee.id && employee.id.toString().includes(searchTerm)) ||
          (employee.grade &&
            employee.grade.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesGenre = filterGenre ? employee.sexe === filterGenre : true;
        const matchesGrade = filterGrade
          ? employee.grade === filterGrade
          : true;

        return matchesSearch && matchesGenre && matchesGrade;
      })
    : [];

  // Calculate Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'sexe') setFilterGenre(value);
    if (filterType === 'grade') setFilterGrade(value);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilterGenre('');
    setFilterGrade('');
    setCurrentPage(1);
  };

  // Modal Handlers
  const handleOpenModal = (employee = null) => {
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEmployee(null);
  };

  const handleSaveEmployee = async (formData) => {
    try {
      if (currentEmployee) {
        await dispatch(
          updateEmployee({ ...currentEmployee, ...formData }),
        ).unwrap();
        toast.success('Employé mis à jour avec succès');
      } else {
        const newId =
          list.length > 0
            ? Math.max(...list.map((e) => Number(e.id) || 0)) + 1
            : 1;
        await dispatch(
          addEmployee({ ...formData, id: String(newId) }),
        ).unwrap();
        toast.success('Employé ajouté avec succès');
      }
      handleCloseModal();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
      console.error(error);
    }
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (employeeToDelete) {
      try {
        await dispatch(deleteEmployee(employeeToDelete.id)).unwrap();
        toast.success('Employé supprimé avec succès');
        setShowDeleteModal(false);
        setEmployeeToDelete(null);
      } catch (error) {
        toast.error('Erreur lors de la suppression');
        console.error(error);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
    }).format(amount);

  return (
    <>
      <div className="fixed inset-0 bg-slate-50 dark:bg-slate-900 z-0" />
      <div className="relative z-10 p-8 min-h-screen font-sans pb-20">
        <DeleteConfirmed
          show={showDeleteModal}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          item={employeeToDelete?.id}
          itemName={employeeToDelete?.nom}
        />
        <AnimatePresence>
          {showModal && (
            <EmployeeModal
              show={showModal}
              handleClose={handleCloseModal}
              handleSave={handleSaveEmployee}
              initialData={currentEmployee}
            />
          )}
        </AnimatePresence>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
              Liste des Employés
            </h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-600 hover:from-indigo-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/30 transition-all font-bold"
          >
            <FaUserPlus /> Ajouter un employé
          </motion.button>
        </div>

        {/*State Section */}
        <EmployeeStatsSection employees={list} />

        {/* Filtrage bar  */}
        <EmployeeFiltrage
          filteredData={filteredList}
          employees={list}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          onAddClick={() => handleOpenModal()}
        />

        {/* Table Container */}
        {loading ? (
          <TableSkeleton />
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Nom Complet
                    </th>
                    <th className="px-6 py-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Sexe
                    </th>
                    <th className="px-6 py-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Salaire
                    </th>
                    <th className="px-6 py-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Nombre de Formations
                    </th>
                    <th className="px-6 py-5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  <AnimatePresence mode="wait">
                    {currentItems.length > 0 ? (
                      currentItems.map((emp) => (
                        <motion.tr
                          key={emp.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="hover:bg-blue-50/50 dark:hover:bg-slate-700/30 transition-colors duration-200 group"
                        >
                          <td className="px-6 py-4">
                            <span className="font-mono text-xs text-slate-400 bg-slate-100 dark:bg-slate-700/50 py-1 px-2 rounded-md">
                              #{emp.id}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center">
                              <div className="flex items-center gap-4 w-full max-w-[200px]">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-sm">
                                  <FaUserAlt size={16} />
                                </div>

                                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                                  {emp.nom}
                                </span>
                              </div>
                            </div>
                          </td>


                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${
                                emp.grade === 'Ingénieur'
                                  ? 'bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-900/20 dark:text-purple-300'
                                  : 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/20 dark:text-emerald-300'
                              }`}
                            >
                              {emp.grade}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex justify-center">
                              <span
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                  emp.sexe === 'm'
                                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                                    : 'bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300'
                                }`}
                              >
                                {emp.sexe === 'm' ? 'Homme' : 'Femme'}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-700 dark:text-slate-200 font-mono tracking-tight">
                              {formatCurrency(emp.salaire)}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex justify-center items-center gap-3">
                              <div
                                className={`
      flex items-center justify-center w-10 h-10 rounded-xl font-black text-sm transition-all
      ${
        emp.formationsCount > 0
          ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 border border-indigo-100 dark:border-indigo-800'
          : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700 opacity-60'
      }
    `}
                              >
                                {emp.formationsCount || 0}
                              </div>

                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                                  Formations
                                </span>
                                <div className="flex items-center gap-1">
                                  <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-indigo-500 rounded-full"
                                      style={{
                                        width: `${Math.min((emp.formationsCount || 0) * 20, 100)}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">
                                    {(emp.formationsCount || 0) >= 5
                                      ? 'Elite'
                                      : 'Active'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleOpenModal(emp)}
                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-indigo-100 hover:shadow-sm rounded-lg transition-all"
                                title="Modifier"
                              >
                                <FaEdit size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(emp)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-white border border-transparent hover:border-red-100 hover:shadow-sm rounded-lg transition-all"
                                title="Supprimer"
                              >
                                <FaTrash size={18} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="py-10 text-center text-slate-400"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <FaUserTie size={40} className="text-slate-200" />
                            <p>Aucun employé trouvé</p>
                          </div>
                        </td>
                      </tr>
                    )}
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
              totalItems={filteredList.length}
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

export default EmployeeList;
