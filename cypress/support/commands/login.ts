/// <reference types="cypress" />

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('enterUsername', (username) => {
  cy.findByPlaceholderText(/USERNAME/i).type(username);
});

Cypress.Commands.add('enterPassword', (password) => {
  cy.findByPlaceholderText(/PASSWORD/i).type(password);
});

Cypress.Commands.add('clickLoginButton', () => {
  cy.findByRole('button', { name: /LOGIN/i }).click();
});

Cypress.Commands.add('loginFormClear', () => {
  cy.findByPlaceholderText(/USERNAME/i).clear();
  cy.findByPlaceholderText(/PASSWORD/i).clear();
});

Cypress.Commands.add('login', (username, password) => {
  cy.enterUsername(username);
  cy.enterPassword(password);
  cy.clickLoginButton();
});
