export function isTravelPage(url: string): boolean {
    const travelPage = /travels\/?/i;
    return travelPage.test(url);
}

export function isBookingPage(url: string): boolean {
    const bookingPage = /booking\/?/i;
    return bookingPage.test(url);
}