
import airbnbElements, {
    guestsType,
    selectLocation,
    validateLandingPage
} from "../pages/airbnb";
import {bookARide} from "../businessFlow/order_flow";



describe('Airbnb Test', () => {
    it('BOOK NOW WITH INFANTS', () => {

        cy.fixture('ride_sut').then(test_data => {

            bookARide(test_data[0]);

            validateLandingPage(test_data[0]);
        });
    });

    it('BOOK NOW - ONLY ADULT', () => {

        cy.fixture('ride_sut').then(test_data => {

            bookARide(test_data[1]);

            validateLandingPage(test_data[1]);
        });
    });

    it('Negative test - No such place on earth', () => {
            cy.get(airbnbElements.LOCATION).clear({ force: true });
            selectLocation(`lkl`, false);
        });
});