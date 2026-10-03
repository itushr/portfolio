import type { Education } from "@/features/portfolio/types/education"

export const EDUCATION: Education[] = [
  {
    id: "dypatil",
    school: "D. Y. Patil Institute of Technology, Pune",
    degree: "Bachelor’s degree",
    fieldOfStudy: "Computer Science Engineering",
    period: {
      start: "08.2024",
      end: "06.2028",
    },
    description: `- Completed a Bachelor’s degree in Information Systems.
- Language Proficiency: B1 level in English (CEFR).
- Achieved several awards, including:
  - Bronze Medal — 10th Design, Manufacturing, and Application Award 2022
  - 2nd Prize — Business Startup Competition 2019`,
    skills: [
      "C++",
      "DSA",
      "Advanced Databases",
      "Systems Design",
      "Operating System",
      "Software Engineering",
    ],
  },
  {
    id: "navodaya",
    school: "Jawahar Navodaya Vidyalaya, Chandrapur",
    period: {
      start: "07.2016",
      end: "04.2023",
    },
    description: `- Recognized as the most outstanding student of the district.
- Achieved numerous awards at city and national levels:
  - Consolation Prize — National Young Informatics Contest 2015
  - Consolation Prize — National Young Informatics Contest 2014
  - 1st Prize — Can Tho City Young Informatics Contest 2014
- Achieved the title of Outstanding Student from Grade 6-9.
- Developed websites using the open-source NukeViet CMS.`,
    skills: ["HTML", "CSS", "JavaScript", "Python", "SQL", "Computer Network"],
  },
]
