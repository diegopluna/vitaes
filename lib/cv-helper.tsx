import { CVProps } from "@/types/cv-types";

export const isCV = (o : any): o is CVProps => {
    if (
        typeof o === "object" &&
        o !== null &&
        "header" in o &&
        "summary" in o &&
        "experience" in o &&
        "honors" in o &&
        "presentations" in o &&
        "writings" in o &&
        "committees" in o &&
        "educations" in o &&
        "extracurriculars" in o &&
        "projects" in o &&
        "languages" in o &&
        "certificates" in o &&
        "settings" in o
    ) {
        return true;
    }
    return false;
}