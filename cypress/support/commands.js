import ProfilePage from '../support/pageObjects/profilePage'
import BookSearchPage from '../support/pageObjects/BookSearchPage'
import BookDetailsPage from '../support/pageObjects/BookDetailsPage'

Cypress.Commands.add('alertStub', () => {
    cy.window().then((win) => {
        cy.stub(win, 'alert').as('alert')
    })
})

Cypress.Commands.add('expectAlert', (message) => {
    cy.get('@alert').should('have.been.calledWith', message)
})

Cypress.Commands.add('addBookIfNotInCollection', (title) => {
    ProfilePage.visitAndWaitForCollection()
    ProfilePage.searchBookFromCollection(title)
    
    cy.get(ProfilePage.selectors.bookList).then(($list) => {
        const books = $list.find(ProfilePage.selectors.bookRow)

        if (books.length === 0) {
            BookSearchPage.searchAndOpenBookDetails(title)
                cy.alertStub()
                BookDetailsPage.addBook()
                cy.expectAlert('Book added to your collection.')
        }
    })
})

Cypress.Commands.add('getAuthCookies', () => {
    return cy.getCookie('token').then((tokenCookie) => {
        return cy.getCookie('userID').then((userIdCookie) => {
            return {
                token: tokenCookie.value,
                userId: userIdCookie.value
            }
        })
    })
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })