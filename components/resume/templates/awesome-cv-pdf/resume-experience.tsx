import { Font, Text, View } from "@react-pdf/renderer";
import type { Resume } from "@/convex/resume/type";
import ResumeSectionHeader from "./resume-section-header";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/roboto/Roboto-Regular.ttf" },
    { src: "/fonts/roboto/Roboto-Italic.ttf", fontStyle: "italic" },
    { src: "/fonts/roboto/Roboto-Bold.ttf", fontWeight: "bold" },
  ],
});

export default function ResumeExperience({ resume }: { resume: Resume }) {
  const { awesomeCV: settings } = resume.settings;

  const parsedColor = settings.accentColor.split("[")[1]?.replace("]", "");

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 12,
      }}
    >
      <ResumeSectionHeader
        label={resume.work.label}
        color={settings.accentColor}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        {resume.work.content.map((experience) => (
          <View key={experience.id} style={{ width: "100%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  fontSize: 12,
                }}
              >
                {experience.company}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  fontFamily: "Roboto",
                  fontStyle: "italic",
                  color: parsedColor,
                }}
              >
                {experience.location}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{ fontFamily: "Roboto", fontSize: 9, color: "#4a5565" }}
              >
                {experience.position.toUpperCase()}
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontStyle: "italic",
                  fontSize: 9,
                  color: "#6a7282",
                }}
              >
                {experience.startDate}
                {" - "}
                {experience.endDate}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: 2,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {experience.highlights.map((description) => (
                  <View
                    key={description.id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Roboto",
                        color: "#6a7282",
                        fontWeight: "bold",
                        marginRight: 5,
                        marginTop: 1,
                      }}
                    >
                      •
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        fontFamily: "Roboto",
                        color: "#6a7282",
                      }}
                    >
                      {description.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
