<script setup lang="ts">
import {FormWizard, TabContent} from 'vue3-form-wizard';
import {useTravelStore} from "~/stores/travelStore";
import type {Travel} from "~/types/travel";
import {convertDateToString, findKeys} from "~/utils/string.utils";
import {PaymentStatus, PaymentType} from "~/utils/constants.utils";
import type {Booking} from "~/types/booking";
import {v4 as uuidv4} from "uuid";
const emit = defineEmits(['onComplete'])
const travelStore = useTravelStore();

const selectedTravel = ref<Travel>();
const customerFullName = ref('');
const customerEmail = ref('');
const customerPhone = ref();
const customerAge = ref();
const customerGender = ref('');
const paymentType = ref('Paypal');
const notes = ref('');

const isCreateDisabled = computed(() => Boolean(selectedTravel.value)
    && customerFullName.value.trim() !== ''
    && customerEmail.value.trim() !== ''
    && customerPhone.value > 0
    && customerAge.value > 0
    && customerGender.value.trim() !== ''
    && paymentType.value.trim() !== ''
)
const onChange = (prevIndex: number, nextIndex: number) => {
  if(nextIndex === 2) {
      const newBooking: Booking = {
        travel: selectedTravel.value!,
        customer: {
          fullName: customerFullName.value!,
          email: customerEmail.value!,
          phone: customerPhone.value!,
          age: customerAge.value!,
          gender: customerGender.value,
          id: uuidv4()
        },
        paymentType: findKeys(PaymentType, paymentType.value!) as PaymentType,
        note: notes.value,
        statusPayment: PaymentStatus.pending
      }


    emit('onComplete', !isCreateDisabled.value, newBooking);
  }
}
</script>
<template>
  <form-wizard @on-change="onChange"  :hideButtons="false" finishButtonText="Click on create Booking" stepSize="lg" color="#78ab8a">
    <tab-content title="Travel Info">
      <label for="travels" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an Travel</label>
      <select v-model="selectedTravel" id="travels" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose a Travel</option>
        <option v-for="travel in travelStore.travels" :key="travel.id" :value="travel">{{ travel.name }}</option>
      </select>
      <div class="selected-travel-info">
        <p class="selected-travel-info__title">Travel Summary:</p>
        <p class="selected-travel-info__description" v-if="selectedTravel">
          <span> Name: {{ selectedTravel.name }}</span>
          <span>  Departure Date:  {{ convertDateToString(selectedTravel.departureDate) }} </span>
          <span>  Return Date:  {{ convertDateToString(selectedTravel.returnDate) }}</span>
          <span>  Price:  {{ selectedTravel.price }}</span>
          <span>  Rating:  {{ selectedTravel.rating }}/5</span>
        </p>
        <p v-else>-</p>
      </div>
    </tab-content>
    <tab-content title="Customer Info">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2 selected-travel-info__input-label" for="fullname">Full Name</label>
        <input
            v-model='customerFullName'
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullname"
            type="text"
            placeholder="Customer Name"
            required
        >
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2 selected-travel-info__input-label" for="email">Email</label>
        <input
            v-model='customerEmail'
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Customer Email"
            required
        >
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">
          Phone
        </label>
        <input v-model='customerPhone' type="number" id="phone" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Customer Phone Number" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="age">
          Age
        </label>
        <input v-model='customerAge' type="number" id="age" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Customer Age" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="age">
          Gender
        </label>
        <select v-model="customerGender" id="gender" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Choose a Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </tab-content>
    <tab-content title="Last Step">
      <div class="selected-travel-info">
        <p class="selected-travel-info__title">Choose a payment type:</p>
        <select v-model="paymentType" id="paymentType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option v-for="type in Object.values(PaymentType)" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <div class="selected-travel-info">
        <p class="selected-travel-info__title">Leave some notes about the trip</p>
        <textarea v-model='notes' id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your notes here..."></textarea>
      </div>
    </tab-content>
    <template v-slot:finish>
      &nbsp;
    </template>
  </form-wizard>
</template>
<style scoped lang="scss">
.selected-travel-info {
  height: 200px;
  padding: 1rem 0;
  font-size: 1rem;
  &__title {
    font-size: 18px;
    margin: 10px 0;
    font-weight: bold;
  }
  &__description {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}
</style>