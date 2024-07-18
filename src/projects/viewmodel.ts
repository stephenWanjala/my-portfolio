import axios from "axios";
import type {AxiosResponse} from "axios";

export interface Contributor {
    login: string,
    avatar_url: string,
    html_url: string,
    contributions: number

}

export interface Project {
    name: string,
    image: string,
    url: string,
    gitName: string,
    stars: string,
    forks: string,
    description?: string,
    tags: string[],
    contributors?: Contributor[]
}

export let projects: Project[] = [
    {
        name: "geoSpartial_village",
        image: "geosparcial.jpeg",
        url: "https://github.com/stephenWanjala/geoSpartial_village",
        gitName: "stephenWanjala/geoSpartial_village",
        stars: "?",
        forks: "?",
        description: "Health IT hackathon 2024 Digimal solution",
        tags: ["Vue 3", "Pinia", "LeafLet js", "TypeScript", "Vuetify3"]
    },
    {
        name: "NoShame",
        image: "noshame.png",
        url: "https://github.com/stephenWanjala/No-shame",
        gitName: "stephenWanjala/No-shame",
        stars: "?",
        forks: "?",
        description: "An application to track women's menstrual cycle and provide information on menstrual health and awereness on menstrual hygiene",
        tags: ["Android", "Kotlin", "Jetpack Compose"]
    },
    {
        name: "sakko",
        image: "sakko.jpg",
        url: "https://github.com/stephenWanjala/sakko",
        gitName: "stephenWanjala/sakko",
        description: "A web platform that aims to eliminate the exploitation of rural milk farmers by middlemen. ",
        stars: "?",
        forks: "?",
        tags: ["python Django", "Rest_framework", "jwt"]
    },
    {
        name: "ktor-jwtAuth ",
        image: "ktor.png",
        url: "https://github.com/stephenWanjala/ktor-jwtAuth",
        gitName: "stephenWanjala/ktor-jwtAuth",
        stars: "?",
        forks: "?",
        description: "A simple ktor application with jwt authentication (Learning how to use ktor)",
        tags: ["Kotlin", "ktor", "jwt", "mongodb"]
    },
    {
        name: "bookstore ",
        image: "bookstore.png",
        url: "https://github.com/stephenWanjala/bookstore",
        gitName: "stephenWanjala/bookstore",
        stars: "?",
        forks: "?",
        description: "This repository contains a CRUD (Create, Read, Update, Delete) API for a bookstore implemented using the Go programming language (Golang) and the GORM ORM library with MySQL database",
        tags: ["Go", "gorm", "mysql"]
    },
    {
        name :"RevVault",
        image:"bookstore.png",
        url:"https://github.com/stephenWanjala/RevVault.git",
        gitName:"stephenWanjala/RevVault",
        stars: "?",
        forks: "?",
        description:"Share && Access a comprehensive collection of past papers, study guides, and practice questions to prepare for your exams and achieve academic success.",
        tags:["Kotlin","ktor","PostgreSQL","Exposed Framework"]
    }

]

export interface projectWithStarsCallBack {
    (result: Project[]): void
}

export function getProjectWithStars(onFinish: projectWithStarsCallBack) {
    let newProjects: Project[] = [];
    let requests = projects.map(async (project) => {
        try {
            let response1 = await axios.get(`https://api.github.com/repos/${project.gitName}`);
            project.stars = response1.data.stargazers_count;
            project.forks = response1.data.forks;
            let response2: AxiosResponse<any,any> = await axios.get(`https://api.github.com/repos/${project.gitName}/contributors`);
            project.contributors = response2.data.map((contributor: Contributor) => contributor);
            newProjects.push(project);
            console.log(newProjects);
        } catch (error) {
            console.error(error);
        }
    });

    Promise.all(requests).then(() => {
        newProjects.sort((a, b) => {
            if (a.stars > b.stars) {
                return -1
            } else if (a.stars < b.stars) {
                return 1
            } else {
                return 0
            }
        });

        onFinish(newProjects);
    });
}

export function getImageUrl(path: string): string {
    return new URL(`/src/assets/images/${path}`, import.meta.url).href;
}

export function openLink(url: string) {
    window.open(url, "_blank");
}