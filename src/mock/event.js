import { getRandomInteger, shuffle } from '../utils/common.js';
import { generateDateTo } from '../utils/event-date.js';

const MIN_BASE_PRICE = 1000;
const MAX_BASE_PRICE = 10000;

const generateTripEvent = (id, type, offersByType, destination, dateFrom) => (
  {
    id,
    basePrice: getRandomInteger(MIN_BASE_PRICE, MAX_BASE_PRICE),
    dateFrom,
    dateTo: generateDateTo(dateFrom),
    destination,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: offersByType.length ? shuffle(Array.from(offersByType, (offer) => offer.id)).slice(0, getRandomInteger(1, offersByType.length)) : [],
    type,
  }
);

export {generateTripEvent};
