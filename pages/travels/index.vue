<script setup lang="ts">
import {useTravelStore} from "~/stores/travelStore";
import Rating from "~/components/shared/Rating.vue";
import Footer from "~/components/shared/Footer.vue";
import {convertDateToString} from "~/utils/string.utils";
import TravelActions from "~/components/travels/TravelActions.vue";


const travelStore = useTravelStore();
const router = useRouter()
const goToDetails = (id: string) => {
  router.push({path: `travels/${id}`})
}
const { isCreatingTravel } = storeToRefs(travelStore);

</script>
<template>
  <section class="travels-page">
    <div class="container px-5 py-5 mx-auto">
      <TravelActions />
      <div class="flex flex-wrap m-4">
        <div
            v-for="(travel, index) of travelStore.travels"
            :key="travel.id"
            class="travels-page__travel p-4 md:w-1/3"
            @click="goToDetails(travel.id)"
        >
          <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <div class="w-full">
              <div class="w-full flex p-2">
                <div class="pl-2 pt-2">
                  <p class="font-bold">{{ travel.name }}</p>
                  <p class="text-xs">{{ convertDateToString(travel.departureDate) }}</p>
                </div>
              </div>
            </div>

            <img
                class="lg:h-48 md:h-36 w-full object-cover object-center"
                :src="travel.picture"
                :alt="travel.name"
            />

            <div class="p-4">
              <h1 class="title-font text-lg font-medium text-gray-900 mb-3 travels-page__description"> {{ travel.description }}</h1>
              <div class="flex items-center flex-wrap justify-between">
                <a href="/" class="text-green-800  md:mb-2 lg:mb-0">
                  <p class="inline-flex items-center"> Dettaglio
                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </p>
                </a>
                <Rating :rating="travel.rating" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Footer />
  <div v-if="isCreatingTravel" class="overlay"></div>
</template>
<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}
</style>