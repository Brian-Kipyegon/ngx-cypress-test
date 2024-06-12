/// <reference types="cypress" />

// Defines the test suite
describe("First Test suite", () => {
    // Defines the test case
    it("First test case", () => {

        // Visit the page
        cy.visit("/");

        cy.contains("Forms").click();
        cy.contains("Form Layouts").click();
        
        // Getting HTML elements
        // By tag name
        cy.get("input");

        // BY ID
        cy.get("#inputEmail1");

        // By class value
        cy.get(".input-full-width");

        // By attribute
        cy.get("[fullwidth]");

        // By attribute value
        cy.get("[placeholder='Email']");

        // By entire class value
        cy.get("[class='input-full-width size-medium shape-rectangle']");

        // By multiple attribute
        cy.get("[placeholder='Email'][fullWidth]");

        // By tag, attribute, id, and class
        cy.get("input[placeholder='Email']#inputEmail1.input-full-width");

        // By cypress test id
        cy.get("[data-cy='imputEmail1']");

        cy.wait(1000);

    });

    it("Second test", () => {
        cy.visit("/");
        cy.contains("Forms").click();
        cy.wait(1000);
        cy.contains("Form Layouts").click();
        cy.wait(1000);

        // Theory
        // get() = finds elements on page by locator globally
        // find() - finds child elements on the page
        // contains() = finds HTML text and by text and locator

        cy.contains("Sign in");
        cy.contains("[status='warning']", "Sign in");
        cy.contains('nb-card', 'Horizontal form').find("button");
        cy.contains('nb-card', 'Horizontal form').contains("Sign in");
        cy.contains('nb-card', 'Horizontal form').get('button');
        cy.wait(1000);

        // Cypress chains and DOM
        cy.get("#inputEmail3")
            .parents('form')
            .find("button")
            .should("contain", "Sign in")
            .parents('form')
            .find("nb-checkbox")
            .click();

        cy.wait(1000);
    })

    it('save the subject of the command', () => {
        cy.visit("/");
        cy.contains("Forms").click();
        cy.wait(1000);
        cy.contains("Form Layouts").click();
        cy.wait(1000);

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');
        cy.wait(1000);

        //Can't do things like this.
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid');
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email');
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password');

        // 1 Cypress alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid');
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password');
        cy.wait(1000);

        // 2 Cypress then
        cy.contains('nb-card', 'Using the Grid').then(usingTheGridForm => {
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain', 'Email');
            cy.wrap(usingTheGridForm).find('[for="inputPassword2"]').should('contain', 'Password');
        })

        cy.wait(1000);
    })

    it("extract text values", () => {
        cy.visit("/");
        cy.contains("Forms").click();
        cy.wait(1000);
        cy.contains("Form Layouts").click();
        cy.wait(1000);

        // 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

        // 2
        cy.get('[for="exampleInputEmail1"]').then( label => {
            const labelText = label.text();
            expect(labelText).to.equal('Email address');
            cy.wrap(labelText).should('contain', 'Email address');
        })

        // 3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address');
        });
        cy.get('[for="exampleInputEmail1"]').invoke('text').as('labelText').should('contain', 'Email address');

        // 4
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then( classValue => {
            expect(classValue).to.contain('label');
        })

        // 5 invoke property
        cy.get("#exampleInputEmail1").type('test@test.com');
        cy.wait(1000);
        cy.get("#exampleInputEmail1").invoke('prop', 'value').should('contain', 'test@test.com');
        cy.wait(1000);
    })

    it("radio button", () => {
        cy.visit("/");
        cy.contains("Forms").click();
        cy.contains("Form Layouts").click();

        cy.contains("nb-card", "Using the Grid").find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
                .eq(0)
                .check({force: true})
                .should('be.checked');

            cy.wrap(radioButtons)
                .eq(1)
                .check({force: true});

                cy.wait(1000);

            cy.wrap(radioButtons)
                .eq(0)
                .should('not.be.checked');

                cy.wait(1000);

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled');
        });

        cy.wait(1000);
    })

    it("check boxes", () => {
        cy.visit("/");
        cy.contains("Modal & Overlays").click();
        cy.wait(1000);
        cy.contains("Toastr").click();
        cy.wait(1000);

        cy.get('[type="checkbox"]').eq(0).check({force: true});
        cy.wait(1000);
        cy.get('[type="checkbox"]').eq(1).check({force: true});
        cy.wait(1000);
    })

    it("date picker", () => {

        function selectDayFromCurrent(day) {
            let date = new Date();
            date.setDate(date.getDate() + day);
            let futureDate = date.getDate();
            let futureMonth = date.toLocaleDateString('en-US', { month: 'short' });
            let futureYear = date.getFullYear();
            let dateToAssert = `${futureMonth} ${futureDate}, ${futureYear}`;

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
                    cy.get('[data-name="chevron-right"]').click();
                    cy.wait(1000);
                    selectDayFromCurrent(day);
                } else {
                    cy.get('.day-cell').not('.bounding-month').contains(futureDate).click();
                }
            })

            return dateToAssert;
        }

        cy.visit("/");
        cy.contains("Forms").click();
        cy.wait(1000);
        cy.contains("Datepicker").click();
        cy.wait(1000);

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click();

            const dateToAssert = selectDayFromCurrent(60);

            cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert);
            cy.wrap(input).should('have.value', dateToAssert);
        })

        cy.wait(1000);

    });

    it("Lists and dropdowns",() => {
        cy.visit("/");

        cy.get('nav nb-select').click();
        cy.wait(1000);
        cy.get('.options-list').contains('Dark').click();
        cy.wait(1000);
        cy.get('nav nb-select').should('contain', 'Dark');

        cy.get('nav nb-select').then( dropDown => {
            cy.wrap(dropDown).click();
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim();

                cy.wrap(listItem).click();
                cy.wrap(dropDown).should('contain', itemText);
                if(index < 3) {
                    cy.wrap(dropDown).click();
                }
                cy.wait(1000);
            })
        })

        cy.wait(1000);
    })

});