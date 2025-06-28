import React from "react";
import logo from "./dplace.png";
import passport from "./dispatch1.PNG";
import { styles } from "./PDF";
import { axiosFetch } from "../../Utils/axiosFetch";
import { useQuery } from "@tanstack/react-query";
import PageLoading from "../../Components/PageLoading";
import { Page, Text, View, Document, PDFViewer, Image, PDFDownloadLink } from "@react-pdf/renderer";

const BDJSONpdf = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bioDataKey"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: true, //do not refetch on window focus
    refetchOnReconnect: true, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: true, //do not refetch at intervals
    refetchIntervalInBackground: true, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get("/users/getSingleBioData");
      console.log(data);
      console.log(data.userBio);
      return data;
    },
  });

  console.log(error);
  console.log(data);

  const InvoicePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={logo} style={styles.watermarkImage} />
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>BIO DATA</Text>
          </View>
          <Image src={passport} style={styles.passImage} />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>First Name</Text>
              <Text style={styles.valueTag}>Felix</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Middle Name</Text>
              <Text style={styles.valueTag}>Emmanuel</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Last Name</Text>
              <Text style={styles.valueTag}>Jeremiah</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Gender</Text>
              <Text style={styles.valueTag}>Female</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Date of Birth</Text>
              <Text style={styles.valueTag}>1972-06-13</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>State of Origin</Text>
              <Text style={styles.valueTag}>Kogi State</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Marital Status</Text>
              <Text style={styles.valueTag}>Single</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Spouse Name</Text>
              <Text style={styles.valueTag}> nkechi okafor</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Phone Number</Text>
              <Text style={styles.valueTag}>09160988587</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Bank Name</Text>
              <Text style={styles.valueTag}>Fidelity Bank</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Account Number</Text>
              <Text style={styles.valueTag}>8999874559</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Pension</Text>
              <Text style={styles.valueTag}>Yes</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Pension Company</Text>
              <Text style={styles.valueTag}>Stanbic Pensions</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Pension Pin</Text>
              <Text style={styles.valueTag}>89685745123</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Level of Education</Text>
              <Text style={styles.valueTag}>Bachelors or Equivalent</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Email</Text>
              <Text style={styles.valueTag}>obiohaebuka200215@gmail.com</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Home Address</Text>
              <Text style={styles.valueTag}>23 fabio calvarho way brazil maracana</Text>
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

export default BDJSONpdf;
