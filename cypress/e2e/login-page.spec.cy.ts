/// <reference types="cypress" />

import { Login } from '../pages/Login';

const loginPage = new Login();

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('user should be logged in when entering valid credentials', () => {
    // login with valid credentials
    loginPage.login(
      Cypress.env('standard_user'),
      Cypress.env('valid_password')
    );

    // check redirection after a successfull login
    cy.url().should('contain', 'inventory.html');
  });

  it('locked out user should not be able to log in when entering valid credentials', () => {
    // login with locked out user's credentials
    loginPage.login(
      Cypress.env('locked_out_user'),
      Cypress.env('valid_password')
    );

    // check and close error message
    loginPage
      .errorMsgUserLockedOut()
      .should('be.visible')
      .within(() => {
        cy.findByRole('button').click();
      });

    loginPage.errorMsgUserLockedOut().should('not.exist');
  });

  it('user should be able to close error message and log in after re-entering valid credentials', () => {
    // try to log in with invalid password
    loginPage.login(
      Cypress.env('standard_user'),
      Cypress.env('invalid_password')
    );

    // check and close error message
    loginPage
      .errorMsgUsernameAndPAsswordNotMatching()
      .should('be.visible')
      .within(() => {
        cy.findByRole('button').click();
      });
    loginPage.errorMsgUsernameAndPAsswordNotMatching().should('not.exist');

    // clear login and password textboxes and login with valid credentials
    loginPage.loginFormClear();
    loginPage.login(
      Cypress.env('standard_user'),
      Cypress.env('valid_password')
    );

    cy.url().should('contain', 'inventory.html');
  });

  it('user should be informed that username and password are required to log in', () => {
    // enter only a password and click "Login" button
    loginPage.enterPassword(Cypress.env('valid_password'));
    loginPage.clickLoginButton();

    // check and close error message
    loginPage
      .errorMsgUsernameRequired()
      .should('be.visible')
      .within(() => {
        cy.findByRole('button').click();
      });
    loginPage.errorMsgUsernameRequired().should('not.exist');

    // clear textboxes
    loginPage.loginFormClear();

    // enter only a username and lick "Login button"
    loginPage.enterUsername(Cypress.env('standard_user'));
    loginPage.clickLoginButton();

    // check and close error message
    loginPage
      .errorMsgPasswordRequired()
      .should('be.visible')
      .within(() => {
        cy.findByRole('button').click();
      });
    loginPage.errorMsgPasswordRequired().should('not.exist');
  });
});
