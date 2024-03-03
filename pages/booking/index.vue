<script setup lang="ts">
import {useBookingStore} from "~/stores/bookingStore";
import type {Booking} from "~/types/booking";
import BookingsList from "~/components/bookings/BookingsList.vue";
import BookingsActions from "~/components/bookings/BookingsActions.vue";
import Footer from "~/components/shared/Footer.vue";

const bookingStore = useBookingStore();
const { data } = await useAsyncData<Booking[]>(() => $fetch('/api/getBookings'), {
  server: true,
});
bookingStore.setupStore(data.value!)
const { isCreatingBooking } = storeToRefs(bookingStore);
</script>
<template>
  <section class="bookings-page">
    <div class="container px-5 py-5 mx-auto">
      <BookingsActions />
      <BookingsList />
    </div>
  </section>
  <Footer />
  <div v-if="isCreatingBooking" class="overlay"></div>
</template>