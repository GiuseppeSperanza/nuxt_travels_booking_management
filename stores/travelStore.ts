import type {Travel} from "~/types/travel";
import {faker} from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

interface TravelState {
    travels: Travel[];
}

const initialState = {
    travels: []
}
export const useTravelStore = defineStore({
    id: 'travelStore',
    state: (): TravelState => ({ ...initialState }),
    actions: {
        clearStore() {
            this.travels = [];
        },
        setupStore(travels: Travel[]) {
            this.clearStore();
            this.travels = travels;
        }
    }
})