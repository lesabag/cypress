
import airbnbElements, {
    guestsType,
    selectDates,
    selectGuests,
    selectLocation,
    validateLandingPage
} from "../pages/airbnb";

describe('Air Bnb Test', () => {
    it('BOOK NOW WITH INFANTS', () => {
        const startDate = 10;
        const endDate = 20;
        const year = 2021;
        const month = 'February';
        const countryName = 'Holand, Norway';

        selectLocation(`Paris, France`, "True");
        cy.get(airbnbElements.LOCATION).clear({ force: true });

        // Change location
        selectLocation(countryName, "True");
        cy.get(airbnbElements.LOCATION).clear({ force: true });

        selectDates(year,  month, startDate, endDate);

        selectGuests(guestsType.INFANTS);
        // SEARCH
        cy.get(airbnbElements.SEARCH_BUTTON).click({ force: true });

        validateLandingPage(countryName, month, startDate, endDate);
    });

    it('BOOK NOW - ONLY ADULT', () => {
        const startDate = 12;
        const endDate = 25;
        const year = 2021;
        const month = 'February';
        const countryName = 'Paris, France';

        selectLocation(`Paris, France`, "True");
        cy.get(airbnbElements.LOCATION).clear({ force: true });

        selectDates(year,  month, startDate, endDate);

        selectGuests(guestsType.ADULT);
        // SEARCH
        cy.get(airbnbElements.SEARCH_BUTTON).click({ force: true });

        validateLandingPage(countryName, month, startDate, endDate);
    });

    it('Negative test - No such place on earth', () => {
        cy.get(airbnbElements.LOCATION).clear({ force: true });
        selectLocation(`lkl`, "False");
    });
});