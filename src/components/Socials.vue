<script lang="ts" setup>
import {usePortFolioStore} from "@/store/PortFolioStore";

const {contact} = usePortFolioStore();

const phoneLink = `tel:${contact.phone}`;
</script>

<template>
  <div class="contact-container container-block">
    <ul class="list-unstyled contact-list">
      <li class="email">
        <i class="fa-solid fa-envelope"></i
        ><a :href="'mailto:' + contact.email" target="_blank">{{
          contact.email
        }}</a>
      </li>
      <!--      <li class="phone">-->
      <!--        <i class="fa-solid fa-phone"></i-->
      <!--        ><a :href="phoneLink">{{ contact.phone }}</a>-->
      <!--      </li>-->
      <li class="linkedin">
        <i class="fa-brands fa-linkedin-in"></i
        ><a :href="contact.linkedin.link" target="_blank">{{
          contact.linkedin.userName
        }}</a>
      </li>
      <li class="github">
        <i class="fa-brands fa-github"></i
        ><a :href="contact.github.link" target="_blank">{{
          contact.github.userName
        }}</a>
      </li>
      <li class="twitter">
        <i class="fa-brands fa-twitter"></i
        ><a :href="contact.twitter.link" target="_blank">{{
          contact.twitter.userName
        }}</a>
      </li>
    </ul>
  </div>
</template>
