<script setup lang="ts">
import {useTravelStore} from "~/stores/travelStore";
import Modal from "~/components/shared/Modal.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const dateValue = ref([]);
const travelStore = useTravelStore()

const { isCreatingTravel } = storeToRefs(travelStore);
</script>
<template>
  <div class="add-new-travel" @click="travelStore.addNewTravel">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Add Travel
    </button>
  </div>
  <Modal v-if="isCreatingTravel" >
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Name
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Travel Name">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="departures">
        Departures Date
      </label>
      <vue-date-picker v-model="dateValue"></vue-date-picker>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="return">
        Return Date
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="return" type="text" placeholder="Return Date">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Name
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Travel Name">
    </div>
  </Modal>
</template>