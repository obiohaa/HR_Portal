import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

//EXPORT TO EXCEL
export const exportToExcel = (data, fileName) => {
  if (!data || data.length === 0) return;

  const headerMap = [
    { label: "First Name", key: "firstName" },
    { label: "Middle Name", key: "middleName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Date of Birth", key: "dateOfBirth" },
    { label: "State of Origin", key: "state_of_origin" },
    { label: "Gender", key: "gender" },
    { label: "Marital Status", key: "maritalStatus" },
    { label: "Spouse Name", key: "spouseName" },
    { label: "Address", key: "houseAddress" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Bank Name", key: "bankName" },
    { label: "Bank Account", key: "bankAccountNumber" },
    { label: "Pension", key: "pension" },
    { label: "Pension Company", key: "pensionCompany" },
    { label: "Pension PIN", key: "pensionPin" },
    { label: "Education Level", key: "levelOfEducation" },
    { label: "File URL", key: "UserFileUrl" },
  ];

  const formattedData = data.map((item) => {
    const row = {};
    headerMap.forEach(({ label, key }) => {
      let value = item[key];
      if (value instanceof Date) {
        value = new Date(value).toLocaleDateString(); // format date
      }
      row[label] = value ?? ""; // handle undefined/null
    });
    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  console.log(worksheet);
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

//EXPORT TO CSV
// export const exportToCSV = (data, fileName) => {
//   if (!data || data.length === 0) return;

//   const csvContent = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(data));
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

//   saveAs(blob, `Report_${fileName}.csv`);
// };
