<script setup lang="ts">

import {useGlobalStore} from "~/stores/globalStore";

const globalStore = useGlobalStore();

const { isMenuToggleOpen } = storeToRefs(globalStore);
const { toggleMenu } = globalStore;

</script>
<template>
  <div class="header">
    <div class="container">
      <div class="header-logo">
        <NuxtLink to="/">
          <span class="material-icons-outlined header-logo-icon"> travel_explore </span>
        </NuxtLink>
      </div>
      <!-- header-logo -->
      <div class="menu-toggle" @click="toggleMenu">
        <span class="material-icons-outlined"> {{isMenuToggleOpen ? 'close' : 'menu'}} </span>
      </div>
      <!-- menu-toggle -->

      <ul class="header-menu">
        <NuxtLink to="travels" class="header-menu-item">
          Travels
        </NuxtLink>
        <NuxtLink to="booking" class="header-menu-item">
          Booking
        </NuxtLink>
      </ul>
    </div>
  </div>
</template>
