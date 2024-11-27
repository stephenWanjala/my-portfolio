<script lang="ts" setup>
import Education from "./Education.vue";
import Socials from "./Socials.vue";
</script>
<template>
  <div class="sidebar-wrapper">
    <div class="profile-container">
      <img alt="profile image" class="profile" src="/images/profile.png" />
      <h1 class="name">Wanjala Stephen</h1>
      <h3 class="tagline">Software Developer</h3>
    </div>
    <!--//profile-container-->

    <Socials />

    <Education />
  </div>
</template>

<style scoped></style>
