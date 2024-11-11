import {defineStore} from 'pinia';
import type {Project} from '@/projects/viewmodel';
import {getProjectWithStars} from '@/projects/viewmodel';
import {type Ref, ref} from "vue";

export const useProjectStore = defineStore('project', () => {
    const projects = ref([] as Project[]);
    let isLoading: Ref<boolean> = ref(false)

    async function fetchProjects() {
        try {
            isLoading.value = true
            projects.value = await new Promise<Project[]>((resolve) => {
                getProjectWithStars((result: Project[]) => {
                    resolve(result);
                    isLoading.value = false
                });
            });
        } catch (error) {
            console.error(error);
            isLoading.value = false
        }
    }

    return {
        projects,
        fetchProjects,
        isLoading
    };
});