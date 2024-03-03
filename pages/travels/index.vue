<script setup lang="ts">
import {useTravelStore} from "~/stores/travelStore";
import Footer from "~/components/shared/Footer.vue";
import TravelActions from "~/components/travels/TravelActions.vue";
import type {Travel} from "~/types/travel";
import TravelsList from "~/components/travels/TravelsList.vue";

const travelStore = useTravelStore();
const { isCreatingTravel } = storeToRefs(travelStore);

const { data } = await useAsyncData<Travel[]>(() => $fetch('/api/getTravels'), {
  server: true,
});
useTravelStore().setupStore(data.value!)

</script>
<template>
  <section class="travels-page">
    <div class="container px-5 py-5 mx-auto">
      <TravelActions />
      <TravelsList />
    </div>
  </section>
  <Footer />
  <div v-if="isCreatingTravel" class="overlay"></div>
</template>
