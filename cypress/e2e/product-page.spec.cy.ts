/// <reference types="cypress" />

import productsFixture from '../fixtures/products.json';

const PRODUCT = productsFixture.products[0];

function goToProdPageByImg(productName: string) {
  cy.findByRole('img', { name: productName }).parent().click();
}

function checkProductContainer(
  productName: string,
  productDescription: string,
  productPrice: number
) {
  cy.findByText(productName)
    .should('be.visible')
    .parent()
    .within(() => {
      cy.findByText(productDescription).should('be.visible');
      cy.findByText(`$${productPrice}`).should('be.visible');
    });
  cy.findByRole('img', { name: productName }).should('be.visible');
  cy.findByRole('button', { name: /ADD TO CART/i }).should('be.visible');
}

describe('Product page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(Cypress.env('user_name'), Cypress.env('correct_password'));
  });

  it('user should be able to enter product page after clicking product image', () => {
    // click product image to visit product page
    goToProdPageByImg(PRODUCT.name);

    // check product page
    checkProductContainer(PRODUCT.name, PRODUCT.description, PRODUCT.price);
  });

  it('user should be able to enter product page after clicking product name', () => {
    // click product name to visit product page
    cy.findByText(PRODUCT.name).parent().click();

    // check product page
    checkProductContainer(PRODUCT.name, PRODUCT.description, PRODUCT.price);
  });

  it('user should be able to go back to products list from the product page', () => {
    // go to the product page
    goToProdPageByImg(PRODUCT.name);

    // click "Back to products" button
    cy.findByRole('button', { name: /GO BACK BACK TO PRODUCTS/i }).click();

    // check if user was redirected to the products page
    cy.url().should('contain', 'inventory.html');
  });

  it('user should be able to add a product to cart from the product page', () => {
    // go to the product page
    goToProdPageByImg(PRODUCT.name);

    // click "Add to cart" button and check if it switches to "Remove" button
    cy.findByRole('button', { name: /ADD TO CART/i })
      .click()
      .should('not.exist');
    cy.findByRole('button', { name: /REMOVE/i }).should('be.visible');

    // check if cart contains added product
    cy.get('.shopping_cart_badge').should('contain.text', '1').click();
    cy.findByText(PRODUCT.name).should('be.visible');
  });

  it('user should be able to remove a product from the cart from the product page', () => {
    // go to the product page
    goToProdPageByImg(PRODUCT.name);

    // click "Add to cart" button and check if cart badge was updated
    cy.findByRole('button', { name: /ADD TO CART/i }).click();
    cy.get('.shopping_cart_badge').should('contain.text', '1');

    // click "Remove" button and check if cart badge was removed
    cy.findByRole('button', { name: /REMOVE/i }).click();
    cy.get('.shopping_cart_badge').should('not.exist');

    // go to the cart and check if the product was removed
    cy.get('.shopping_cart_link').click();
    cy.findByText(PRODUCT.name).should('not.exist');
  });
});
