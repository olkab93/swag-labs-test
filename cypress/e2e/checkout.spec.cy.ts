/// <reference types="cypress"/>

import productsFixture from '../fixtures/products.json';
import userDataFixture from '../fixtures/userData.json';
import { Product } from '../support/types/product';
import { User } from '../support/types/user';

const PRODUCT_1 = productsFixture.products[0];
const PRODUCT_2 = productsFixture.products[1];

function goToCheckout() {
  cy.clickCartIcon();
  cy.findByRole('button', { name: /CHECKOUT/i }).click();
}

function fillInForm(user: User) {
  cy.findByPlaceholderText(/FIRST NAME/i).type(user.first_name);
  cy.findByPlaceholderText(/LAST NAME/i).type(user.last_name);
  cy.findByPlaceholderText(/ZIP\/POSTAL CODE/i).type(user.zip_code);
}
function checkCheckoutItem(product: Product) {
  cy.findByText(product.name)
    .should('be.visible')
    .parents('.cart_item')
    .within(() => {
      cy.findByText(product.description).should('be.visible');
      cy.findByText(`$${product.price}`).should('be.visible');
      cy.get('.cart_quantity').should('have.text', '1');
    });
}

describe('Checkout', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(Cypress.env('user_name'), Cypress.env('correct_password'));
  });

  it('user should be able to enter checkout page from the cart, page should have a header and "Cancel" button', () => {
    // go to the checkout page
    goToCheckout();

    // check if checkout page is displayed and has required elements
    cy.url().should('contain', 'checkout-step-one.html');
    cy.get('.header_secondary_container').within(() => {
      cy.findByText('Checkout: Your Information').should('be.visible');
    });

    // form
    cy.findAllByPlaceholderText(/FIRST NAME/i).should('be.visible');
    cy.findAllByPlaceholderText(/LAST NAME/i).should('be.visible');
    cy.findAllByPlaceholderText(/ZIP\/POSTAL CODE/i).should('be.visible');

    // buttons
    cy.findByRole('button', { name: /GO BACK CANCEL/i })
      .as('cancelBtn')
      .should('have.text', 'Cancel')
      .should('be.visible');
    cy.findByRole('button', { name: /CONTINUE/i }).should('be.visible');

    // click cancelBtn and check if user was redirected to the cart
    cy.get('@cancelBtn').click();
    cy.url().should('contain', '/cart.html');
  });

  it('user should be able to fill in info form and go to the next step, then cancel a purchase', () => {
    // go to the checkout page
    goToCheckout();

    // fill in shipment details & click "Continue" button
    fillInForm(userDataFixture);
    cy.findByRole('button', { name: /CONTINUE/i }).click();

    // check if 'Checkout: Overview' page is displayed and contains required elements
    cy.url().should('contain', 'checkout-step-two.html');
    cy.get('.header_secondary_container').within(() => {
      cy.findByText('Checkout: Overview').should('be.visible');
    });

    // buttons
    cy.findByRole('button', { name: /GO BACK CANCEL/i })
      .as('cancelBtn')
      .should('have.text', 'Cancel')
      .should('be.visible');
    cy.findByRole('button', { name: /FINISH/i }).should('be.visible');

    // click cancelBtn and check if user was redirected to the homepage
    cy.get('@cancelBtn').click();
    cy.url().should('contain', '/inventory.html');
  });

  it('user should be informed that filling in data form is mandatory', () => {
    // go to the checkout page
    goToCheckout();

    // click "Continue" button on empty form and check if error message is displayed
    cy.findByRole('button', { name: /CONTINUE/i })
      .as('continueBtn')
      .click();
    cy.findByText('Error: First Name is required').should('be.visible');

    // fill in "First Name" and check if error message is updated
    cy.findByPlaceholderText(/FIRST NAME/i).type(userDataFixture.first_name);
    cy.get('@continueBtn').click();
    cy.findByText('Error: Last Name is required').should('be.visible');

    // fill in "Last Name", check if error message is updated and close error msg
    cy.findByPlaceholderText(/LAST NAME/i).type(userDataFixture.last_name);
    cy.get('@continueBtn').click();
    cy.findByText('Error: Postal Code is required')
      .should('be.visible')
      .within(() => {
        cy.findByRole('button').click();
      })
      .should('not.exist');

    // fill in postal code and check if user was redirected to the next step
    cy.findByPlaceholderText(/ZIP\/POSTAL CODE/i).type(
      userDataFixture.zip_code
    );
    cy.get('@continueBtn').click();
    cy.url().should('contain', '/checkout-step-two.html');
  });

  it('user should be able to complete the order and go back to home screen', () => {
    // add two different products to cart
    cy.addToCart(PRODUCT_1.name);
    cy.addToCart(PRODUCT_2.name);

    // go to checkout
    goToCheckout();

    // fill in shipment details & click "Continue" button
    fillInForm(userDataFixture);
    cy.findByRole('button', { name: /CONTINUE/i }).click();

    // check checkout overview and total price
    checkCheckoutItem(PRODUCT_1);
    checkCheckoutItem(PRODUCT_2);

    // calculate prices
    const ITEM_TOTAL = PRODUCT_1.price + PRODUCT_2.price;
    const TAX = ITEM_TOTAL * 0.08;
    const TOTAL = ITEM_TOTAL + TAX;

    // check if displayed prices match calculations
    cy.findByText(`Item total: $${ITEM_TOTAL}`).should('be.visible');
    cy.findByText(`Tax: $${TAX.toFixed(2)}`).should('be.visible');
    cy.findByText(`Total: $${TOTAL.toFixed(2)}`).should('be.visible');

    // click "Finish" button and check "Complete" screen
    cy.findByRole('button', { name: /FINISH/i }).click();
    cy.url().should('contain', 'checkout-complete.html');
    cy.findByText('Checkout: Complete!').should('be.visible');
    cy.findByText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    ).should('be.visible');
    cy.findByText('Thank you for your order!').should('be.visible');

    // click "Back Home" and check if user was redirected to the home page
    cy.findByRole('button', { name: /BACK HOME/i }).click();
    cy.url().should('contain', 'inventory.html');
  });
});
