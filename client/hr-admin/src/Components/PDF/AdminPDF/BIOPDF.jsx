import React, { useState } from "react";
import logo from "../dplace.png";
import { styles } from "../PDF";
import { axiosFetch } from "../../../Utils/axiosFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import PageLoading from "../../Checks/PageLoading";
// import { useGlobalContext } from "../../../Context/userContext";
import { Page, Text, View, Document, PDFViewer, Image, PDFDownloadLink } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";

const BioPDF = () => {
  //   const { user } = useGlobalContext();
  const location = useLocation();
  const [pdfData, setPDFData] = useState();

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");

  // console.log(userId); // This gives you: 6862553af3f401309aaca379

  const { isLoading, error } = useQuery({
    queryKey: ["bioDataKey"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: true, //do not refetch on window focus
    refetchOnReconnect: true, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: true, //do not refetch at intervals
    refetchIntervalInBackground: true, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get(`/admins/getAllBioDataPerUser/${userId}`);
      // console.log(data);
      setPDFData(data.AllBioDataPerUser[0]);
      // console.log(data.AllBioDataPerUser[0]);
      return data;
    },
  });
  if (error) {
    toast.error(
      <div>
        <span>
          {error.response ? error.response.data.msg : "Something went wrong contact Admin"}
        </span>
      </div>,
      {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastBad",
      }
    );
  }

  //   if (user) {
  //     console.log(user);
  //   }

  const InvoicePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={logo} style={styles.watermarkImage} />
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>BIO DATA</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>First Name</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.firstName ? pdfData.firstName : "First Name"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Middle Name</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.middleName ? pdfData.middleName : "Middle Name"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Last Name</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.lastName ? pdfData.lastName : "Last Name"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Gender</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.gender ? pdfData.gender : "Gender"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Date of Birth</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.dateOfBirth
                  ? pdfData.dateOfBirth.split("T")[0]
                  : "Date of Birth"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>State of Origin</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.state_of_origin ? pdfData.state_of_origin : "Origin"} State
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Marital Status</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.maritalStatus ? pdfData.maritalStatus : "Marital Status"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Spouse Name</Text>
              <Text style={styles.valueTag}>
                {" "}
                {pdfData && pdfData.spouseName ? pdfData.spouseName : "Spouse Name"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Phone Number</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.phoneNumber ? pdfData.phoneNumber : "Phone Number"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Bank Name</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.bankName ? pdfData.bankName : "Bank Name"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Account Number</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.bankAccountNumber
                  ? pdfData.bankAccountNumber
                  : "Account Number"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Pension</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.pension ? pdfData.pension : "Pension"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Pension Company</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.pensionCompany ? pdfData.pensionCompany : "Pension Company"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Pension Pin</Text>
              <Text style={styles.valueTag}>
                {" "}
                {pdfData && pdfData.pensionPin ? pdfData.pensionPin : "Pension Pin"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Level of Education</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.levelOfEducation
                  ? pdfData.levelOfEducation
                  : "Level of Education"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Email</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.email ? pdfData.email : "Email"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Home Address</Text>
              <Text style={styles.valueTag}>
                {pdfData && pdfData.houseAddress ? pdfData.houseAddress : "House Address"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
        </View>
      </Page>
    </Document>
  );

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div>
      <div className="pdfContainer">
        <PDFViewer width="100%" height="100%">
          <InvoicePDF />
        </PDFViewer>
      </div>
      <PDFDownloadLink document={<InvoicePDF />} fileName="bioData.pdf">
        <button type="submit" className="PDFsubmitBtn" formNoValidate>
          DOWNLOAD
        </button>
      </PDFDownloadLink>
    </div>
  );
};

export default BioPDF;
