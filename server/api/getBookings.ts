import {bookingsMock} from "~/composables/useMockService";

export default defineEventHandler(async (event) => {
    try {
        return bookingsMock();
    } catch (error) {
        throw error
    }
})
