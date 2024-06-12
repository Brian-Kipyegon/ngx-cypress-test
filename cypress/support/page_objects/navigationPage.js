
function selectGroupMenuItem(groupName) {
    cy.contains('a', groupName).then( menu => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then( attr => {
            if(attr.includes('left')){
                cy.wrap(menu).click();
            }
        })
    })
}

export class NavigationPage {

    formLayoutsPage() {
        selectGroupMenuItem("Form");
        cy.wait(1000);
        cy.contains('Form Layouts').click();
    }

    datePickerPage() {
        selectGroupMenuItem("Form");
        cy.wait(1000);
        cy.contains('Datepicker').click();
    }

    toasterPage() {
        selectGroupMenuItem("Modal & Overlays");
        cy.wait(1000);
        cy.contains('Toastr').click();
    }

    smartTablePage() {
        selectGroupMenuItem("Tables & Data");
        cy.wait(1000);
        cy.contains('Smart Table').click();
    }

    tooltipPage() {
        selectGroupMenuItem("Modal & Overlays");
        cy.wait(1000);
        cy.contains('Tooltip').click();
    }

}

export const navigateTo = new NavigationPage();