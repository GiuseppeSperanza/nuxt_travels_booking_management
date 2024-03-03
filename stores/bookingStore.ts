import type {Booking} from "~/types/booking";

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
        getBookingsList() {
            console.log('get bookings list')
        }
    }
})