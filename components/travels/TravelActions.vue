<script setup lang="ts">
import {useTravelStore} from "~/stores/travelStore";
import Modal from "~/components/shared/Modal.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const departureDate = ref([]);
const returnDate = ref([]);
const name = ref('');
const desc = ref('');
const price = ref(0);
const fileName = ref('');

const clearForm = () => {
  departureDate.value = [];
  returnDate.value = [];
  name.value = '';
  desc.value = '';
  price.value = 0;
  fileName.value = '';
  travelStore.isCreatingTravel = false;
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    fileName.value = file.name;
  } else {
    fileName.value = '';
  }
}

const travelStore = useTravelStore()

const { isCreatingTravel } = storeToRefs(travelStore);

const isCreateDisabled = computed(() => Boolean(departureDate.value)
    && Boolean(returnDate.value)
    && name.value.trim() !== ''
    && desc.value.trim() !== ''
    && fileName.value.trim() !== ''
)

const createTravel = () => {
  clearForm();
  travelStore.addNewTravel();

}


</script>
<template>
  <div class="add-new-travel" @click="travelStore.isCreatingTravel = true">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Add Travel
    </button>
  </div>
  <Modal
      v-if="isCreatingTravel"

      @on-confirm="createTravel"
      @on-close="clearForm"
  >
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Name
      </label>
      <input v-model='name' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Travel Name" required>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="departures">
        Departures Date
      </label>
      <vue-date-picker v-model="departureDate" auto-apply :min-date="new Date()" :enable-time-picker="false" />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="return">
        Return Date
      </label>
      <vue-date-picker v-model="returnDate" auto-apply :min-date="new Date()" :enable-time-picker="false" />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="picture">
        Picture
      </label>
      <input @change="handleFileChange" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="picture" type="file" accept=".svg, .png, .jpg, .jpeg" placeholder="Picture">
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG OR JPG (MAX. 800x400px).</p>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
        Description
      </label>
      <textarea v-model='desc' id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your description here..."></textarea>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
        Price Single Person
      </label>
      <input v-model='price' type="number" id="price" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
    </div>
  </Modal>
</template>