import React from 'react';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ExportActionFormation({ data }) {
  const exportToExcel = () => {
    const excelData = data.map((form) => ({
      Sujet: form.Sujet,
      'Date Début': form.datedebut,
      'Date Fin': form.datefin,
      État: form.etat,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Formations');
    XLSX.writeFile(workbook, 'Liste_Formations.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Liste des Formations', 14, 20);

    const tableColumn = ['Sujet', 'Date Début', 'Date Fin', 'État'];
    const tableRows = data.map((form) => [
      form.Sujet,
      form.datedebut,
      form.datefin,
      form.etat,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      headStyles: { fillColor: [79, 70, 229] }, 
      theme: 'striped',
    });

    doc.save('Rapport_Formations.pdf');
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
