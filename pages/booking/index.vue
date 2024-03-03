<script setup lang="ts">
import {useBookingStore} from "~/stores/bookingStore";
import type {Booking} from "~/types/booking";
import {PaymentStatus} from "~/utils/constants.utils";
import type {Travel} from "~/types/travel";
import {convertDateToString} from "~/utils/string.utils";

const bookingStore = useBookingStore();
const { data } = await useAsyncData<Booking[]>(() => $fetch('/api/getBookings'), {
  server: true,
});
bookingStore.setupStore(data.value!)

const getTotal = (travel: Travel) => getDifferenceDate(travel.departureDate, travel.returnDate) * travel.price;

</script>
<template>
  <section class="bookings-page">
    <div class="container px-5 py-5 mx-auto">
      <div>
        <h2 class="text-2xl font-semibold leading-tight py-5">Bookings</h2>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Client / Travel ID
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Departure / Return
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Notes
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(booking, index) in bookingStore.bookings">
                  <td class="px-5 py-5 bg-white text-sm">
                    <div class="flex">
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {{ booking.customer.fullName }}
                        </p>
                        <p class="text-gray-600 whitespace-no-wrap"> {{ booking.customer.id }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">&euro;{{getTotal(booking.travel) }}</p>
                    <p class="text-gray-600 whitespace-no-wrap">EUR</p>
                  </td>
                  <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">{{ convertDateToString(booking.travel.departureDate) }}</p>
                    <p class="text-gray-600 whitespace-no-wrap">{{ convertDateToString(booking.travel.returnDate)}}</p>
                  </td>
                  <td class="px-5 py-5 bg-white text-sm">
                    <p class="text-gray-600 whitespace-no-wrap bookings-page__note">
                      {{ booking.note }}
                    </p>
                  </td>
                  <td class="px-5 py-5 bg-white text-sm">
                     <span v-if="booking.statusPayment === PaymentStatus.paid" class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span class="relative">Paid</span>
                    </span>
                    <span v-if="booking.statusPayment === PaymentStatus.pending" class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                      <span class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
                      <span class="relative">Pending</span>
                    </span>
                    <span v-if="booking.statusPayment === PaymentStatus.overdue" class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                      <span class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                      <span class="relative">Overdue</span>
                    </span>
                  </td>
                  <td class="px-5 py-5 bg-white text-sm text-right">
                  <button type="button" class="inline-block text-gray-500 hover:text-gray-700">
                    <svg class="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
                      <path
                          d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                      />
                    </svg>
                  </button>
                </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

    </div>
  </section>
</template>