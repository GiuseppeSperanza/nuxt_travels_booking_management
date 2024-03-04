import type {Travel} from "~/types/travel";
import {PaymentStatus, type PaymentType} from "~/utils/constants.utils";

export type Customer = {
    fullName: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    id: string;
}

export type Booking = {
    travel: Travel;
    customer: Customer;
    paymentType: PaymentType;
    note: string;
    statusPayment: PaymentStatus;
}