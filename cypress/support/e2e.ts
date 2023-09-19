import './commands/login';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to enter username
       * @example cy.enterUsername(username)
       */
      enterUsername(username: string): void;

      /**
       * Custom command to enter password
       * @example cy.enterPassword(password)
       */
      enterPassword(password: string): void;

      /**
       * Custom command to click login button
       * @example cy.clickLoginButton()
       */
      clickLoginButton(): void;

      /**
       * Custom command to login.
       * @example cy.login(username, password)
       */
      login(username: string, password: string): void;

      /**
       * Custom command to clear login form.
       * @example cy.loginFormClear()
       */
      loginFormClear(): void;
    }
  }
}
