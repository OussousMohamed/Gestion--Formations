import React from 'react';
import { FaTimes, FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa';

const EmployeeDetailModal = ({
  show,
  onClose,
  employee,
  participations,
  formations,
}) => {
  if (!show || !employee) return null;

  const participationDetails = participations
    .filter((p) => String(p.idemp) === String(employee.id))
    .map((p) => {
      const form = formations.find((f) => String(f.id) === String(p.idform));
      return { ...p, ...form };
    });


  const getStatusConfig = (etat) => {
    const status = etat?.toLowerCase().replace(/\s+/g, '');

    switch (status) {
      case 'terminé':
        return {
          style:
            'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
          icon: <FaCheckCircle size={10} />,
        };
      case 'programmée':
        return {
          style: 'bg-blue-500/10 text-blue-600 border border-blue-500/20',
          icon: <FaCalendarAlt size={10} />,
        };
      default: // Encours
        return {
          style: 'bg-amber-500/10 text-amber-600 border border-amber-500/20',
          icon: <FaClock size={10} />,
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl relative border border-slate-700/50">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-400 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Détails : <span className="text-indigo-500">{employee.nom}</span>
          </h2>
        </div>

        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {participationDetails.length > 0 ? (
            participationDetails.map((item, i) => {
              const statusConfig = getStatusConfig(item.etat);
              return (
                <div
                  key={i}
                  className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700/50"
                >
                  <h4 className="font-bold text-lg text-slate-800 dark:text-white mb-4">
                    {item.Sujet}
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase">
                        Début
                      </span>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <FaCalendarAlt size={12} className="text-slate-400" />{' '}
                        {item.datedebut || 'N/A'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase">
                        Fin
                      </span>
                      <span className="text-sm font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <FaCalendarAlt size={12} className="text-slate-400" />{' '}
                        {item.datefin || 'N/A'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase">
                        Statut
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase w-fit flex items-center gap-1.5 ${statusConfig.style}`}
                      >
                        {statusConfig.icon}
                        {item.etat || 'En cours'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center py-10 text-slate-500 italic">
              Aucune donnée trouvée.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default EmployeeDetailModal;
