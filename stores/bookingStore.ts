import type {Booking} from "~/types/booking";
import type {Travel} from "~/types/travel";

interface BookingState {
    bookings: Booking[];
    selectedBooking: Booking | null;
}

const initialState = {
    bookings: [],
    selectedBooking: null,
}
export const useBookingStore = defineStore({
    id: 'bookingStore',
    state: (): BookingState => ({ ...initialState }),
    actions: {
        setupStore(bookings: Booking[]) {
            this.clearStore();
            this.bookings = bookings;
        },
        clearStore() {
            this.bookings = [];
            this.selectedBooking = null;
        },
        getBookingsList() {
            console.log('get bookings list')
        }
    }
})