# swag-labs-test

## Project configuration

1. Clone the repository and run `npm install`
2. Ask repo owner for access to `cypress.env.json` file (if you didn't receive it via email) and paste it into the root directory
3. To open Cypress type in console: `npm run cy:open` - this command will run tests with a default user name (as specified in `cypress.env.json`)
4. To run tests as `problem_user` run `npm run cy:open:problem`
5. To run tests as `performance_glitch_user` run `npm run cy:open:prefglitch`

## Notes

- In project requirements it was specified to use Cypress 12.x, but I decided to use the latest version - 13.2.0.

  v13 was released a few weeks ago and I assume that the requirements doc is outdated; if not, it is always recommended to use the latest versions, unless significant issues occur.

- I noted that sometimes Cypress have troubles with opening the page correctly (e.g. login page is still displayed, while test is on the step of validating homepage). If this ocurrs and blocks you with checking if tests are running - go to devtools --> application --> storage and click `Clear site data` button. Then refresh Cypress page
- Headless mode - command to run tests in headless mode is configured (`npm run cy:run`), but most of the tests are failing (even though they pass in UI mode). Running headless tests with chrome reduced problem, but it's still there. I wasn't able to find root cause or workaround for this issue.

- You can check tests checklist in `test-checklist.md`. Probably it is possible to figure out more cases, but these listed I find most important or obvious to test. Happy to say - all cases except the footer are covered :) I decided to skip footer tests as those tests don't have high priority (no critical for the system functionality).
