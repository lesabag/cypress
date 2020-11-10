import airbnbElements, {selectDates, selectGuests, selectLocation} from "../pages/airbnb";
import {updateLocation} from "./location_helper";


export const bookARide = (rideDetails) => {

    selectLocation(rideDetails.country_);

    cy.get(airbnbElements.LOCATION).clear({force: true});

    updateLocation(rideDetails.country_, true);

    selectDates(rideDetails.year_, rideDetails.month_, rideDetails.startDate, rideDetails.endDate);
    cy.log('rideDetails.guestType ::::::: ' + rideDetails.guestType);
    selectGuests(rideDetails.guestType);

    // SEARCH BUTTON
    cy.get(airbnbElements.SEARCH_BUTTON).click({force: true});
};
