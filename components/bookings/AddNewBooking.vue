<script setup lang="ts">
import Modal from "~/components/shared/Modal.vue";
import {useBookingStore} from "~/stores/bookingStore";

const bookingStore = useBookingStore()

const { isCreatingBooking } = storeToRefs(bookingStore);

const createBooking = () => {
  console.log('createBooking');
}

const clearForm = () => {
  console.log('clearForm');
  bookingStore.isCreatingBooking = false;
}
</script>
<template>
  <button @click="bookingStore.isCreatingBooking = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Add Booking
  </button>
  <Modal
      v-if="isCreatingBooking"
      :disabled="false"
      :is-editing="false"
      title="Add New Booking"
      labelConfirm="Create Booking"
      @on-confirm="createBooking"
      @on-close="clearForm"
  >
  WIZARD
  </Modal>
</template>