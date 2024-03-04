import type {Booking} from "~/types/booking";
import {useToast} from "vue-toast-notification";
import {createBooking} from "~/composables/useMockService";

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
        createBooking(newBooking: Booking) {
            const customerName = newBooking.customer.fullName;
            useToast().success(`Booking for ${customerName} with success!`, { position: 'top-right', duration: 5000});
            this.bookings.push(createBooking());
            this.isCreatingBooking = false;
        }
    }
})