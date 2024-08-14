  
<script lang="ts" setup>
import { usePortFolioStore } from '@/store/PortFolioStore';
import type { Experience } from '@/types/Types';

import { onMounted } from 'vue';

const portFolioStore = usePortFolioStore();


const projectsIntro: string = "Work in progress";

</script>
  
 
  
<template>
  <div>
    <section class="section experiences-section">
      <h2 class="section-title">
        <span class="icon-holder"><i class="fa-solid fa-briefcase"></i></span>
        Experiences
      </h2>
      <div class="item" v-for="experience in portFolioStore.workExperiences" :key="experience.jobTitle">
        <div class="meta">
          <div class="upper-row">
            <h3 class="job-title">{{ experience.jobTitle }}</h3>
            <div class="time">{{ experience.time }}</div>
          </div><!--//upper-row-->
          <div class="company">
            <a :href="experience.companyLink" target="_blank" rel="noopener noreferrer">{{ experience.company }}</a>
          </div>
        </div><!--//meta-->
        <div class="details">
          <p v-for="detail in experience.details" :key="detail">{{ detail }}</p>
        </div><!--//details-->
      </div><!--//item-->
    </section><!--//section-->

    <!-- <section class="section projects-section">
      <h2 class="section-title">
        <span class="icon-holder"><i class="fa-solid fa-archive"></i></span>
        Projects
      </h2>
      <div class="intro">
        <p>{{ projectsIntro }}</p>
      </div>//intro
     // <div class="item" v-for="project in projects" :key="project.title">
        <span class="project-title">
          <a :href="project.link" target="_blank">{{ project.title }}</a>
        </span>
        - <span class="project-tagline">{{ project.tagline }}</span>
      </div>//item
    </section> 
    //section-->
  </div>
</template>