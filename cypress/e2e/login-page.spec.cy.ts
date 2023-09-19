/// <reference types="cypress" />

const errorMsgUserLockedOut =
  'Epic sadface: Sorry, this user has been locked out.';
const errorMsgUsernameAndPasswordNotMatching =
  'Epic sadface: Username and password do not match any user in this service';
const errorMsgUsernameRequired = 'Epic sadface: Username is required';
const errorMsgPasswordRequired = 'Epic sadface: Password is required';

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('user should be logged in when entering valid credentials', () => {
    // login with valid credentials
    cy.login(Cypress.env('standard_user'), Cypress.env('valid_password'));

    // check redirection after a successfull login
    cy.url().should('contain', 'inventory.html');
  });

  it('locked out user should not be able to log in when entering valid credentials', () => {
    // login with locked out user's credentials
    cy.login(Cypress.env('locked_out_user'), Cypress.env('valid_password'));

    // check and close error message
    cy.findByRole('heading', { name: errorMsgUserLockedOut })
      .should('be.visible')
      .within(() => {
        cy.findByRole('button').click();
      });
    cy.findByRole('heading', { name: errorMsgUserLockedOut }).should(
      'not.exist'
    );
  });

  it('user should be able to close error message and log in after re-entering valid credentials', () => {
    // try to log in with invalid password
    cy.login(Cypress.env('standard_user'), Cypress.env('invalid_password'));

    // check and close error message
    cy.findByRole('heading', { name: errorMsgUsernameAndPasswordNotMatching })
      .should('be.visible')
      .within(() => {
        cy.findByRole('button').click();
      });
    cy.findByRole('heading', {
      name: errorMsgUsernameAndPasswordNotMatching,
    }).should('not.exist');

    // clear login and password textboxes and login with valid credentials
    cy.loginFormClear();
    cy.login(Cypress.env('standard_user'), Cypress.env('valid_password'));
    cy.url().should('contain', 'inventory.html');
  });

  it('user should be informed that username and password are required to log in', () => {
    // enter only a password and click "Login" button
    cy.enterPassword(Cypress.env('valid_password'));
    cy.clickLoginButton();

    // check and close error message
    cy.findByRole('heading', { name: errorMsgUsernameRequired })
      .should('be.visible')
      .within(() => {
        cy.findByRole('button').click();
      });
    cy.findByRole('heading', { name: errorMsgUsernameRequired }).should(
      'not.exist'
    );

    // clear textboxes
    cy.loginFormClear();

    // enter only a username and lick "Login button"
    cy.enterUsername(Cypress.env('standard_user'));
    cy.clickLoginButton();

    // check and close error message
    cy.findByRole('heading', { name: errorMsgPasswordRequired })
      .should('be.visible')
      .within(() => {
        cy.findByRole('button').click();
      });
    cy.findByRole('heading', { name: errorMsgPasswordRequired }).should(
      'not.exist'
    );
  });
});
