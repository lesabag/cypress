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
});