<script setup lang="ts">
import {useTravelStore} from "~/stores/travelStore";
import {getDifferenceDate, getRandomNumber} from "~/utils/string.utils";

const travelStore = useTravelStore();

const { selectedTravel } = storeToRefs(travelStore);

</script>

<template>
    <div class="tour-head" v-if="selectedTravel">
      <div class="tour-head-left">
        <div class="tour-title">
          {{ selectedTravel.name }}
        </div>
        <div class="tour-overview">
          <div class="tour-overview-item">
            Start and end in <span>{{ selectedTravel.locality }}</span>
          </div>
          <div class="tour-overview-item"><span>{{ getDifferenceDate(selectedTravel.departureDate, selectedTravel.returnDate )}}</span> days</div>
          <div class="tour-overview-item">
            <span class="material-icons-outlined"> star </span>
            <span>{{ selectedTravel.rating }}</span> <client-only>({{ getRandomNumber() }} reviews)</client-only>
          </div>
        </div>
      </div>
    </div>
</template>