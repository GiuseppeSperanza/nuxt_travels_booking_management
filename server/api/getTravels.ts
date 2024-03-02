import {travelsMock} from "~/composables/useMockService";

export default defineEventHandler(async (event) => {
    try {
        return travelsMock();
    } catch (error) {
        throw error
    }
})
