const generateTicket = (tripId) => {
    const min = 10000;
    const max = 99999;
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    const ticket = `TCADV${tripId}-${randomNumber}`;
    return ticket;
}

module.exports = generateTicket;