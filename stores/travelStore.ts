import type {Travel} from "~/types/travel";
import {useToast} from "vue-toast-notification";
import {createTravel} from "~/composables/useMockService";

export enum TravelsSort {
    bestRating = 'Best Rating',
    newest = 'Newest',
    priceLTH = 'Price Low To High',
    priceHTL = 'Price High to Low',
}
interface TravelState {
    travels: Travel[];
    selectedTravel: Travel | null;
    isCreatingTravel: boolean;
    isUpdatingTravel: boolean;
    selectedSort: TravelsSort | null;
}

const initialState = {
    travels: [],
    selectedTravel: null,
    selectedSort: null,
    isCreatingTravel: false,
    isUpdatingTravel: false,
}
export const useTravelStore = defineStore({
    id: 'travelStore',
    state: (): TravelState => ({ ...initialState }),
    actions: {
        clearStore() {
            this.travels = [];
            this.selectedTravel = null;
            this.isCreatingTravel = false;
        },
        setSelectedTravel(travel: Travel) {
            this.selectedTravel = travel;
        },
        updateTravel() {
            console.log('update travel')
            useToast().success('Travel Updated with success!', { position: 'top-right', duration: 3000});
            this.isUpdatingTravel = false;
            useRouter().go(-1);
        },
        deleteTravel() {
            this.travels = this.travels.filter(travel => travel.id !== this.selectedTravel!.id);
            useToast().success('Travel Deleted with success!', { position: 'top-right', duration: 3000});
            useRouter().go(-1);
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
        sortTravels(sort: TravelsSort) {
            if(sort === TravelsSort.bestRating) {
                this.travels.sort((a, b) => {
                    return  b.rating -  a.rating;
                });
            }
            if(sort === TravelsSort.newest) {
                this.travels.sort((a, b) => {
                    return  new Date(b.departureDate).getTime() -  new Date(a.departureDate).getTime();
                });
            }
            if(sort === TravelsSort.priceLTH) {
                this.travels.sort((a, b) => {
                    return  a.price -  b.price ;
                });
            }
            if(sort === TravelsSort.priceHTL) {
                this.travels.sort((a, b) => {
                    return  b.price -  a.price;
                });
            }
            this.selectedSort = sort;
        }
    },
    getters: {
        selectedSortValue: (state: TravelState) => state.selectedSort ? state.selectedSort : 'Sort',
    }
})