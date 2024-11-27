<script lang="ts" setup>
import { usePortFolioStore } from "@/store/PortFolioStore";

const { languages } = usePortFolioStore();
</script>

<template>
  <div class="languages-container container-block">
    <h2 class="container-block-title">Languages</h2>
    <ul class="list-unstyled interests-list">
      <li v-for="language in languages" :key="language.name">
        {{ language.name }}
        <span class="lang-desc">{{ language.description }}</span>
      </li>
    </ul>
  </div>
</template>
