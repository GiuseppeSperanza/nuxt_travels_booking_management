<script setup lang="ts">

import {useTravelStore} from "~/stores/travelStore";

const travelStore = useTravelStore()
</script>

<template>
  <div class="modal-new-travel inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6">
   <div class="modal-new-travel__content">
     <div class="sm:flex sm:items-start">
       <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
         <span class="material-icons-outlined"> travel_explore </span>
       </div>
       <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
         <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Add new Travel</h3>
       </div>
     </div>
     <div class="modal-new-travel__form">
       <slot></slot>
     </div>
     <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse modal-new-travel__buttons">
       <button
           type="button"
           class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2  sm:mt-0 sm:w-auto sm:text-sm">
         Create Travel
       </button>
       <button
           @click="travelStore.addNewTravel"
           type="button"
           class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
         Cancel
       </button>
     </div>
   </div>
  </div>
</template>
<style scoped lang="scss">
.modal-new-travel {
  position: absolute;
  width: 50%;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
  z-index: 9999;

  &__content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1rem;
  }
  &__form {
    margin-top: 3rem;
    width: 80%;
  }

  @media(max-width: $mobileSize) {
    width: 90%;
    height: 700px;
    top: 10%;
  }

  &__buttons {
    position: absolute;
    bottom: 5rem;
    display: flex;
    justify-content: center;
    width: 90%;
    gap: 10px;

    button {
      width: 50%;
    }
  }
}
</style>