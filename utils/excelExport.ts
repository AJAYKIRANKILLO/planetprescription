
import * as XLSX from 'xlsx';

export const exportToExcel = (data: any[], fileName: string) => {
  try {
    // 1. Create a new workbook
    const workbook = XLSX.utils.book_new();

    // 2. Convert JSON data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 3. Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // 4. Write file and trigger download
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  } catch (error) {
    console.error("Export failed:", error);
    alert("Failed to export data. Please try again.");
  }
};
