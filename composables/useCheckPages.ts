export function isTravelPage(url: string): boolean {
    const travelPage = /\btravels\b/i;
    return travelPage.test(url);
}

export function isBookingPage(url: string): boolean {
    const bookingPage = /\bbooking\b/i;
    return bookingPage.test(url);
}