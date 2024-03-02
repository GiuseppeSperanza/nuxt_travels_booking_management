import {faker} from "@faker-js/faker";
import type {Travel} from "~/types/travel";
import {v4 as uuidv4} from "uuid";
import {getTwoDates} from "~/utils/string.utils";


export function createTravel(index: number): Travel {
    const [firstDate, secondDate] = getTwoDates();
    return {
        id: uuidv4(),
        name: `Viaggio numero: ${index}`,
        departureDate: firstDate,
        returnDate: secondDate,
        picture: `/images/tour-${index}.jpeg`,
        description: faker.lorem.words({ min: 150, max: 300 }),
        price: Number(faker.commerce.price()),
        rating: Number(faker.commerce.price({min: 1, max: 5})),
        locality: faker.location.city()
    };
}
export function travelsMock() {
    const total = 9;
    const travels: Travel[] = [];
    for (let index = 1; index <= total; index++) {
        travels.push(createTravel(index));
    }

    return travels;
}

export function getSelectedTravelMock(index: number) {
    return createTravel(index);
}