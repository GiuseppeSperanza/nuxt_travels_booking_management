export const convertDateToString = (date: Date) => {
    return new Date(date).toLocaleDateString('it-IT',  { day: 'numeric', month: 'long', year: 'numeric' });
}

export const getRandomNumber = () => {
    return Math.floor(Math.random() * 1000) + 1;
}

export const getTwoDates = () => {
    const randomDays = Math.floor(Math.random() * 10) + 1;
    const firstDate = new Date();
    firstDate.setDate(firstDate.getDate() + randomDays);
    const secondDate = new Date(firstDate.getTime() + randomDays * 24 * 60 * 60 * 1000); // Aggiungi giorni casuali alla prima data

    return [firstDate, secondDate];
}

export const getDifferenceDate = (firstDate: Date, secondDate: Date) => {
    const milliseconds = Math.abs(new Date(secondDate).getTime() - new Date(firstDate).getTime());
    const totalMilliseconds = 1000 * 60 * 60 * 24;
    return Math.ceil(milliseconds / totalMilliseconds);
}

export const getDiscount = (price: number) => {
    return price * 0.1;
}