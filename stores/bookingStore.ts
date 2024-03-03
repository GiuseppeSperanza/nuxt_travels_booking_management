import type {Booking} from "~/types/booking";

interface BookingState {
    bookings: Booking[];
    isCreatingBooking: boolean;
    selectedBooking: Booking | null;
}

const initialState = {
    bookings: [],
    selectedBooking: null,
    isCreatingBooking: false,
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
    }
})