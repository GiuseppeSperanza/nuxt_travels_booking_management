import { it, expect, describe } from 'vitest';
import BookingsRootPage from "../pages/booking/index.vue";
import {renderSuspended} from "@nuxt/test-utils/runtime";
import { screen } from '@testing-library/vue'
import {createPinia, setActivePinia} from "pinia";
import {useBookingStore} from "~/stores/bookingStore";
import {createBooking} from "~/composables/useMockService";



describe('Bookings Page is defined', async () => {

    it('check Bookings title page exist', async () => {
        await renderSuspended(BookingsRootPage)
        expect(screen.getByText('Bookings')).toBeDefined()
    });

    it('Table Header booking exist', async () => {
        await renderSuspended(BookingsRootPage)
        expect(screen.getByText('Client / Travel ID')).toBeDefined()
        expect(screen.getByText('Amount')).toBeDefined()
        expect(screen.getByText('Departure / Return')).toBeDefined()
        expect(screen.getByText('Notes')).toBeDefined()
        expect(screen.getByText('Status')).toBeDefined()
    });

    it('Check Bookings list is correctly populated', async () => {
        expect(BookingsRootPage).toBeTruthy();
        setActivePinia(createPinia());
        const bookingStore = useBookingStore();
        expect(bookingStore.bookings.length).toBe(0);
        bookingStore.bookings.push(createBooking());
        expect(bookingStore.bookings.length).toBe(1);
        for(let index = 0; index < 10; index++) {
            bookingStore.bookings.push(createBooking());
        }
        expect(bookingStore.bookings.length).toBe(11);
    });
});


