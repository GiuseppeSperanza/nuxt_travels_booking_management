import {isBookingPage, isTravelPage} from "~/composables/useCheckPages";
import {useTravelStore} from "~/stores/travelStore";
import type {Travel} from "~/types/travel";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if(isTravelPage(to.path)) {
        const { data } = await useAsyncData<Travel[]>('travels', () => $fetch('/api/getTravels'));
        useTravelStore().setupStore(data.value!)
    }

    if(isBookingPage(to.path)) {
        console.log('MIDDLEWAREW booking PAGE');
    }
})