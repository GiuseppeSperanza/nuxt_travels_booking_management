<script setup lang="ts">
import {useTravelStore} from "~/stores/travelStore";
import {convertDateToString, getDiscount} from "~/utils/string.utils";
import VueDatePicker from "@vuepic/vue-datepicker";
import Modal from "~/components/shared/Modal.vue";

const travelStore = useTravelStore();

const { selectedTravel } = storeToRefs(travelStore);


const initialPrice = selectedTravel.value ? Math.round(selectedTravel.value!.price + getDiscount(selectedTravel.value!.price)) : 0;
const discount = 10;
const days = selectedTravel.value ? getDifferenceDate(selectedTravel.value.departureDate, selectedTravel.value.returnDate ) : 0;
const total = (initialPrice * days) - Math.round(getDiscount(initialPrice * days));

const clearForm = () => {
  travelStore.isUpdatingTravel = false;
}

const handleFileChange = (event: Event) => {

}

</script>

<template>
  <div class="tour-wrapper" v-if="selectedTravel">
    <div class="tour-content">
      <div class="tour-hero">
        <div class="tour-image">
          <img
              class="w-full object-cover object-center tour-wrapper__image"
              :src="selectedTravel.picture"
              :alt="selectedTravel.name"
          />
        </div>
      </div>
      <!-- tour hero -->
      <div class="tour-content-block">
        <div class="tour-description">
          {{ selectedTravel.description }}
        </div>
      </div>
      <!-- block -->
      <div class="tour-content-block flex justify-center	">
        <div class="tour-reviews-overall">
        <div class="tour-reviews-content">
          <div class="tour-reviews-overall-title">
            Overall Rating
          </div>
          <div class="tour-reviews-overall-text">
            {{ selectedTravel.rating > 3 ? 'Excellent' : 'Passable' }}
          </div>
          <div class="tour-reviews-overall-rating">{{ selectedTravel.rating }}</div>
        </div>
      </div>
      </div>
    </div>
    <!-- content -->

    <div class="tour-sidebar">
      <div class="tour-receipt">
        <div class="tour-receipt-head">
          <div class="tour-amount">
            <span class="tour-amount-old">&euro;{{initialPrice}}</span> &euro;{{selectedTravel.price}}
            <span>/night</span>
          </div>
          <div class="tour-discount">-${{discount}}%</div>
        </div>
        <div class="tour-receipt-select">
          <div class="tour-receipt-select-top">
            <div class="tour-receipt-select-item">
              <div class="tour-receipt-select-icon">
                  <span class="material-icons-outlined">
                     calendar_month
                  </span>
              </div>
              <div class="tour-receipt-select-content">
                <div class="tour-receipt-select-title">
                  {{ convertDateToString(selectedTravel.departureDate) }}
                </div>
                <div class="tour-receipt-select-text">
                  Check in
                </div>
              </div>
            </div>
            <div class="tour-receipt-select-item">
              <div class="tour-receipt-select-icon">
                  <span class="material-icons-outlined">
                     event_available
                  </span>
              </div>
              <div class="tour-receipt-select-content">
                <div class="tour-receipt-select-title">
                  {{ convertDateToString(selectedTravel.returnDate) }}
                </div>
                <div class="tour-receipt-select-text">
                  Check out
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tour-receipt-detail">
          <div class="tour-receipt-detail-item">
            <div class="tour-receipt-detail-title">
              &euro;{{initialPrice}} x {{ days }} nights
            </div>
            <div class="tour-receipt-detail-price">&euro;{{initialPrice * days}}</div>
          </div>
          <div class="tour-receipt-detail-item">
            <div class="tour-receipt-detail-title">
              {{ discount }}% campaign discount
            </div>
            <div class="tour-receipt-detail-price">-&euro;{{ Math.round(getDiscount(initialPrice * days))}}</div>
          </div>
          <div class="tour-receipt-detail-item">
            <div class="tour-receipt-detail-title">Service fee</div>
            <div class="tour-receipt-detail-price">&euro;0</div>
          </div>
          <div class="tour-receipt-detail-item tour-receipt-detail-total">
            <div class="tour-receipt-detail-title">Total</div>
            <div class="tour-receipt-detail-price">&euro;{{total}}</div>
          </div>
        </div>
      </div>
      <div class="tour-actions">
        <button @click="travelStore.deleteTravel" class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
          <span class="mr-1"> Elimina </span>
        </button>
        <button @click="travelStore.isUpdatingTravel = true" class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
          <span class="mr-1"> Modifica </span>
        </button>
      </div>
    </div>
    <!-- sidebar -->
    <Modal
        title="Update Travel"
        v-if="travelStore.isUpdatingTravel"
        :disabled="false"
        @on-confirm="travelStore.updateTravel"
        @on-close="clearForm"
        :is-editing="true"
        label-confirm="Update Travel"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input v-model='selectedTravel.name' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Travel Name" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="departures">
          Departures Date
        </label>
        <vue-date-picker v-model="selectedTravel.departureDate" auto-apply :min-date="new Date()" :enable-time-picker="false" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="return">
          Return Date
        </label>
        <vue-date-picker v-model="selectedTravel.returnDate" auto-apply :min-date="new Date()" :enable-time-picker="false" />
      </div>
      <div class="mb-4">
        <img
            class="w-full object-cover object-center tour-wrapper__image tour-wrapper__image--small"
            :src="selectedTravel.picture"
            :alt="selectedTravel.name"
        />
        <label class="block text-gray-700 text-sm font-bold mb-2 mt-3" for="picture">
          Update Picture
        </label>
        <input @change="handleFileChange" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="picture" type="file" accept=".svg, .png, .jpg, .jpeg" placeholder="Picture">
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG OR JPG (MAX. 800x400px).</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
          Description
        </label>
        <textarea v-model='selectedTravel.description' id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your description here..."></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
          Price Single Person
        </label>
        <input v-model='selectedTravel.price' type="number" id="price" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
      </div>
    </Modal>
  </div>
  <div v-else> Caricamento... </div>
</template>