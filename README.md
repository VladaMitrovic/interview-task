## interview-task

Automation task

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

## install Cypress framework:

- npm
  ```sh
  npm install --save-dev cypress
  ```

https://www.npmjs.com/package/cypress

install faker:

- npm
  ```sh
  npm i @faker-js/faker
  ```
  https://www.npmjs.com/package/@faker-js/faker

install mochawesome reporter

- npm
  ```sh
  npm i cypress-mochawesome-reporter
  ```
  https://www.npmjs.com/package/cypress-mochawesome-reporter

install localstorage commands

- npm
  ```sh
  npm i cypress-localstorage-commands
  ```
  https://www.npmjs.com/package/cypress-localstorage-commands

## Usage

the tests to see in browser with the following command:

```
npx cypress open  --env environmentName=staging --config baseUrl=https://magento.softwaretestingboard.com/ --config-file ./cypress.config.js
```

To run certain test and to receive report via script - example:

```
npx cypress run  --env environmentName=staging --config baseUrl=https://magento.softwaretestingboard.com/ --config-file ./cypress.config.js --spec cypress/e2e/interview-task/interview_task.cy.js --headless
```
