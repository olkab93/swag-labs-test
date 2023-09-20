/// <reference types="cypress" />

import productsFixture from '../fixtures/products.json';
import { Product } from '../support/types/product';

const PRODUCT = productsFixture.products[0];

function checkProductContainer(product: Product) {
  cy.findByText(product.name)
    .should('be.visible')
    .parents('.inventory_item')
    .within(() => {
      cy.findByText(product.description).should('be.visible');
      cy.findByText(`$${product.price}`).should('be.visible');
      cy.findByRole('img', { name: product.name })
        .should('have.attr', 'src', product.img)
        .should('be.visible');
      cy.findByRole('button', { name: /ADD TO CART/i }).should('be.visible');
    });
}

function checkSortedItemsOrder(listToCompareWith: string[]) {
  cy.get('.inventory_list').then(() => {
    cy.findAllByRole('link')
      .children('.inventory_item_name')
      .each((item, index) => {
        cy.wrap(item.text()).should('eq', listToCompareWith[index]);
      });
  });
}

describe('Products page (homepage)', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login(Cypress.env('user_name'), Cypress.env('correct_password'));
  });

  it('page should have a proper header and each item should have: an image, name, description, price and "Add to cart" button', () => {
    // get header container and check page header
    cy.get('.header_secondary_container').within(() => {
      cy.findByText('Products').should('be.visible');
    });

    // for each product displayed on the page check if it has: name, description, price, image, 'Add to cart' button displaye
    productsFixture.products.forEach((product) => {
      checkProductContainer(product);
    });
  });

  it('user should be able to add a product to cart from the products list', () => {
    // add product to the cart
    cy.addToCart(PRODUCT.name);

    // go to the cart and check if added product is displayed
    cy.get('.shopping_cart_badge').should('contain.text', '1').click();
    cy.findByText(PRODUCT.name).should('be.visible');
  });

  it('user should be able to remove a product from the cart from the products list', () => {
    // add product to the cart
    cy.addToCart(PRODUCT.name);

    // remove product from the cart, go to the cart view and check if the product is not displayed there
    cy.removeFromCart(PRODUCT.name);
    cy.clickCartIcon();
    cy.findByText(PRODUCT.name).should('not.exist');
  });

  it('user should be able to sort items by name (A-Z)', () => {
    // sort copy of fixture products list by name A-Z and create an array of sorted names
    const fixtureProductsSorted = [...productsFixture.products]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((product) => product.name);

    // check if 'Name (A to Z)' is a default option when entering the page
    cy.get('.active_option').should('have.text', 'Name (A to Z)');

    // change sorting and go back to 'A to Z' option
    cy.findByRole('combobox').select('Name (Z to A)');
    cy.findByRole('combobox').select('Name (A to Z)');

    // compare sorted items on the page with sorted fixture list
    checkSortedItemsOrder(fixtureProductsSorted);
  });

  it('user should be able to sort items by name (Z-A)', () => {
    // sort copy of fixture products list by name Z-A and create an array of sorted names
    const fixtureProductsSorted = [...productsFixture.products]
      .sort((a, b) => b.name.localeCompare(a.name))
      .map((product) => product.name);

    // select sorting option on the page
    cy.findByRole('combobox').select('Name (Z to A)');

    // compare sorted items on the page with sorted fixture list
    checkSortedItemsOrder(fixtureProductsSorted);
  });

  it('user should be able to sort items by price (low to high)', () => {
    // sort copy of fixture products list by price (low to high) and create an array of sorted names
    const fixtureProductsSorted = [...productsFixture.products]
      .sort((a, b) => a.price - b.price)
      .map((product) => product.name);

    // select sorting option on the page
    cy.findByRole('combobox').select('Price (low to high)');

    // compare sorted items on the page with sorted fixture list
    checkSortedItemsOrder(fixtureProductsSorted);
  });

  it('user should be able to sort items by price (high to low)', () => {
    // sort copy of fixture products list by price (high to low) and create an array of sorted names
    const fixtureProductsSorted = [...productsFixture.products]
      .sort((a, b) => b.price - a.price)
      .map((product) => product.name);

    // select sorting option on the page
    cy.findByRole('combobox').select('Price (high to low)');

    // compare sorted items on the page with sorted fixture list
    checkSortedItemsOrder(fixtureProductsSorted);
  });
});
