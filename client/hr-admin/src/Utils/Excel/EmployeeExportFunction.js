import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

//EXPORT TO EXCEL
export const exportToExcel = (data, fileName) => {
  if (!data || data.length === 0) return;

  const headerMap = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "Verified", key: "isVerified" },
    { label: "Image URL", key: "imgURL" },
    { label: "Active", key: "active" },
    { label: "Employee Status", key: "employeeStatus" },
    { label: "Staff ID", key: "bioData.staffId" },
    { label: "Created At", key: "createdAt" },
  ];

  const formattedData = data.map((item) => {
    const row = {};
    headerMap.forEach(({ label, key }) => {
      // Support nested keys like "bioData.staffId"
      const keys = key.split(".");
      let value = item;
      for (const k of keys) {
        value = value ? value[k] : undefined;
      }

      // format dates nicely
      if (value instanceof Date) {
        value = new Date(value).toLocaleDateString();
      } else if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
        // If it's an ISO date string, format it
        value = new Date(value).toLocaleDateString();
      }

      row[label] = value ?? "";
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(blob, `Report_${fileName}.xlsx`);
};
