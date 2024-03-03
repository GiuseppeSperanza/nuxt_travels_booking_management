<script setup lang="ts">

import TravelDetails from "~/components/travels/TravelDetails.vue";
import type {Travel} from "~/types/travel";
import {useTravelStore} from "~/stores/travelStore";

const { data } = await useAsyncData<Travel>(() => $fetch('/api/getTravel'), {
  server: true,
});
useTravelStore().setSelectedTravel(data.value!);

</script>
<template>
  <TravelDetails />
</template>