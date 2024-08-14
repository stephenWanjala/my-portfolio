<script setup lang="ts">
import Education from './Education.vue';
import  Socials from './Socials.vue';
</script>
<template>
<div class="sidebar-wrapper">
            <div class="profile-container">
                <img class="profile" src="../assets/images/profile.png" alt="profile image" />
                <h1 class="name">Wanjala Stephen</h1>
                <h3 class="tagline">Software Developer</h3>
            </div><!--//profile-container-->
            
            <Socials />

            <Education />
       
</div>

</template>

<style scoped></style>
