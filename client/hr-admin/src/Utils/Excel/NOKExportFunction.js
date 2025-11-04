import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

//EXPORT TO EXCEL
export const exportToExcel = (data, fileName) => {
  if (!data || data.length === 0) return;
  // console.log(data);
  const headerMap = [
    { label: "First Name", key: "nextOfKinFirstName" },
    { label: "Last Name", key: "nextOfKinLastName" },
    { label: "Relationship", key: "nextOfKinRelationship" },
    { label: "Gender", key: "gender" },
    { label: "Address", key: "houseAddress" },
    { label: "Phone Number", key: "phoneNumber" },
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
  // console.log(worksheet);
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
