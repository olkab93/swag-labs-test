/// <reference types="cypress" />

const errorMsgUserLockedOut =
  'Epic sadface: Sorry, this user has been locked out.';
const errorMsgUsernameAndPasswordNotMatching =
  'Epic sadface: Username and password do not match any user in this service';
const errorMsgUsernameRequired = 'Epic sadface: Username is required';
const errorMsgPasswordRequired = 'Epic sadface: Password is required';
const errorMsgNotLoggedIn =
  "Epic sadface: You can only access '/cart.html' when you are logged in.";

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('user should be logged in when entering valid credentials', () => {
    // login with valid credentials
    cy.login(Cypress.env('user_name'), Cypress.env('correct_password'));

    // check redirection after a successfull login
    cy.url().should('contain', 'inventory.html');
  });

  it('locked out user should not be able to log in when entering valid credentials', () => {
    // login with locked out user's credentials
    cy.login(Cypress.env('locked_out_user'), Cypress.env('correct_password'));

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
    cy.login(Cypress.env('user_name'), Cypress.env('incorrect_password'));

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
    cy.login(Cypress.env('user_name'), Cypress.env('correct_password'));
    cy.url().should('contain', 'inventory.html');
  });

  it('user should be informed that username and password are required to log in', () => {
    // enter only a password and click "Login" button
    cy.enterPassword(Cypress.env('correct_password'));
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
    cy.enterUsername(Cypress.env('user_name'));
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

  it('user should be able to log out', () => {
    // login
    cy.login(Cypress.env('user_name'), Cypress.env('correct_password'));

    // open side menu and click 'Logout'
    cy.findByRole('button', { name: /OPEN MENU/i }).click();
    cy.findByRole('link', { name: /LOGOUT/i }).click();

    // check if user was redirected to the login page
    cy.url().should('eq', 'https://www.saucedemo.com/');
    cy.findByRole('button', { name: /LOGIN/i }).should('be.visible');
  });

  it('user should be redirected to login page when session expires', () => {
    // login
    cy.login(Cypress.env('user_name'), Cypress.env('correct_password'));

    // clear session-username cookie and interact with the page
    cy.clearCookie('session-username');
    cy.clickCartIcon();

    // check redirection to the login page
    cy.url().should('eq', 'https://www.saucedemo.com/');

    // check error message and close it
    cy.findByRole('heading', { name: errorMsgNotLoggedIn })
      .as('errorMsg')
      .should('be.visible')
      .within(() => {
        cy.findByRole('button').click();
      });
    cy.get('@errorMsg').should('not.exist');

    // log in again and check redirection
    cy.login(Cypress.env('user_name'), Cypress.env('correct_password'));
    cy.url().should('contain', 'inventory.html');
  });
});
