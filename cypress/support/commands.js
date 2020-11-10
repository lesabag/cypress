let  lengthOfPermutation = 0 ;
let counter = 0 ;
export var currentRideDetails ;
beforeEach(() => {
    //An option to get env/params from a file called cy.fixture('sut').as('adminUser');
    cy.visit('/');
    cy.get('[aria-label="Airbnb homepage"]').then(($welcome) => {
        if ($welcome) {
            cy.log('Airbnb site is alive');
        } else {
            throw new Error('Failed to open Airbnb.com');
        }
    });
    //cy.fixture('ride_sut').as('ride_details');
});

before(() => {
    cy.fixture('ride_sut').as('ride_details');
    cy.get("@ride_details").then(fileData => {
        lengthOfPermutation = fileData.length
        cy.log('lengthOfPermutation: ' + lengthOfPermutation)
        // fileData.forEach(data => {
        //     currentRideDetails = data[counter];
        // });
        // cy.log(' ============ before iteration +  ' + counter)
    });
});

afterEach(() => {
    if (counter < lengthOfPermutation){
        cy.visit('/');
        counter ++;
    }

});