import './commands/login';
import './commands/products';
import './commands/header';

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

      /**
       * Custom command to add a product to cart.
       * @example cy.addToCart()
       */
      addToCart(productName: string): void;

      /**
       * Custom command to remove a product from the cart.
       * @example cy.removeFromCart()
       */
      removeFromCart(productName: string): void;

      /**
       * Custom command to go to cart.
       * @example cy.clickCartIcon()
       */
      clickCartIcon(): void;
    }
  }
}
