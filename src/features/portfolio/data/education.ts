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
    description: ``,
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
    description: ``,
    skills: ["HTML", "CSS", "JavaScript", "Python", "SQL", "Computer Network"],
  },
]
