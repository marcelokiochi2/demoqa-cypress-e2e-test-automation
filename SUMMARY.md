# Test Execution Summary

## Execution Overview

The Cypress test suite was executed against the DemoQA application using Chrome.

### Results

| Metric      | Result |
| ----------- | -----: |
| Total tests |     21 |
| Passed      |     18 |
| Failed      |      0 |
| Pending     |      3 |

## Approach and Coverage

The automation focuses on the main user-facing flows:

* **Login:** valid and invalid authentication scenarios.
* **Registration:** registration and validation scenarios.
* **Book Search:** search by title and validation of matching results.
* **Book Collection:** adding, removing, and common edge cases.

## Key Design Decisions

* **Page Object Model:** selectors and page interactions are centralized in page objects to improve maintainability and reduce duplication.
* **Fixtures:** reusable static test data is separated from test logic.
* **API-based test setup:** collection data can be prepared directly through the API when UI interaction is not part of the scenario being validated.
* **Test synchronization:** `cy.intercept()` and state-based assertions are used instead of arbitrary fixed waits.
* **Test isolation:** each scenario prepares its required state independently to reduce dependencies between tests.

These decisions require additional setup and implementation effort upfront, but improve test stability, maintainability, and execution performance as the test suite grows.

## Known Limitations

* **Registration flow:** Three registration tests are marked as pending because DemoQA's reCAPTCHA prevents automated execution of the registration flow.
* **Remove all books flow:** The books are successfully removed from the collection, but the frontend does not provide visual feedback that the operation was completed. This behavior was documented as a known defect in `DEFECTS.md`. The test validates that the books are removed, but does not assert the success message or modal state, since no expected behavior was provided for these elements.

## Flakiness and Stability

Some inconsistencies were observed during test development, mainly related to frontend-backend synchronization and to elements that were not immediately available after navigation or user actions.

These issues were addressed by improving test synchronization rather than adding arbitrary fixed waits. The automation uses:

* API interception with `cy.intercept()` to synchronize tests with backend requests when necessary.
* Assertions that wait for expected elements and application states before proceeding.
* Page Object Model to centralize selectors and page interactions.
* Stable selectors whenever available.
* API-based setup for test data, reducing unnecessary UI dependencies.
* Independent test setup to keep tests isolated and reproducible.

No flakiness was observed during the final execution of the suite.
