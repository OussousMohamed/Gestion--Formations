import React from 'react';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ExportActionParticipation({ data }) {
  const exportToExcel = () => {
    
    const excelData = data.map((item) => ({
      Collaborateur: item.empNom,
      Formation: item.formSujet,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Participations');
    XLSX.writeFile(workbook, 'Inscriptions_Formations.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Liste des Inscriptions aux Formations', 14, 20);

    const tableColumn = ['Collaborateur', 'Formation'];
    const tableRows = data.map((item) => [item.empNom, item.formSujet]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      headStyles: { fillColor: [79, 70, 229] }, 
      theme: 'striped',
    });

    doc.save('Rapport_Inscriptions.pdf');
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={exportToExcel}
        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95 text-xs"
      >
        <FaFileExcel size={14} /> <span>Excel</span>
      </button>
      <button
        onClick={exportToPDF}
        className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95 text-xs"
      >
        <FaFilePdf size={14} /> <span>PDF</span>
      </button>
    </div>
  );
}
