import React from "react";
import logo from "./dplace.png";
import { styles } from "./PDF";
import { axiosFetch } from "../../Utils/axiosFetch";
import { useQuery } from "@tanstack/react-query";
import PageLoading from "../Checks/PageLoading";
import { useGlobalContext } from "../../Context/userContext";
import { Page, Text, View, Document, PDFViewer, Image, PDFDownloadLink } from "@react-pdf/renderer";

const BDJSONpdf = () => {
  const { user } = useGlobalContext();

  const { data, isLoading } = useQuery({
    queryKey: ["bioDataKey"],
    retryOnMount: true, //do not retry on mount
    refetchOnWindowFocus: true, //do not refetch on window focus
    refetchOnReconnect: true, //do not refetch on reconnect
    refetchOnMount: true, //do not refetch on mount
    refetchInterval: true, //do not refetch at intervals
    refetchIntervalInBackground: true, //do not refetch in background
    queryFn: async () => {
      const { data } = await axiosFetch.get("/users/getSingleBioData");
      // console.log(data);
      // console.log(data.userBio);
      return data;
    },
  });
  //   console.log(user);
  // console.log(error);
  // if (data && data.userBio) {
  //   console.log(data.userBio);
  // }

  // if (user) {
  //   console.log(user);
  // }

  const InvoicePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={logo} style={styles.watermarkImage} />
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>BIO DATA</Text>
          </View>
          <Image
            src={
              user
                ? user.imgURL
                : "https://res.cloudinary.com/theplace-com-ng/image/upload/v1751159857/HR_ADMIN_PORTAL/person_placeholder_rngmst.jpg"
            }
            style={styles.passImage}
          />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>First Name</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.firstName : "First Name"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Middle Name</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.middleName : "Middle Name"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Last Name</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.lastName : "Last Name"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Gender</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.gender : "Gender"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Date of Birth</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.dateOfBirth.split("T")[0] : "Date of Birth"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>State of Origin</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.state_of_origin : "Origin"} State
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Marital Status</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.maritalStatus : "Marital Status"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Spouse Name</Text>
              <Text style={styles.valueTag}>
                {" "}
                {data && data.userBio ? data.userBio.spouseName : "Spouse Name"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Phone Number</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.phoneNumber : "Phone Number"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Bank Name</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.bankName : "Bank Name"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Account Number</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.bankAccountNumber : "Account Number"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Pension</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.pension : "Pension"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.section}>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Pension Company</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.pensionCompany : "Pension Company"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Pension Pin</Text>
              <Text style={styles.valueTag}>
                {" "}
                {data && data.userBio ? data.userBio.pensionPin : "Pension Pin"}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.keyTag}>Level of Education</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.levelOfEducation : "Level of Education"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Email</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.email : "Email"}
              </Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.singleSection}>
            <View>
              <Text style={styles.keyTag}>Home Address</Text>
              <Text style={styles.valueTag}>
                {data && data.userBio ? data.userBio.houseAddress : "House Address"}
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

export default BDJSONpdf;
