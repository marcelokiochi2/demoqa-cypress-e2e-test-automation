# Defects

## DEF-001 — Remove All Books: Removal modal remains open after successful operation

### Environment

* **OS:** Windows 11
* **Browser:** Google Chrome
* **Application:** DemoQA
* **Area:** Book Store > Profile > Remove All Books

### Preconditions

* User is logged in.
* User has multiple books in the collection.

### Description

When removing all books from the user's collection, the books are successfully removed, but the frontend does not provide visual feedback that the operation was completed.

### Steps to Reproduce

1. Log in to the application.
2. Add multiple books to the collection.
3. Navigate to the Profile page.
4. Open the option to remove all books from the collection.
5. Confirm the removal operation.
6. Observe the collection and the removal modal.

### Expected Result

The books should be successfully removed from the collection, and the frontend should reflect the completion of the operation.

### Actual Result

The books are successfully removed from the collection, but the removal modal remains open and no success feedback is displayed.

### Severity

**Minor:** The books are successfully removed, but the lack of feedback may confuse the user.

### Priority

**Medium:** The defect does not block the removal, but affects the user experience.

### Evidence

See the execution evidence in [`DEF-001`](artifacts/defectsEvidence/DEF-001.mp4).
