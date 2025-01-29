import type { Education, Experience, Language, Skill } from "@/types/Types.ts";
import axios from "axios";
import type { AxiosResponse } from "axios";

export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface Project {
  name: string;
  image: string;
  url: string;
  gitName: string;
  stars: string;
  forks: string;
  description?: string;
  tags: string[];
  contributors?: Contributor[];
}

export let projects: Project[] = Array.of<Project>(
  {
    name: "geoSpartial_village",
    image: "/images/geosparcial.jpeg",
    url: "https://github.com/stephenWanjala/geoSpartial_village",
    gitName: "stephenWanjala/geoSpartial_village",
    stars: "?",
    forks: "?",
    description: "Health IT hackathon 2024 Digimal solution",
    tags: ["Vue 3", "Pinia", "LeafLet js", "TypeScript", "Vuetify3"],
  },
);

export interface projectWithStarsCallBack {
  (result: Project[]): void;
}

export function getProjectWithStars(onFinish: projectWithStarsCallBack) {
  let newProjects: Project[] = [];
  let requests = projects.map(async (project) => {
    try {
      let response1 = await axios.get(
        `https://api.github.com/repos/${project.gitName}`,
      );
      project.stars = response1.data.stargazers_count;
      project.forks = response1.data.forks;
      let response2: AxiosResponse<any, any> = await axios.get(
        `https://api.github.com/repos/${project.gitName}/contributors`,
      );
      project.contributors = response2.data.map(
        (contributor: Contributor) => contributor,
      );
      newProjects.push(project);
      console.log(newProjects);
    } catch (error) {
      console.error(error);
    }
  });

  Promise.all(requests).then(() => {
    newProjects.sort((a, b) => {
      if (a.stars > b.stars) {
        return -1;
      } else if (a.stars < b.stars) {
        return 1;
      } else {
        return 0;
      }
    });

    onFinish(newProjects);
  });
}

export function getImageUrl(path: string): string {
  let url = new URL(`/src/assets/images/${path}`, import.meta.url);
  return url.href;
}

export function openLink(url: string) {
  window.open(url, "_blank");
}

export const experiences: Experience[] = Array.of<Experience>(
  {
    company: "Primesoft Solutions Limited",
    companyLink: "https://primesoft.co.ke",
    logo: "images/primesoft.png",
    roles: [
      {
        time: { start: new Date("2024-09-01"), current: true },
        jobTitle: "Software Developer",
        details: [
          "Developing and maintaining software applications, including mobile, and desktop applications under the MaliPlus ERP.",
          "Design, and implement assigned features, modules, and enhancements for MaliPlus ERP.",
          "Collaborate with Support Team to troubleshoot and resolve software issues.",
        ],
      },
      {
        time: { start: new Date("2024-05-25"), end: new Date("2024-08-30") },
        jobTitle: "Software Developer Intern",
        details: [
          "Contributing to development and maintenance of software desktop applications under the MaliPlus ERP.",
          "Collaborating with cross-functional teams to analyze, design, and implement assigned new features, modules and enhancements for MaliPlus ERP.",
          "Writing clean, maintainable, and efficient code, adhering to best practices and coding standards.",
          "Debugging, and troubleshooting software issues ",
          "Providing technical support to clients, addressing their inquiries, troubleshooting issues, and offering guidance on using software applications effectively.",
          "Contributing to the development of software architecture, design patterns, and coding standards to ensure consistency and scalability.",
          "Participating in team meetings, stand-ups, and sprint planning sessions to coordinate work and prioritize tasks effectively.",
        ],
      },
    ],
  },
  {
    company: "Kibabii University",
    companyLink: "https://kibu.ac.ke",
    logo: "images/kibabii.png",
    roles: [
      {
        time: { start: new Date("2023-05-25"), end: new Date("2023-08-08") },
        jobTitle: "Information Technology Attachment",
        details: [
          "Configuring managed switches, implementing VLANs, and securing network communications through SSH and Telnet protocols.",
          "Performing general computer maintenance tasks, including hardware upgrades, memory enhancement, and installation of operating systems and software applications.",
          "Installing and configuring ABNO ERP software, ensuring seamless operation and maintaining compliance with updates and patches.",
          "Designing and executing scripts for database automation, data normalization, and de-normalization, streamlining data management processes.",
          "Managing and configuring IP cameras, editing captured videos for presentations, and maintaining the security and integrity of video evidence.",
          "Providing technical support to students and staff, troubleshooting software-related issues, and offering guidance on using software applications effectively.",
          "Collaborating with cross-functional teams to enhance IT infrastructure, including transitioning from unmanaged to managed switches and optimizing access points and point-to-point radios.",
          "Assisting in the training of staff to effectively use the ERP software and troubleshoot any issues they encountered.",
          "Developing software solutions for clients, addressing their specific needs and contributing to the department's services.",
        ],
      },
    ],
  },
);

export const skills: Skill[] = [
  {
    title: "Django & Rest Framework",
    level: 100,
  },
  {
    title: "Kotlin & Jetpack Compose",
    level: 100,
  },
  {
    title: "Java & Java Fx",
    level: 100,
  },
  {
    title: "Kotlin Ktor & Spring Boot",
    level: 100,
  },

  {
    title: "Relational Databases",
    level: 100,
  },
  {
    title: "HTML5 & CSS",
    level: 100,
  },
  {
    title: "Vue Js",
    level: 100,
  },
  {
    title: "React ,Next Js && Express",
    level: 100,
  },
  {
    title: "Sketch & Adobe Express",
    level: 100,
  },
];

export const educations: Education[] = [
  {
    degree: "Bsc. Information Technology",
    school: "Maseno University",
    duration: "2020 - May 2024",
  },
  {
    degree: "Kenya Certificate of Secondary Education",
    school: "St Peter's Sang'alo High School",
    duration: "2015 - 2019",
  },
];

export const langs: Language[] = [
  { name: "English", description: "" },
  { name: "Swahili", description: "" },
];
