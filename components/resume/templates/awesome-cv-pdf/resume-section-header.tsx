import { Font, Text, View } from "@react-pdf/renderer";
import type { AwesomeCVColor } from "@/convex/resume/type";

Font.register({
  family: "Roboto",
  fonts: [{ src: "/fonts/roboto/Roboto-Bold.ttf", fontWeight: "bold" }],
});

export default function ResumeSectionHeader({
  label,
  color,
}: {
  label: string;
  color: AwesomeCVColor;
}) {
  const parsedColor = color.split("[")[1]?.replace("]", "");
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: 6,
        marginRight: 39.685,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text
          style={{
            display: "flex",
            fontSize: 18,
            fontWeight: "bold",
            color: parsedColor,
            fontFamily: "Roboto",
          }}
        >
          {label.slice(0, 3)}
        </Text>
        <Text
          style={{
            display: "flex",
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Roboto",
            color: "#333333",
          }}
        >
          {label.slice(3)}
        </Text>
      </View>
      <View
        //TODO: Rever valor da larguar, deveria respeitar as margens da pagina
        style={{
          borderBottom: "0.75",
          borderColor: "#000000",
          width: "100%",
          marginBottom: 6,
        }}
      />
    </View>
  );
}
