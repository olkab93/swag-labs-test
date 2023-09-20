/// <reference types="Cypress"/>

import productsFixture from '../fixtures/products.json';
import { Product } from '../support/types/product';

const PRODUCT_1 = productsFixture.products[0];
const PRODUCT_2 = productsFixture.products[1];

function checkCartItem(product: Product) {
  cy.findByText(product.name)
    .parents('.cart_item')
    .within(() => {
      cy.findByText(product.description).should('be.visible');
      cy.findByText(`$${product.price}`).should('be.visible');
      cy.findByRole('button', { name: /REMOVE/i }).should('be.visible');
      cy.get('.cart_quantity').should('have.text', '1');
    });
}

describe('Cart', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(Cypress.env('user_name'), Cypress.env('correct_password'));
  });

  it('cart page should be empty when no product was added and user should be able to continue shopping when clicking "Continue shopping" button', () => {
    // go to cart page
    cy.clickCartIcon();

    // check cart header
    cy.get('.header_secondary_container').within(() => {
      cy.findByText('Your Cart').should('be.visible');
    });

    // check items table - empty
    cy.get('.cart_list').within(() => {
      cy.findByText('QTY').should('be.visible');
      cy.findByText('Description').should('be.visible');
      cy.get('.cart_item').should('not.exist');
    });

    // check cart footer
    cy.findByRole('button', { name: /GO BACK CONTINUE SHOPPING/i })
      .as('backBtn')
      .should('be.visible')
      .should('have.text', 'Continue Shopping');

    cy.findByRole('button', { name: /CHECKOUT/i })
      .should('be.visible')
      .should('have.text', 'Checkout');

    // click back button and check if homepage is displayed
    cy.get('@backBtn').click();
    cy.url().should('contain', 'inventory.html');
  });

  it('cart page should contain added products and user should be redirected to checkout after clickig "Checkout" button', () => {
    // add products to cart and go to the cart page
    cy.addToCart(PRODUCT_1.name);
    cy.addToCart(PRODUCT_2.name);
    cy.clickCartIcon();

    // check display of products in the cart
    checkCartItem(PRODUCT_1);
    checkCartItem(PRODUCT_2);

    cy.findByRole('button', { name: /CHECKOUT/i }).click();
    cy.url().should('contain', 'checkout-step-one.html');
  });

  it('user should be able to remove a product from the cart', () => {
    // add products to cart and go to the cart page
    cy.addToCart(PRODUCT_1.name);
    cy.addToCart(PRODUCT_2.name);
    cy.get('.shopping_cart_badge').should('contain.text', '2').click();

    // remove product from the cart
    cy.findByText(PRODUCT_1.name)
      .parents('.cart_item')
      .within(() => {
        cy.findByRole('button', { name: /REMOVE/i }).click();
      });

    // confirm that product was removed from the cart
    cy.findByText(PRODUCT_1.name).should('not.exist');
    cy.get('.shopping_cart_badge').should('contain.text', '1');
  });
});
