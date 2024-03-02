
interface BookingState {

}

const initialState = {

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