import {faker} from "@faker-js/faker";
import type {Travel} from "~/types/travel";
import {v4 as uuidv4} from "uuid";

export function travelsMock() {
    const total = 9;
    const travels: Travel[] = [];
    for (let index = 1; index <= total; index++) {
        const initialDate = (days: number = 1): Date => faker.date.soon({days});
        const travel: Travel = {
            id: uuidv4(),
            name: `Viaggio numero: ${index}`,
            departureDate: initialDate(),
            returnDate: initialDate(7),
            picture: `~/assets/images/tour-${index}`,
            description: faker.lorem.text(),
            price: Number(faker.commerce.price()),
            rating: Number(faker.commerce.price({ min: 1, max: 5 }))
        }
        travels.push(travel);
    }

    return travels;
}