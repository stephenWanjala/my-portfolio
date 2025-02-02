import type { Education, Experience, Language, Skill } from "@/types/Types.ts";
import axios from "axios";

// Project & Contributor Interfaces
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

// Projects Data
export let projects: Project[] = [
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
  {
    name: "Multiply",
    url: "https://github.com/stephenWanjala/Multiply",
    gitName: "stephenWanjala/Multiply",
    stars: "?",
    forks: "?",
    description:
        "Simple Android app to help kids improve their multiplication skills in a fun and interactive way.",
    tags: ["Android", "Kotlin", "JetPack Compose"],
    image: "/images/multiply.png",
  },
];

// Cache Constants
const CACHE_KEY = "github_projects_cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Helper function to safely interact with localStorage
function safeLocalStorage(action: "get" | "set", key: string, value?: string) {
  try {
    if (action === "get") return localStorage.getItem(key);
    localStorage.setItem(key, value!);
  } catch (e) {
    console.warn("localStorage not available:", e);
  }
}

// Fetch project data with caching
export function getProjectWithStars(onFinish: (result: Project[]) => void) {
  const now = Date.now();
  const cacheEntry = safeLocalStorage("get", CACHE_KEY);

  if (cacheEntry) {
    const parsedCache = JSON.parse(cacheEntry);
    if (now < parsedCache.expires) return onFinish(parsedCache.data);
  }

  // Prepare API Requests
  const requests = projects.map(({ gitName }) => {
    if (!gitName.includes("/")) return Promise.resolve(null);
    const [owner, repo] = gitName.split("/");
    return axios.all([
      axios.get(`https://api.github.com/repos/${owner}/${repo}`),
      axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`),
    ]);
  });

  Promise.allSettled(requests).then((results) => {
    results.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value) {
        const [repoResponse, contributorsResponse] = result.value;
        projects[index].stars = repoResponse.data.stargazers_count.toString();
        projects[index].forks = repoResponse.data.forks_count.toString();
        projects[index].contributors = contributorsResponse.data.map(
            (c: any) => ({
              login: c.login,
              avatar_url: c.avatar_url,
              html_url: c.html_url,
              contributions: c.contributions,
            }),
        );
      } else {
        console.error(`Error fetching data for ${projects[index].name}`);
        projects[index].stars = "?";
        projects[index].forks = "?";
        projects[index].contributors = [];
      }
    });

    projects.sort(
        (a, b) =>
            parseInt(b.stars) - parseInt(a.stars) ||
            parseInt(b.forks) - parseInt(a.forks),
    );
    safeLocalStorage(
        "set",
        CACHE_KEY,
        JSON.stringify({ data: projects, expires: Date.now() + CACHE_TTL }),
    );
    onFinish(projects);
  });
}

// Utility Functions
export function getImageUrl(path: string) {
  return new URL(`/src/assets/images/${path}`, import.meta.url).href;
}

export function openLink(url: string) {
  window.open(url, "_blank");
}

// Experience Data
export const experiences: Experience[] = [
  {
    company: "Primesoft Solutions Limited",
    companyLink: "https://primesoft.co.ke",
    logo: "images/primesoft.png",
    roles: [
      {
        time: { start: new Date("2024-09-01"), current: true },
        jobTitle: "Software Developer",
        details: [
          "Developing and maintaining software applications under the MaliPlus ERP.",
          "Design and implement assigned features for MaliPlus ERP.",
          "Collaborate with Support Team to troubleshoot software issues.",
        ],
      },
    ],
  },
];

// Skills Data
export const skills: Skill[] = [
  {
    title: "Django & Rest Framework",
    level: 100,
    icon: "devicon-django-plain",
    color: "colored",
  },
  {
    title: "Kotlin",
    level: 100,
    icon: "devicon-kotlin-plain",
    color: "colored",
  },
  {
    title: "Jetpack Compose",
    level: 100,
    icon: "devicon-jetpackcompose-plain-wordmark",
    color: "colored",
  },
  {
    title: "Java & JavaFX",
    level: 100,
    icon: "devicon-java-plain-wordmark",
    color: "colored",
  },
  {
    title: "Kotlin Ktor & Spring Boot",
    level: 100,
    icon: "devicon-ktor-plain-wordmark",
    color: "colored",
  },
  {
    title: "Vue.js",
    level: 100,
    icon: "devicon-vuejs-plain",
    color: "colored",
  },
];

// Education Data
export const educations: Education[] = [
  {
    degree: "BSc. Information Technology",
    school: "Maseno University",
    duration: "2020 - May 2024",
  },
  {
    degree: "KCSE",
    school: "St Peter's Sang'alo High School",
    duration: "2015 - 2019",
  },
];

// Languages
export const langs: Language[] = [
  { name: "English", description: "" },
  { name: "Swahili", description: "" },
];