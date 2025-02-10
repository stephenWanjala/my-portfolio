<script setup lang="ts">
import Socials from "@/components/Socials.vue";
import Education from "@/components/Education.vue";
</script>
<template>
  <div class="sidebar-wrapper">
    <div class="profile-container">
      <div class="image-wrapper">
        <VImg
          alt="profile image"
          class="profile"
          src="/images/profile.jpg"
          width="220px"
          height="220px"
          rounded="circle"
          contain
        />
      </div>
      <h1 class="name">Wanjala Stephen</h1>
      <h3 class="tagline">Software Developer</h3>
    </div>

    <Socials />

    <Education />
  </div>
</template>
