const { onDatePickerPage } = require("../support/page_objects/datePickerPage");
const { onFormLayoutsPage } = require("../support/page_objects/formLayoutPage");
const { navigateTo } = require("../support/page_objects/navigationPage");
const { onSmartTablePage } = require("../support/page_objects/smartTablePage");

describe("Tests with page objects", () => {

    beforeEach(() => {
        cy.visit("/");
    })

    it("verify navigations across the pages", () => {
        navigateTo.formLayoutsPage();
        navigateTo.datePickerPage();
        navigateTo.smartTablePage();
        navigateTo.tooltipPage();
        navigateTo.toasterPage();
    })

    it("should submit Inline and Basic form and select tomorrow date in the calendar", () => {
        navigateTo.formLayoutsPage();
        onFormLayoutsPage.submitInlineFormWithNameAndEmail("John", "john@expample.com");
        cy.wait(1000);
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword("test", "test");
        cy.wait(1000);
        navigateTo.datePickerPage();
        onDatePickerPage.selectCommonDatePickerFromToday(1);
        cy.wait(1000);
        onDatePickerPage.selectDatePickerWithRangeFromToday(7,14);
        cy.wait(1000);
        navigateTo.smartTablePage();
        onSmartTablePage.addNewRecordWithFirstAndLastName("John", "Doe");
        cy.wait(1000);
        onSmartTablePage.updateAgeByFirstName("John", "25");
        cy.wait(1000);
        onSmartTablePage.deleteRowByIndex(1);

    })
})