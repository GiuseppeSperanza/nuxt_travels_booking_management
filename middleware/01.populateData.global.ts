import {isBookingPage, isTravelPage} from "~/composables/useCheckPages";
import {useTravelStore} from "~/stores/travelStore";
import type {Travel} from "~/types/travel";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const travelRoot = 'travels';
    const travelDetails = 'travels-id';

    if(isTravelPage(to.path)) {
        if(to.name === travelRoot) {
            const { data } = await useAsyncData<Travel[]>(() => $fetch('/api/getTravels'));
         //   const { data } = await useAsyncData<Travel[]>(travelRoot, () => $fetch('/api/getTravels'));
            useTravelStore().setupStore(data.value!)
        }
        if(to.name === travelDetails) {
            const { data } = await useAsyncData<Travel>(() => $fetch('/api/getTravel'));
            useTravelStore().setSelectedTravel(data.value!);
        }
    }

    if(isBookingPage(to.path)) {
        console.log('MIDDLEWAREW booking PAGE');
    }

    //return navigateTo('/', { redirectCode: 301 })
})