import type {Travel} from "~/types/travel";

interface TravelState {
    travels: Travel[];
    selectedTravel: Travel | null;
}

const initialState = {
    travels: [],
    selectedTravel: null
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
        }
    },
    getters: {

    }
})