import { CVProps } from "@/types/cv-types";

export const GOLD_D_ROGER_CV: CVProps = {
    header: {
        firstName: "Gold",
        lastName: "Roger",
        phoneEnabled: true,
        phone: "555-123-4567",
        emailEnabled: true,
        email: "gol.d.roger@pirates.com",
        homepageEnabled: false,
        githubEnabled: false,
        linkedinEnabled: false,
        gitlabEnabled: false,
        twitterEnabled: false,
        quoteEnabled: true,
        quote:"I left everything the world has to offer right here!",
    },
    summary: {
        enabled: true,
        label: "Summary",
        content:
            "Legendary pirate known as the Pirate King. Discovered the legendary treasure, One Piece, and triggered the Great Pirate Era. Fearless and charismatic leader, feared by the World Government.",
    },
    experience: {
        enabled: true,
        label: "Experience",
        experiences: [
            {
                company: "Roger Pirates",
                location: "Grand Line",
                position: "Captain",
                startDate: "Unknown",
                endDate: "20XX",
                description: [
                    "Led the Roger Pirates on a historic voyage to find the One Piece.",
                    "Encountered and conquered numerous challenges, including battles with other legendary pirates and the Marines.",
                    "Discovered the secret of the Void Century and left behind a legacy that continues to inspire pirates worldwide."
                ]
            }
        ]
    },
    honors: {
        enabled: true,
        label: "Honors",
        honors: [
            {
                label: "International",
                honors: [
                    {
                        year: "20XX",
                        position: "1st",
                        honor: "Pirate King",
                        location: "Unknown",
                    },

                ],
            },
        ],
    },
    presentations: {
        enabled: false,
        label: "Presentations",
        presentations: [],
    },
    writings: {
        enabled: true,
        label: "Writing",
        writings: [
            {
                title: "The Will of D.",
                role: "Author",
                medium: "Poneglyph",
                startDate: "Unknown",
                endDate: "Unkown",
                descriptions: [
                    "Authored a mysterious book detailing the significance and mysteries surrounding the 'Will of D.'",
                    "Inspired countless individuals to pursue their dreams and challenge the world's status quo."
                ]
            }
        ],
    },
    committees: {
        enabled: true,
        label: "Committees",
        committees: [
            {
                year: "20XX",
                position: "Chairman",
                organization: "Pirate Alliance",
                location: "New World",
            },
        ]
    },
    educations: {
        enabled: false,
        label: "Education",
        educations: [],
    },
    extracurriculars: {
        enabled: true,
        label: "Extracurriculars",
        extracurriculars: [
            {
                role: "Mentor",
                organization: "Roger Pirates Junior Crew",
                location: "Grand Line",
                startDate: "20XX",
                endDate: "20XX",
                description: [
                    "Mentored young aspiring pirates, passing down knowledge and wisdom gained from years of experience at sea.",
                    "Guided them in honing their skills and preparing for the challenges of the pirate life.",
                ],
            }
        ],
    },
    projects: {
        enabled: true,
        label: "Projects",
        projects: [
            {
                title: "One Piece Expedition",
                programmingLanguages: [],
                githubRepoEnabled: false,
                description: [
                    "Led the most ambitious expedition in pirate history, setting out to uncover the location of the legendary treasure, One Piece.",
                    "Gathered a crew of skilled individuals and embarked on a journey filled with danger, discovery, and adventure.",
                    "Inspired future generations of pirates to follow in his footsteps and seek their own destinies."
                ],
                linkEnabled: false,
                startDate: "Unknown",
                endDateEnabled: true,
                endDate: "20XX",
            },
        ],
    },
    languages: {
        enabled: true,
        label: "Languages",
        languages: [
            {
                language: "Japanese",
                proficiency: "Fluent",
            },
        ],
    },
    certificates: {
        enabled: true,
        label: "Certificates",
        certificates: [
            {
                title: "Pirate King",
                issuer: "World Government",
                date: "20XX",
                descriptions: ["Awarded the title of Pirate King for discovering the legendary treasure, One Piece, and triggering the Great Pirate Era."],
            },
        ],
    },
    settings: {
        accentColor: "#0395de",
        fontFamily: "'Inter', sans-serif",
        fileName: "Gold D. Roger CV",
        headerAlignment: "center"
    }
}