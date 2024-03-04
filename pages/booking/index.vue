<script setup lang="ts">
import {useBookingStore} from "~/stores/bookingStore";
import type {Booking} from "~/types/booking";
import BookingsList from "~/components/bookings/BookingsList.vue";
import BookingsActions from "~/components/bookings/BookingsActions.vue";
import Footer from "~/components/shared/Footer.vue";
import type {Travel} from "~/types/travel";
import {useTravelStore} from "~/stores/travelStore";

const bookingStore = useBookingStore();
const travelStore = useTravelStore();
const { isCreatingBooking } = storeToRefs(bookingStore);

const [{ data: bookings }, { data: travels }] = await Promise.all([
  await useAsyncData<Booking[]>(() => $fetch('/api/getBookings'), {
    server: true,
  }),
  await useAsyncData<Travel[]>(() => $fetch('/api/getTravels'), {
    server: true,
  })
])
bookingStore.setupStore(bookings.value!);
travelStore.setupStore(travels.value!);

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