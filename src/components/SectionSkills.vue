<script lang="ts" setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { usePortFolioStore } from "@/store/PortFolioStore";

const { technologies } = usePortFolioStore();

onMounted(() => {
  // Animate icons on mount
  gsap.from('.skill-icon', {
    duration: 1,
    scale: 0,
    opacity: 0,
    stagger: 0.1,
    ease: 'back.out(1.7)',
    delay: 0.5
  })

  // Hover animations
  document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        duration: 0.3,
        y: -10,
        scale: 1.05,
        ease: 'power2.out'
      })
    })

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        duration: 0.3,
        y: 0,
        scale: 1,
        ease: 'power2.out'
      })
    })
  })
})
</script>

<template>
  <section class="skills-section section mt-3">
    <h2 class="section-title">
      <span class="icon-holder"><i class="fa-solid fa-rocket"></i></span>
      Tech Stack & Frameworks
    </h2>

    <div class="skills-grid">
      <div
          v-for="skill in technologies"
          :key="skill.title"
          class="skill-item"
      >
        <div class="skill-card">
          <div class="skill-icon">
            <i :class="`${skill.icon} ${skill.color}`"></i>
          </div>
          <div class="skill-meta">
            <h3 class="skill-title">{{ skill.title }}</h3>
          </div>
          <div class="skill-particles">
            <div
                v-for="i in 3"
                :key="i"
                class="particle"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.skill-item {
  perspective: 1000px;
  cursor: pointer;
}

.skill-card {
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  padding: 1rem;
  border-radius: 15px;
  background: rgba(var(--bs-light-rgb), 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.skill-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: transform 0.3s;
}

.skill-meta {
  text-align: center;
  margin-top: 1rem;
}

.skill-title {
  font-size: 1rem;
  margin: 0.5rem 0;
  color: var(--bs-body-color);
}

.skill-level {
  font-size: 0.8rem;
  opacity: 0.8;
  color: var(--bs-secondary);
}

.skill-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0;
}

@keyframes float {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
  100% { transform: translateY(-40px) scale(0); opacity: 0; }
}

.skill-item:hover .particle {
  animation: float 1.5s ease-out forwards;
}

.skill-item:hover .skill-icon {
  transform: rotateY(360deg) scale(1.1);
}
</style>