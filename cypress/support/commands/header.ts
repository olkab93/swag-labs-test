/// <reference types="cypress" />

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('clickCartIcon', () => {
  cy.get('.shopping_cart_link').click();
});
