import {travelsMock} from "~/composables/useMockService";
import {Travel} from "~/types/travel";

export default defineEventHandler(async (event) => {
    try {
       return travelsMock().map((travel: Travel) => {
           return {
               ...travel,
               departureDate: travel.departureDate.toLocaleDateString('it-IT',  { day: 'numeric', month: 'long', year: 'numeric' }),
               returnDate: travel.returnDate.toLocaleDateString('it-IT',  { day: 'numeric', month: 'long', year: 'numeric' }),
           }
       });
    } catch (error) {
        throw error
    }
})
