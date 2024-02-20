import { CVProps } from "@/types/cv-types";
import A4Paper from "../a4-paper";
import CVHeader from "./cv-header";
import CVSummary from "./cv-summary";
import CVExperience from "./cv-experience";

export default function CV(props : CVProps) {
    return (
        <A4Paper>
            <CVHeader {...props.header} />
            {props.summaryEnabled && <CVSummary {...props.summary!} />}
            {props.experienceEnabled && <CVExperience {...props.experience!} />}
        </A4Paper>
    )
}