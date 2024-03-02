<script setup lang="ts">

import TravelDetailsHeader from "~/components/travels/TravelDetailsHeader.vue";
import TravelDetailsContent from "~/components/travels/TravelDetailsContent.vue";
import Footer from "~/components/shared/Footer.vue";
</script>
<template>
  <div class="tour container tour-detail">
    <TravelDetailsHeader />
    <TravelDetailsContent />
  </div>
  <Footer />
</template>