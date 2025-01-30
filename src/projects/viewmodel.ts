import type {Education, Experience, Language, Skill} from "@/types/Types.ts";
import axios from "axios";
import type {AxiosResponse} from "axios";

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

interface GithubGraphQLResponse {
    [key: string]: {
        stargazerCount: number;
        forkCount: number;
        mentionableUsers: {
            nodes: Array<{
                login: string;
                avatarUrl: string;
                url: string;
            }>;
        };
    };
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
        description: "Simple Android app to help kids improve their multiplication skills in a fun and interactive way.",
        tags: ["Android", "Kotlin", "JetPack Compose"],
        image: "/images/multiply.png",
    }
];

// Callback Interface
export interface projectWithStarsCallBack {
    (result: Project[]): void;
}

const CACHE_KEY = 'github_projects_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Helper function to safely interact with localStorage
function safeLocalStorage(action: 'get' | 'set', key: string, value?: string): string | null {
    try {
        if (action === 'get') {
            return localStorage.getItem(key);
        } else {
            localStorage.setItem(key, value!);
            return null;
        }
    } catch (e) {
        console.warn('localStorage is not available:', e);
        return null;
    }
}

// Fetch Projects with Stars and Contributors
export function getProjectWithStars(onFinish: projectWithStarsCallBack) {
    const now = Date.now();
    const cacheEntry = safeLocalStorage("get",CACHE_KEY);

    // Use Cache if Valid
    if (cacheEntry) {
        const parsedCache = JSON.parse(cacheEntry);
        if (now < parsedCache.expires) {
            processAndSortData(parsedCache.data, onFinish);
            return;
        }
    }

    // GraphQL Query
    const query = buildProjectsQuery();

    axios
        .post(
            'https://api.github.com/graphql',
            {query},
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((response: AxiosResponse<any>) => {
            const newData = response.data.data;
            updateCache(newData);
            processAndSortData(newData, onFinish);
        })
        .catch((error) => {
            const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
            const errorStatus = error.response?.status;
            console.error('GitHub API Error:', {
                status: errorStatus,
                message: errorMessage,
                documentation_url: error.response?.data?.documentation_url
            })
            onFinish([...projects]); // Fallback to static projects
        });
}

// Build GraphQL Query for Projects
function buildProjectsQuery(): string {
    return `query { 
        ${projects.map((project, index) => {
        if (!project.gitName || !project.gitName.includes('/')) {
            console.error(`Invalid gitName format for project: ${project.name}`);
            return '';
        }
        const [owner, repo] = project.gitName.split('/');
        if (!owner || !repo) {
            console.error(`Missing owner or repo for project: ${project.name}`);
            return '';
        }
        return `
                repo${index}: repository(owner: "${owner}", name: "${repo}") {
                    stargazerCount
                    forkCount
                    mentionableUsers(first: 10) {
                        nodes {
                            login
                            avatarUrl
                            url
                        }
                    }
                }
            `;
    }).join('\n')}
    }`;
}

// Process and Sort Data
function processAndSortData(data: GithubGraphQLResponse, callback: projectWithStarsCallBack) {
    const updatedProjects = projects.map((project, index) => ({
        ...project,
        ...extractRepoData(data[`repo${index}`]),
    }));

    // Sort by stars, then forks
    updatedProjects.sort((a, b) => parseInt(b.stars) - parseInt(a.stars) || parseInt(b.forks) - parseInt(a.forks));

    callback(updatedProjects);
}

// Extract Repository Data
function extractRepoData(repoData: GithubGraphQLResponse[string]): Partial<Project> {
    if (!repoData) return {};
    return {
        stars: repoData.stargazerCount?.toString() || "?",
        forks: repoData.forkCount?.toString() || "?",
        contributors: repoData.mentionableUsers?.nodes?.map((node: any) => ({
            login: node.login,
            avatar_url: node.avatarUrl,
            html_url: node.url,
            contributions: 0, // GitHub API does not provide this in GraphQL
        })) || [],
    };
}

// Cache Data
function updateCache(data: any) {
    localStorage.setItem(CACHE_KEY, JSON.stringify({data, expires: Date.now() + CACHE_TTL}));
}

// Get Image URL
export function getImageUrl(path: string): string {
    return new URL(`/src/assets/images/${path}`, import.meta.url).href;
}

// Open External Link
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
                time: {start: new Date("2024-09-01"), current: true},
                jobTitle: "Software Developer",
                details: [
                    "Developing and maintaining software applications, including mobile, and desktop applications under the MaliPlus ERP.",
                    "Design, and implement assigned features, modules, and enhancements for MaliPlus ERP.",
                    "Collaborate with Support Team to troubleshoot and resolve software issues.",
                ],
            }
        ],
    }
];

// Skills Data
export const skills: Skill[] = [
    {title: "Django & Rest Framework", level: 100, icon: "devicon-django-plain", color: "colored"},
    {title: "Kotlin", level: 100, icon: "devicon-kotlin-plain", color: "colored"},
    {title: "Jetpack Compose", level: 100, icon: "devicon-jetpackcompose-plain-wordmark", color: "colored"},
    {title: "Java & Java Fx", level: 100, icon: "devicon-java-plain-wordmark", color: "colored"},
    {title: "Kotlin Ktor & Spring Boot", level: 100, color: "colored", icon: "devicon-ktor-plain-wordmark"},
    {title: "Vue Js", level: 100, icon: "devicon-vuejs-plain", color: "colored"},
];

// Education Data
export const educations: Education[] = [
    {degree: "Bsc. Information Technology", school: "Maseno University", duration: "2020 - May 2024"},
    {
        degree: "Kenya Certificate of Secondary Education",
        school: "St Peter's Sang'alo High School",
        duration: "2015 - 2019"
    },
];

// Languages
export const langs: Language[] = [
    {name: "English", description: ""},
    {name: "Swahili", description: ""},
];
