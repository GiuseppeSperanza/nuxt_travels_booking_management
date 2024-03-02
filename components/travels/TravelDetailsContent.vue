<script setup lang="ts">
import {useTravelStore} from "~/stores/travelStore";
import {convertDateToString, getDiscount} from "~/utils/string.utils";

const travelStore = useTravelStore();

const { selectedTravel } = storeToRefs(travelStore);


const initialPrice = selectedTravel.value ? Math.round(selectedTravel.value!.price + getDiscount(selectedTravel.value!.price)) : 0;
const discount = 10;
const days = selectedTravel.value ? getDifferenceDate(selectedTravel.value.departureDate, selectedTravel.value.returnDate ) : 0;
const total = (initialPrice * days) - Math.round(getDiscount(initialPrice * days));
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
    </div>
    <!-- sidebar -->
  </div>
  <div v-else> Caricamento... </div>
</template>