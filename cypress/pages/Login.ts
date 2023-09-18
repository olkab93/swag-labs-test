export class Login {
  enterUsername(username: string) {
    cy.findByPlaceholderText(/USERNAME/i).type(username);
  }

  enterPassword(password: string) {
    cy.findByPlaceholderText(/PASSWORD/i).type(password);
  }

  clickLoginButton() {
    cy.findByRole('button', { name: /LOGIN/i }).click();
  }

  login(username: string, password: string) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  loginFormClear() {
    cy.findByPlaceholderText(/USERNAME/i).clear();
    cy.findByPlaceholderText(/PASSWORD/i).clear();
  }

  // error messages
  errorMsgUserLockedOut() {
    return cy.findByRole('heading', {
      name: 'Epic sadface: Sorry, this user has been locked out.',
    });
  }

  errorMsgUsernameAndPAsswordNotMatching() {
    return cy.findByRole('heading', {
      name: 'Epic sadface: Username and password do not match any user in this service',
    });
  }

  errorMsgUsernameRequired() {
    return cy.findByRole('heading', {
      name: 'Epic sadface: Username is required',
    });
  }

  errorMsgPasswordRequired() {
    return cy.findByRole('heading', {
      name: 'Epic sadface: Password is required',
    });
  }
}
