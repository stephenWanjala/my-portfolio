<script lang="ts" setup>
import type { Skill } from '@/types/Types';



const skills: Skill[] = [
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
    title: "Golang",
    level: 60,
  },
  {
    title: "Sketch & Adobe Express",
    level: 100,
  },
];

</script>


<template>
  <section class="skills-section section mt-3">
    <h2 class="section-title">
      <span class="icon-holder"><i class="fa-solid fa-rocket"></i></span>
      Skills &amp; Proficiency
    </h2>
    <div class="skillset">
      <div class="item" v-for="skill in skills" :key="skill.title">
        <h3 class="level-title">{{ skill.title }}</h3>
        <div class="progress level-bar">
          <div
              class="progress-bar theme-progress-bar"
              role="progressbar"
              :style="{ width: skill.level + '%' }"
              :aria-valuenow="skill.level"
              aria-valuemin="0"
              aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>
  
 
  
  
