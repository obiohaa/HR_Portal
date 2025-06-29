import React from "react";
import logo from "./dplace.png";
import { styles } from "./PDF";
import { axiosFetch } from "../../Utils/axiosFetch";
import { useQuery } from "@tanstack/react-query";
import PageLoading from "../Checks/PageLoading";
import { Page, Text, View, Document, PDFViewer, Image, PDFDownloadLink } from "@react-pdf/renderer";

const NOKJSON = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["nokUser"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: true, //do not refetch on window focus
    refetchOnReconnect: true, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: true, //do not refetch at intervals
    refetchIntervalInBackground: true, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get(`/users/getSingleNOK`);
      console.log(data);
      console.log(data.userNOK);
      return data;
    },
  });
  //   console.log(user);
  console.log(error);
  if (data && data.userBio) {
    console.log(data.userBio);
  }

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
                {data && data.userNOK ? data.userNOK.nextOfKinFirstName : "First Name"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Last Name</Text>
              <Text style={styles.valueTag}>
                {data && data.userNOK ? data.userNOK.nextOfKinLastName : "Last Name"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Gender</Text>
              <Text style={styles.valueTag}>
                {data && data.userNOK ? data.userNOK.gender : "Gender"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Relationship</Text>
              <Text style={styles.valueTag}>
                {data && data.userNOK ? data.userNOK.nextOfKinRelationship : "Relationship"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Phone Number</Text>
              <Text style={styles.valueTag}>
                {data && data.userNOK ? data.userNOK.phoneNumber : "Phone Number"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Home Address</Text>
              <Text style={styles.valueTag}>
                {data && data.userNOK ? data.userNOK.houseAddress : "House Address"}
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
      <PDFDownloadLink document={<InvoicePDF />} fileName="nextOfKin.pdf">
        <button type="submit" className="PDFsubmitBtn" formNoValidate>
          DOWNLOAD
        </button>
      </PDFDownloadLink>
    </div>
  );
};

export default NOKJSON;
