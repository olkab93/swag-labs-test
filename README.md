# swag-labs-test

## Project configuration

1. Clone the repository and run `npm install`
2. Ask repo owner for access to `cypress.env.json` file (if you didn't receive it via email) and paste it into the root directory
3. To open Cypress type in console: `npm run cy:open` - this command will run tests with a default user name (as specified in `cypress.env.json`)
4. To run tests as `problem_user` run `npm run cy:open:problem`
5. To run tests as `performance_glitch_user` run `npm run cy:open:prefglitch`
6. To run tests in headless mode type `npm run cy:run` - chrome is set up as a default headless browser

## Notes

- In project requirements it was specified to use Cypress 12.x, but I decided to use the latest version - 13.2.0.

  v13 was released a few weeks ago and I assume that the requirements doc is outdated; if not, it is always recommended to use the latest versions, unless significant issues occur.

- `cypress.env.json` is shared separately - in 'real' project .env files should be kept in a protected vault. Keeping this file separately and not commiting is an example of that approach.

- I noted that sometimes Cypress have troubles with opening the page correctly (e.g. login page is still displayed, while test is on the step of validating homepage). If this ocurrs and blocks you from checking if tests are running - go to devtools --> application --> storage and click `Clear site data` button. Then refresh Cypress page

- You can check tests checklist in `test-checklist.md`. Probably it is possible to figure out more cases, but these listed I find most important or obvious to test. Happy to say - all cases except the footer are covered :) I decided to skip footer tests as those tests don't have high priority (no critical for the system functionality).
