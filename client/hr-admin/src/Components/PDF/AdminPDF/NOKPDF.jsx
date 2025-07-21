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

const NOKPDF = () => {
  //   const { user } = useGlobalContext();
  const location = useLocation();
  const [pdfData, setPDFData] = useState();

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");

  const { isLoading, error } = useQuery({
    queryKey: ["bioDataKey"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: false, //do not refetch on window focus
    refetchOnReconnect: false, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: false, //do not refetch at intervals
    refetchIntervalInBackground: false, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get(`/admins/getAllNOKDataPerUser/${userId}`);
      setPDFData(data.AllNOKDataPerUser[0]);
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
            <Text style={styles.title}>NEXT OF KIN</Text>
          </View>

          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>First Name</Text>
              <Text style={styles.valueTag}>
                {pdfData ? pdfData.nextOfKinFirstName : "First Name"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Last Name</Text>
              <Text style={styles.valueTag}>
                {pdfData ? pdfData.nextOfKinLastName : "Last Name"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Gender</Text>
              <Text style={styles.valueTag}>{pdfData ? pdfData.gender : "Gender"}</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Relationship</Text>
              <Text style={styles.valueTag}>
                {pdfData ? pdfData.nextOfKinRelationship : "Relationship"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Phone Number</Text>
              <Text style={styles.valueTag}>{pdfData ? pdfData.phoneNumber : "Phone Number"}</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Home Address</Text>
              <Text style={styles.valueTag}>
                {pdfData ? pdfData.houseAddress : "House Address"}
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

export default NOKPDF;
