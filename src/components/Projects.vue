<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {getImageUrl, openLink, type Project} from '@/projects/viewmodel';
import {useProjectStore} from '@/store/projectStore';

const projectStore = useProjectStore(); // Initialize the Pinia store


const projects = ref<Project[]>([]);


const startString = (project: Project) => {
  return parseInt(project.stars) === 1 ? '1 star' : `${project.stars} stars`;
}

onMounted(async () => {
  // Dispatch an action to fetch the projects
  await projectStore.fetchProjects();
  projects.value = projectStore.projects;
});
</script>


<template>
  <div class="container mt-4">
    <h2 class="section-title">
      <span class="icon-holder"><i class="fa-solid fa-archive"></i></span>
      Projects
    </h2>
    <v-progress-linear v-if="projectStore.isLoading"  indeterminate/>
    <div class="row">
      <div class="card-container">
        <div v-for="project in projects" :key="project.name" class="card">
          <!-- Card content -->
          <img
              :src="getImageUrl(project.image)"
              class="card-img-top img-fluid"
              :alt="project.name"
          />
          <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ project.description }}</p>

            <!-- Tags and Contributors -->
            <div class="tags-and-contributors">
              <div class="tags">
                <strong>Tags:</strong>
                <ul>
                  <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
                </ul>
              </div>

              <!-- Contributors -->
              <div class="contributors">
                <strong>Contributors:</strong>
                <ul>
                  <li v-for="contributor in project.contributors" :key="contributor.login">
                    <img :src="contributor.avatar_url" class="contributor-avatar" alt="Contributor Avatar"/>
                    <a :href="contributor.html_url" target="_blank">{{ contributor.login }}</a>
                    ({{ contributor.contributions }} contributions)
                  </li>
                </ul>
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-3">
              <p class="m-2 font-lg">{{ startString(project) }}</p>
              <p class="m-2 font-lg">{{ project.forks }} forks</p>

              <button class="btn btn-outline-secondary" @click="openLink(project.url)">
                Source <i class="bi bi-github ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Default styles for larger screens */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.tags-and-contributors {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
}

.tags,
.contributors {
  padding: 10px;
  border-radius: 8px;
  background-color: #f0f0f0;
}

.contributors {
  justify-self: start;
}

.contributor-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 5px;
}

/* Media query for smaller and medium screens */
@media (max-width: 992px) {
  .card-container {
    grid-template-columns: 1fr; /* Single column layout on smaller screens */
  }

  .tags-and-contributors {
    grid-template-columns: 1fr; /* Full width for tags and contributors on smaller screens */
  }

  .tags,
  .contributors {
    width: 100%; /* Tags and contributors span full width on smaller screens */
  }
}
</style>
