import type {Travel} from "~/types/travel";

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
            this.isCreatingTravel = ! this.isCreatingTravel;
        },
    },
    getters: {

    }
})