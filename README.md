# Cypress E2E Test Automation

End-to-end test automation project built with **Cypress** and **JavaScript**.

## Prerequisites

* [Node.js](https://nodejs.org/) 22.23.3
* npm 10.9.9
* Git

## Installation

Clone the repository:

```bash
git clone <REPOSITORY_URL>
```

Navigate to the project directory:

```bash
cd <PROJECT_DIRECTORY>
```

Install the project dependencies:

```bash
npm install
```

Verify the Cypress installation:

```bash
npx cypress verify
```

## Running the Tests

### Recommended

For the best experience when reviewing the test suite, run **all specs in Chrome with the browser visible**:

```bash
npx cypress run --browser chrome --headed
```

This runs the complete test suite in Chrome while displaying the browser during execution.

### Headed mode

Open the Cypress Test Runner:

```bash
npx cypress open
```

From the Cypress interface, select the desired spec to run it.


### Headless mode

Run the complete test suite without opening the browser:

```bash
npx cypress run
```

Run the complete suite using Chrome:

```bash
npx cypress run --browser chrome
```

Run a specific spec using Chrome:

```bash
npx cypress run --browser chrome --spec "cypress/e2e/book-store/bookstore.cy.js"
```


## Test Results

### Headed execution

When running tests through `cypress open`, the Cypress Test Runner displays the result of each test directly in the interface.

### Headless execution

When using `cypress run`, the test results are displayed in the terminal.


Cypress screenshots generated for failed tests are stored in:

```text
cypress/screenshots/
```


Execution videos are stored in:

```text
cypress/videos/
```

## Project Structure

```text
├── cypress/
│   ├── e2e/                  # Test specifications organized by functionality
│   ├── fixtures/             # Static test data
│   └── support/
│       ├── apis/             # API request methods used by the tests
│       ├── pageObjects/      # Page Objects and UI interactions
│       └── commands.js       # Custom Cypress commands
│
├── artifacts/                # Selected execution evidence and test artifacts
│
├── DEFECTS.md                # Documented defects identified during testing
├── RECOMMENDATIONS.md        # Recommendations for CI/CD, scalability, and test strategy
└── SUMMARY.md                # Test execution summary, decisions, trade-offs, and limitations
```