import airbnbElements, {selectLocation} from "../pages/airbnb";

export const updateLocation = (country, isLocationExist) => {
    selectLocation(country, true);
    cy.get(airbnbElements.LOCATION).clear({force: true});
};