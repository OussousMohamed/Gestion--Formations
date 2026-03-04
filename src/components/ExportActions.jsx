import React from 'react';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; 

export default function ExportActions({ data }) {
  const exportToExcel = () => {
    const excelData = data.map((emp) => ({
      Nom: emp.nom,
      Sexe: emp.sexe === 'm' ? 'Homme' : 'Femme',
      Grade: emp.grade,
      Salaire: `${emp.salaire} DH`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employés');
    XLSX.writeFile(workbook, 'Liste_Employes.xlsx');
  };

  const exportToPDF = () => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text('Liste des Employés', 14, 20);

      const tableColumn = ['Nom Complet', 'Sexe', 'Grade', 'Salaire'];
      const tableRows = data.map((emp) => [
        emp.nom,
        emp.sexe === 'm' ? 'Homme' : 'Femme',
        emp.grade,
        `${emp.salaire} DH`,
      ]);

      
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        headStyles: { fillColor: [37, 99, 235] },
        theme: 'striped',
      });

      doc.save('Rapport_Employes.pdf');
    } catch (error) {
      console.error('Erreur PDF:', error);
      alert('Erreur lors de la génération du PDF. Vérifiez la console.');
    }
  };

  return (
    
    <div className="flex items-center gap-3">
      <button
        onClick={exportToExcel}
        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95 text-sm"
      >
        <FaFileExcel size={16} /> <span>Excel</span>
      </button>

      <button
        onClick={exportToPDF}
        className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95 text-sm"
      >
        <FaFilePdf size={16} /> <span>PDF</span>
      </button>
    </div>
  );
}
