 <script lang="ts" setup>
  interface Skill {
    title: string;
    level: number;
  }
  
  const skills: Skill[] = [
    {
      title: "Django & Rest Framework",
      level: 85,
    },
    {
      title: "Kotlin",
      level: 95,
    },
    {
      title : "Kotlin jetpack Compose",
      level : 83,
    },
    {
      title : "Kotlin Ktor & Spring",
      level : 80,
    },

    {
      title: "Relational Databases",
      level: 96,
    },
    {
      title: "HTML5 & CSS",
      level: 98,
    },
    {
      title: "Express Js",
      level: 75,
    },
    {
      title: "Vue Js",
      level: 85,
    },
    {
      title : "React & Next Js",
      level : 70,
    },
    {
      title: "Golang",
      level: 60,
    },
    {
      title: "Sketch & Adobe Express",
      level: 95,
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
  
 
  
  
