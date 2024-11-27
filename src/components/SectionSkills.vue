<script lang="ts" setup>
import { usePortFolioStore } from "@/store/PortFolioStore";

const { technologies } = usePortFolioStore();
</script>

<template>
  <section class="skills-section section mt-3">
    <h2 class="section-title">
      <span class="icon-holder"><i class="fa-solid fa-rocket"></i></span>
      Skills &amp; Proficiency
    </h2>
    <div class="skillset">
      <div class="item" v-for="skill in technologies" :key="skill.title">
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
