import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

//EXPORT TO EXCEL
export const exportToExcel = (data, fileName) => {
  if (!data || data.length === 0) return;

  const headerMap = [
    { label: "Full Name", key: "fullName" },
    { label: "Employer", key: "employer" },
    { label: "Occupation", key: "occupation" },
    { label: "EmailOne", key: "guarantorOneEmail" },
    { label: "EmailTwo", key: "guarantorTwoEmail" },
    { label: "House Address", key: "houseAddress" },
    { label: "Employer Address", key: "employerAddress" },
    { label: "25-55 years", key: "ageRange" },
    { label: "Uniform Public Servant", key: "uniformedPublicServant" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Employee Full Name", key: "employeeFullName" },
    { label: "Employee Designation", key: "employeeDesignation" },
    { label: "Outlet Employed", key: "outletEmployed" },
    { label: "Policy Signed", key: "signedPolicy" },
    { label: "ID CARD", key: "identificationCard" },
    { label: "Passport Image", key: "passport" },
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
