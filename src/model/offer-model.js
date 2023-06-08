import { generateOffersByType, generateOffer } from '../mock/offer.js';
import { type, shuffle, getRandomInteger } from '../utils.js';

const MAX_EMPTINESS_VARIETY = 5;

const OFFERS_TITLES = [
  'Add luggage',
  'Switch to comfort',
  'Add meal',
  'Choose seats',
  'Travel by train',
  'Call a taxi',
  'Add drinks'
];

export default class OfferByTypeModel{
  constructor(){
    this.offers = Array.from(OFFERS_TITLES, (title, id) => generateOffer(id, title));
    this.offersByType = getRandomInteger(0, MAX_EMPTINESS_VARIETY) ? Array.from(type,
      (types) => generateOffersByType(types, shuffle(this.offers).slice(0, getRandomInteger(1, this.offers.length)))) : [];
  }

  getOffersByType() {
    return this.offersByType;
  }

  getOffers() {
    return this.offers;
  }
}
