import * as XLSX from 'xlsx';

export function generateExcelFilename() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `Export_${year}_${month}_${day}.xlsx`;
}

export async function exportToExcel(data, headers) {
  try {
    // Convert data to worksheet format
    const ws = XLSX.utils.aoa_to_sheet([
      headers,
      ...data.map(contact => contact.data)
    ]);

    // Apply header styling
    const headerRange = XLSX.utils.decode_range(ws['!ref']);
    const headerStyle = {
      fill: { fgColor: { rgb: "4472C4" } },
      font: { color: { rgb: "FFFFFF" }, bold: true },
      alignment: { horizontal: "center" }
    };

    // Apply style to each header cell
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!ws[cellRef].s) ws[cellRef].s = {};
      Object.assign(ws[cellRef].s, headerStyle);
    }

    // Create workbook and append worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contacts');

    // Generate buffer and create blob
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create download link and trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = generateExcelFilename();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Export failed:', error);
    return false;
  }
}
