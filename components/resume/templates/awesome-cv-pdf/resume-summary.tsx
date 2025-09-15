import { Font, Text, View } from "@react-pdf/renderer";
import type { Resume } from "@/convex/resume/type";
import ResumeSectionHeader from "./resume-section-header";

Font.register({
  family: "Roboto",
  fonts: [{ src: "/fonts/roboto/Roboto-Regular.ttf" }],
});

export default function ResumeSummary({ resume }: { resume: Resume }) {
  const { awesomeCV: settings } = resume.settings;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "100%",
        paddingRight: "14mm",
      }}
    >
      <ResumeSectionHeader
        label={resume.basics.summary.label}
        color={settings.accentColor}
      />
      <Text style={{ fontSize: 9, fontFamily: "Roboto", color: "#6a7282" }}>
        {resume.basics.summary.content}
      </Text>
    </View>
  );
}
