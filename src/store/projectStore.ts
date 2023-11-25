import {defineStore} from 'pinia';
import type {Project} from '@/projects/viewmodel';
import {getProjectWithStars} from '@/projects/viewmodel';
import {ref} from "vue";

export const useProjectStore = defineStore('project', () => {
    const projects = ref([] as Project[]);

    async function fetchProjects() {
        try {
          projects.value = await new Promise<Project[]>((resolve) => {
              getProjectWithStars((result: Project[]) => {
                resolve(result);
              });
            });
        } catch (error) {
            console.error(error);
        }
    }

    return {
        projects,
        fetchProjects
    };
});