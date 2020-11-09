import values from 'lodash/values';

const airbnbElements = {
    LOCATION: '#bigsearch-query-detached-query',
    FIRST_ITEM: '#Koan-query__option-0',
    LOCATION_LIST_BOX: '[role="listbox"] li',
    GUESTS: '[data-testid="structured-search-input-field-guests-button"]',
    INFANTS_PLUS_BUTTON: '#stepper-infants [data-testid="stepper-infants-increase-button"]',
    INFANTS_COUNTER_LABEL: '[data-testid="stepper-infants-value"]',
    DATE_BUTTON: '[data-testid="structured-search-input-field-split-dates-0"]',
    ADULT_PLUS_BUTTON: '#stepper-adults [data-testid="stepper-adults-increase-button"]',
    ADULT_COUNTER_LABEL: '#stepper-adults span:nth-child(1)',
    SEARCH_BUTTON: '[data-testid="structured-search-input-search-button"]',
    DATE_PREVIOUS_MARK: 'button[aria-label="Previous"]',
    MONTH_TITLE: '._umpo2eg',
    DATE_NEXT_MARK: 'button[aria-label="Next"]',
    DATE_PICKER: '[data-testid="datepicker-day'
};
export default airbnbElements

const MONTH = {
    February: '02',
    March: '03',
    // So on
};

export const guestsType = {
    INFANTS: 'INFANTS',
    ADULT: 'ADULT'
};

// Functions:
export const selectLocation = (locationName, locationExist) => {
    let selectedItem='';
    let listSize=0;
    cy.get(airbnbElements.LOCATION).type(locationName, { force: true }).then(() => {
        //let promise = Promise.reject(new Error('ERROR WHILE SELECTING LOCATION'));
        if (locationExist == "True") {
            cy.get(airbnbElements.LOCATION_LIST_BOX).should(($p) => {
                listSize = $p.length;
                expect($p).to.have.length(listSize)
            });
            cy.get(airbnbElements.LOCATION_LIST_BOX).should('contain', locationName);

            cy.get(airbnbElements.LOCATION_LIST_BOX).then(($items) => {
            if (values($items).map(o => o.textContent).length > 0) {
                selectedItem = $items[0].innerText;
                cy.log(`Selected name:  ${selectedItem}`);
                expect(selectedItem).contains(locationName);
                cy.get(airbnbElements.FIRST_ITEM).click({ force: true })
                // promise = cy.get(airbnbElements.FIRST_ITEM, ).then(($location) => {
                //     cy.log(`Clicking on:  ${selectedItem}`);
                //     $location[0].click();
                // });
                }
            });
        }else {
            cy.log('Empty location list -> # of items = ' +listSize);
            expect(listSize).to.eq(0)
        }
    })
};
/*
    Hed, In airbnb web site, there is no option to select start date > end date
    so I skipped that validation.
*/
export const selectDates = (year, month, startDate, endDate) => {
    cy.log('Date selection');
    cy.get(airbnbElements.DATE_BUTTON).click({force: true});

    for (let i = 0; i < 11; i += 1) {
        cy.get(airbnbElements.MONTH_TITLE).then(($monthTitle) => {
            cy.log('current MONTH = ' + $monthTitle[0].textContent); //Feb 2021 - month - Feb
            const finalDate =  month + ' ' + year;
        if (($monthTitle[0].textContent) !== finalDate) {
                cy.log('i ==== ' + i);
                cy.get(airbnbElements.DATE_NEXT_MARK).click({force: true});
                cy.wait(100)// not mandatory, just nice to see it moving :-)
            }
        else {
            cy.get(airbnbElements.MONTH_TITLE).should('contain', finalDate);
        }
        });
    }
        cy.get(`${airbnbElements.DATE_PICKER}-${year}-${MONTH.February}-${startDate}"]`).click({ force: true });
        cy.get(`${airbnbElements.DATE_PICKER}-${year}-${MONTH.February}-${endDate}"]`).click({ force: true });
};

export const selectGuests = (type) => {
    cy.get(airbnbElements.GUESTS).click({ force: true });

    if (type === guestsType.INFANTS) {
        cy.get(airbnbElements.INFANTS_PLUS_BUTTON).click({ force: true });
        cy.get(airbnbElements.INFANTS_COUNTER_LABEL).then(($label) => {
            expect($label[0].innerText).to.have.string('1')
        })
    }

    if (type === guestsType.ADULT) {
        cy.get(airbnbElements.ADULT_PLUS_BUTTON).click({force: true});
        cy.get(airbnbElements.ADULT_COUNTER_LABEL).then(($label) => {
            const counter = values($label).map(o => o.textContent)[1]
            expect(counter).to.have.string('1')
        })
    }

};

export const validateLandingPage = (countryName, month, startDate, endDate) => {
    const name = countryName.split(',');
    cy.url().should('include', name[0]) ;
    cy.contains('Stays in ' + name[0]);
    cy.contains(month.substring(0,3) + ' ' + startDate + ' - ' + endDate + ' · 1 guest');
};