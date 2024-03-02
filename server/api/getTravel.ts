import {getSelectedTravelMock} from "~/composables/useMockService";

export default defineEventHandler(async (event) => {
    try {
        return getSelectedTravelMock(Math.floor(Math.random() * 9) + 1);
    } catch (error) {
        throw error
    }
})
