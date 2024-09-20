<script lang="ts" setup>
import {usePortFolioStore} from '@/store/PortFolioStore';
import {onMounted, computed, ref} from 'vue';
import {getImageUrl} from "@/projects/viewmodel";
import type {Experience} from "@/types/Types";

const portFolioStore = usePortFolioStore();

portFolioStore.workExperiences.values()


const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long'};
  return new Date(date).toLocaleDateString('en-US', options);
};

const calculateTimeSince = (start: Date, end: Date): string => {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

  let timeSince = '';
  if (diffYears > 0) {
    timeSince += `${diffYears} yr${diffYears > 1 ? 's' : ''}`;
  }
  if (diffMonths > 0) {
    timeSince += timeSince ? ' ' : '';
    timeSince += `${diffMonths} mo${diffMonths > 1 ? 's' : ''}`;
  }
  return timeSince || '< 1 mo';
};

const currentDate = computed(() => new Date());

const formatTimeRange = (start: Date, end?: Date, current?: boolean): string => {
  const startDate = new Date(start);
  const endDate = current ? currentDate.value : end ? new Date(end) : currentDate.value;

  const formattedStart = formatDate(startDate);
  const formattedEnd = current ? 'Present' : formatDate(endDate);

  let timeSince = '';
  if (current && startDate > currentDate.value) {
    // Future start date for current position
    timeSince = '0 mos';
  } else {
    timeSince = calculateTimeSince(startDate, endDate);
  }

  return `${formattedStart} - ${formattedEnd} · ${timeSince}`;
};

</script>

<template>
  <div class="experience-section">
    <h2 class="section-title">
      <span class="icon-holder">
        <i class="fa-solid fa-briefcase"></i>
      </span>
      Experience
    </h2>

    <ul class="experience-list">
      <li class="experience-item" v-for="experience in portFolioStore.workExperiences" :key="experience.company">
        <div class="experience-logo">
          <div class="logo-placeholder" v-if="experience.logo">
            <VAvatar size="48">
              <VImg :src="getImageUrl(experience.logo)" alt="Company Logo"
                    width="48" height="48"
                    cover
                    color="grey lighten-4"
              />
            </VAvatar>
          </div>
          <div class="logo-placeholder" v-else/>
        </div>
        <div class="experience-content">
          <h3 class="company-name">
            <a :href="experience.companyLink" target="_blank" rel="noopener noreferrer">
              {{ experience.company }}
            </a>
          </h3>
          <ul class="roles-list">
            <li class="role-item" v-for="role in experience.roles" :key="role.jobTitle">
              <h4 class="job-title">{{ role.jobTitle }}</h4>
              <p class="time-range">{{ formatTimeRange(role.time.start, role.time.end, role.time.current) }}</p>
              <ul class="job-details">
                <li v-for="detail in role.details" :key="detail">{{ detail }}</li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.experience-section {
  max-width: 800px;
  //margin: 0 auto;
  padding: 24px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.9);
}

.icon-holder {
  margin-right: 8px;
}

.experience-list {
  list-style-type: none;
  padding: 0;
}

.experience-item {
  display: flex;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.experience-logo {
  flex-shrink: 0;
  margin-right: 16px;
}

.logo-placeholder {
  width: 48px;
  height: 48px;
  background-color: #f3f2ef;
  border-radius: 8px;
}

.experience-content {
  flex-grow: 1;
}

.company-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
}

.company-name a {
  color: rgba(0, 0, 0, 0.9);
  text-decoration: none;
}

.company-name a:hover {
  color: #0a66c2;
  text-decoration: underline;
}

.roles-list {
  list-style-type: none;
  padding: 0;
}

.role-item {
  margin-bottom: 8px;
}

.job-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px;
  color: rgba(0, 0, 0, 0.9);
}

.time-range {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin: 0 0 4px;
}

.job-details {
  list-style-type: disc;
  margin: 8px 0 0 18px;
  padding: 0;
}

.job-details li {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
  margin-bottom: 4px;
}
</style>