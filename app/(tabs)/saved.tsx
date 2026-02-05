import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

const PDF_URL =
  "https://ik.imagekit.io/ikegwuonu/JUNIOR_FRONTEND_DEVELOPER___TECHNICAL_ASSESSMENT__1__ZLnbcum6l.pdf";

const Saved = () => {
  const [localPdfUri, setLocalPdfUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const checkFile = async () => {
  //     try {
  //       const fileUri = `${FileSystem.documentDirectory}cached.pdf`;
  //       const meta = await FileSystem.getInfoAsync(fileUri);
  //       if (meta.exists) {
  //         setLocalPdfUri(fileUri);
  //       }
  //     } catch (e) {
  //       console.warn('Check file error', e);
  //     }
  //   };
  //   checkFile();
  // }, []);

  // const downloadPdf = async () => {
  //   setLoading(true);
  //   try {
  //     const fileUri = `${FileSystem.documentDirectory}cached.pdf`;

  //     // Delete old file if exists
  //     const meta = await FileSystem.getInfoAsync(fileUri);
  //     if (meta.exists) {
  //       await FileSystem.deleteAsync(fileUri, { idempotent: true });
  //     }

  //     await FileSystem.downloadAsync(PDF_URL, fileUri);
  //     setLocalPdfUri(fileUri);
  //     Alert.alert('Download complete', 'PDF saved for offline reading.');
  //   } catch (error) {
  //     Alert.alert('Download failed', 'Could not save PDF.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#000" />}

      <View style={styles.pdfContainer}>
        <SafeAreaView>
          <iframe src={PDF_URL} className="h-full w-full"></iframe>{" "}
          <WebView source={{ uri: PDF_URL }} style={{ flex: 1 }} />
          {/* <Pdf
            source={{ uri: PDF_URL, cache: true }}
            style={styles.pdf}
            onError={(error) => {
              return <Text>Error loading PDF: {(error as any)?.message}</Text>;
            }}
            onLoadComplete={(numberOfPages) => {
              console.log(`PDF loaded with ${numberOfPages} pages.`);
            }}
          /> */}
        </SafeAreaView>
      </View>
      {/*
      <Button title="Download PDF for offline" onPress={downloadPdf} disabled={loading} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  pdfContainer: { flex: 1, margin: 10 },
  pdf: { flex: 1 },
});
export default Saved;
