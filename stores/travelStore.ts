import type {Travel} from "~/types/travel";
import {useToast} from "vue-toast-notification";
import {createTravel} from "~/composables/useMockService";


interface TravelState {
    travels: Travel[];
    selectedTravel: Travel | null;
    isCreatingTravel: boolean;
}

const initialState = {
    travels: [],
    selectedTravel: null,
    isCreatingTravel: false,
}
export const useTravelStore = defineStore({
    id: 'travelStore',
    state: (): TravelState => ({ ...initialState }),
    actions: {
        clearStore() {
            this.travels = [];
            this.selectedTravel = null;
        },
        setSelectedTravel(travel: Travel) {
            this.selectedTravel = travel;
        },
        setupStore(travels: Travel[]) {
            this.clearStore();
            this.travels = travels;
        },
        addNewTravel() {
            this.isCreatingTravel = false;
            const newTravel = createTravel(Math.floor(Math.random() * 9) + 1);
            this.travels.unshift(newTravel);
            useToast().success('Travel Added with success!', { position: 'top-right', duration: 3000});
        },
    },
    getters: {

    }
})