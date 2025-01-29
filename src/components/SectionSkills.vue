<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortFolioStore } from "@/store/PortFolioStore.ts";

const { technologies } = usePortFolioStore();
const skillsSection = ref<HTMLElement | null>(null);

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  if (skillsSection.value) {
    gsap.from(document.querySelectorAll(".skill-item"), {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: skillsSection?.value?.enterKeyHint,
        start: "top center+=200",
        // markers: true
      },
    });
  } else {
    console.error("skillsSection is null");
  }
});
</script>

<template>
  <v-container ref="skillsSection" class="skills-section py-8">
    <h2 class="section-title">
      <span class="icon-holder"><i class="fa-solid fa-rocket"></i></span>
      Tech Stack & Frameworks
    </h2>

    <v-row class="justify-center">
      <v-col
        v-for="skill in technologies"
        :key="skill.title"
        cols="6"
        sm="4"
        md="3"
        class="skill-item"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :class="{ 'skill-card-hover': isHovering }"
            class="skill-card text-center pa-4"
            elevation="4"
          >
            <v-icon
              size="64"
              :class="`mb-4 ${skill.color} ${isHovering ? 'text-primary' : ''}`"
              :icon="String(skill.icon) || 'mdi-code-braces'"
            />
            <div class="text-h6 font-weight-medium">{{ skill.title }}</div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.skill-card {
  transition: all 0.3s ease;
  transform: translateY(0);
  border-radius: 16px !important;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
}

.skill-card-hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}

@media (prefers-reduced-motion: reduce) {
  .skill-card {
    transition: none;
  }
}
</style>
