import { Resume } from "@/@types/resume";
import { s } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ResumeActions = {
  setResume: (resume: Resume) => void;
  setBasics: (basics: Resume["basics"]) => void;
  setWork: (work: Resume["work"]) => void;
  setVolunteer: (volunteer: Resume["volunteer"]) => void;
  setEducation: (education: Resume["education"]) => void;
  setAwards: (awards: Resume["awards"]) => void;
  setCertificates: (certificates: Resume["certificates"]) => void;
  setPublications: (publications: Resume["publications"]) => void;
  setSkills: (skills: Resume["skills"]) => void;
  setLanguages: (languages: Resume["languages"]) => void;
  setInterests: (interests: Resume["interests"]) => void;
  setReferences: (references: Resume["references"]) => void;
  setProjects: (projects: Resume["projects"]) => void;
};

export const useResume = create<Resume & ResumeActions>()(
  persist(
    (set) => ({
      basics: {
        name: "",
        label: "",
        image: "",
        email: "",
        phone: "",
        url: "",
        summary: "",
        location: {
          address: "",
          postalCode: "",
          city: "",
          countryCode: "",
          region: "",
        },
        profiles: [],
      },
      work: [],
      volunteer: [],
      education: [],
      awards: [],
      certificates: [],
      publications: [],
      skills: [],
      languages: [],
      interests: [],
      references: [],
      projects: [],
      setResume: (resume: Resume) => set({ ...resume }),
      setBasics: (basics: Resume["basics"]) => set({ basics }),
      setWork: (work: Resume["work"]) => set({ work }),
      setVolunteer: (volunteer: Resume["volunteer"]) => set({ volunteer }),
      setEducation: (education: Resume["education"]) => set({ education }),
      setAwards: (awards: Resume["awards"]) => set({ awards }),
      setCertificates: (certificates: Resume["certificates"]) =>
        set({ certificates }),
      setPublications: (publications: Resume["publications"]) =>
        set({ publications }),
      setSkills: (skills: Resume["skills"]) => set({ skills }),
      setLanguages: (languages: Resume["languages"]) => set({ languages }),
      setInterests: (interests: Resume["interests"]) => set({ interests }),
      setReferences: (references: Resume["references"]) => set({ references }),
      setProjects: (projects: Resume["projects"]) => set({ projects }),
    }),
    {
      name: "resume",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const getResume = () => {
  const {
    basics,
    work,
    volunteer,
    education,
    awards,
    certificates,
    publications,
    skills,
    languages,
    interests,
    references,
    projects,
  } = useResume((state) => state);
  return {
    basics,
    work,
    volunteer,
    education,
    awards,
    certificates,
    publications,
    skills,
    languages,
    interests,
    references,
    projects,
  } as Resume;
};
