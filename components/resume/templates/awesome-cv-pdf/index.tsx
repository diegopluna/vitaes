"use client";

import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import type { Resume } from "@/convex/resume/type";
import ResumeExperience from "./resume-experience";
import ResumeHeader from "./resume-header";
import ResumeSummary from "./resume-summary";

type Props = {
  resume: Resume;
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: "14mm",
    paddingTop: "8mm",
    paddingBottom: "18mm",
  },
});

export default function AwesomeCV({ resume }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <ResumeHeader resume={resume} />
        {resume.basics.summary.content.length > 0 && (
          <ResumeSummary resume={resume} />
        )}
        {resume.work.content.length > 0 && <ResumeExperience resume={resume} />}
      </Page>
    </Document>
  );
}
