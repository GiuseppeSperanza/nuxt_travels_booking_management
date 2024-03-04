<script setup lang="ts">
import Modal from "~/components/shared/Modal.vue";
import {useBookingStore} from "~/stores/bookingStore";
import CreateBookingWizard from "~/components/bookings/CreateBookingWizard.vue";
import type {Booking} from "~/types/booking";

const bookingStore = useBookingStore()

const { isCreatingBooking } = storeToRefs(bookingStore);
const isDisabled = ref(true);
let newBooking = reactive<Booking>({} as Booking)
const createBooking = () => {
  bookingStore.createBooking(newBooking);
}

const onCompleteWizard = (isDisabledValue: boolean, newBookingValue: Booking) => {
  isDisabled.value = isDisabledValue
  newBooking = newBookingValue
}

const clearForm = () => {
  bookingStore.isCreatingBooking = false;
}
</script>
<template>
  <button @click="bookingStore.isCreatingBooking = true"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Add Booking
  </button>
  <Modal
      v-if="isCreatingBooking"
      :disabled="isDisabled"
      :is-editing="false"
      :is-booking="true"
      title="Add New Booking"
      labelConfirm="Create Booking"
      @on-confirm="createBooking"
      @on-close="clearForm"
  >
  <CreateBookingWizard @on-complete="onCompleteWizard"/>
  </Modal>
</template>