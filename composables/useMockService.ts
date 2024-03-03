import {faker} from "@faker-js/faker";
import type {Travel} from "~/types/travel";
import {v4 as uuidv4} from "uuid";
import {getTwoDates} from "~/utils/string.utils";
import {type Booking, type Customer} from "~/types/booking";
import {PaymentStatus, PaymentType} from "~/utils/constants.utils";

export function createTravel(index: number): Travel {
    const [firstDate, secondDate] = getTwoDates();
    const name = Math.floor(Math.random() * (1000 - index + 1));
    return {
        id: uuidv4(),
        name: `Viaggio numero: ${name}`,
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

export function createCustomer(): Customer {
    return {
        fullName: faker.person.fullName(),
        id: uuidv4(),
    }
}

export function createBooking(): Booking {
    const paymentStatusKeys = Object.keys(PaymentStatus) as Array<keyof typeof PaymentStatus>;
    const paymentTypeKeys = Object.keys(PaymentType) as Array<keyof typeof PaymentType>;
    const randomPaymentStatusKey = paymentStatusKeys[Math.floor(Math.random() * paymentStatusKeys.length)];
    const randomPaymentTypeKey = paymentTypeKeys[Math.floor(Math.random() * paymentTypeKeys.length)];

    return {
        travel: createTravel(Math.floor(Math.random() * 9) + 1),
        customer: createCustomer(),
        paymentType: randomPaymentTypeKey as PaymentType,
        note: faker.lorem.words({ min: 150, max: 300 }),
        statusPayment: randomPaymentStatusKey as PaymentStatus,
    };
}