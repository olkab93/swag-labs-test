/// <reference types="cypress"/>

import productsFixture from '../fixtures/products.json';

const PRODUCT = productsFixture.products[0];

function openSidePanel() {
  cy.findByRole('button', { name: /OPEN MENU/i }).click();
}

describe('Navigation - side panel', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(Cypress.env('user_name'), Cypress.env('correct_password'));
  });

  it('user should be able to open and close side panel', () => {
    // open side panel and check if it is displayed
    openSidePanel();
    cy.findByRole('link', { name: /ALL ITEMS/i }).should('be.visible');

    // close side panel and check if its items are no longer displayed
    cy.findByRole('button', { name: /CLOSE MENU/i }).click();
    cy.findByRole('link', { name: /ALL ITEMS/i }).should('not.exist');
  });

  it('user should be able to go to the homepage when clicking "All items"', () => {
    // go to another page
    cy.clickCartIcon();

    // open side panel
    openSidePanel();

    // click "All items" on the side panel and check redirection
    cy.findByRole('link', { name: /ALL ITEMS/i }).click();
    cy.url().should('contain', 'inventory.html');
  });

  it('user should be redirected to "https://saucelabs.com/" when clicking "About"', () => {
    // open side panel
    openSidePanel();

    // click 'About'
    cy.findByRole('link', { name: /ABOUT/i }).click();

    // check redirection
    cy.url().should('eq', 'https://saucelabs.com/');
  });

  it('user should be able to reset app state by clicking "Reset app state"', () => {
    cy.addToCart(PRODUCT.name);
    cy.get('.shopping_cart_badge').should('contain.text', '1');

    openSidePanel();
    cy.findByRole('link', { name: /RESET APP STATE/i }).click();
    cy.get('.shopping_cart_badge').should('not.exist');
  });
});
