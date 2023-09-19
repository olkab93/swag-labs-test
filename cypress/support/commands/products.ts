/// <reference types="cypress" />

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('addToCart', (productName) => {
  cy.findByText(productName)
    .parents('.inventory_item_description')
    .within(() => {
      cy.findByRole('button', { name: /ADD TO CART/i }).click();
    });
});

Cypress.Commands.add('removeFromCart', (productName) => {
  cy.findByText(productName)
    .parents('.inventory_item_description')
    .within(() => {
      cy.findByRole('button', { name: /REMOVE/i }).click();
    });
});
