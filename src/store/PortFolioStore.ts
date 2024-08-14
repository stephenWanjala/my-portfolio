import { educations, experiences, langs, skills } from "@/projects/viewmodel";
import type { Contact, Education, Experience, Language, Project, Skill } from "@/types/Types";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";



export const usePortFolioStore = defineStore('portfolio', () => {
    const workExperiences = ref([] as Experience[]);
    const contact = ref({} as Contact);
    const technologies = ref([] as Skill[]);
    const educationLevels = ref([] as Education[]);
    const languages = ref([] as Language[]);

    let isLoading: Ref<boolean> = ref(false);

    (() => {
        isLoading.value = true;
        workExperiences.value = experiences;
        isLoading.value = false;
    })();

    
    (()=>{
        isLoading.value = true;
        technologies.value =skills;
        isLoading.value = false;

    })();

    (()=>{
        isLoading.value =true;
        educationLevels.value = educations;
    })();


    (()=>{
        isLoading.value = true;
        languages.value =langs 
    isLoading.value = false;
    })();

    contact.value= {
        email: "stephenwanjala145@gmail.com",
        phone: "+254723441923",
        linkedin: {
          userName: "Stephen Wanjala",
          link: "https://www.linkedin.com/in/wanjalastephen5/",
        },
        github: {
          userName: "stephenWanjala",
          link: "https://github.com/stephenWanjala",
        },
        twitter: {
          userName: "@Wanjalastephen5",
          link: "https://twitter.com/wanjalastephen5",
        },
      };


    return {
        workExperiences,
        contact,
        technologies,
        educationLevels,
        languages,
        isLoading
    };

});