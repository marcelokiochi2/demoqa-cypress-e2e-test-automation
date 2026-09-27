class ProfilePage {

    selectors = {
        usernameValue: '#userName-value',
        logoutButton: '.ms-auto > #submit',
        searchBox: '#searchBox',
        bookRow: 'tr',
        deleteButton: 'span[title="Delete"]',
        confirmDeleteButton: '#closeSmallModal-ok',
        bookList: 'tbody',
        deleteAllBooksButton: '.text-right > #submit',
        notLoginLabel: '#notLoggin-label'
    }

    visit(){
        cy.visit('/profile')
    }

    visitAndWaitForCollection(){
        cy.intercept('GET', '**/Account/v1/User/*').as('getAccountBooks')
        cy.visit('/profile')
        cy.wait('@getAccountBooks')
    }

    searchBookFromCollection(title) {
        cy.get(this.selectors.searchBox).type(title)
    }

    getBookFromCollection(title) {
        return cy.contains('a', title)
    }

    deleteBookFromCollection(title) {
        this.getBookFromCollection(title)
            .parents(this.selectors.bookRow)
            .find(this.selectors.deleteButton)
            .click()     

            cy.get(this.selectors.confirmDeleteButton).click()
    }

    deleteAllBooksFromCollection() {
        cy.get(this.selectors.deleteAllBooksButton).click()
        cy.get(this.selectors.confirmDeleteButton).click()
    }

    assertBooksInCollection(books) {
        books.forEach((book) => {
            this.searchBookFromCollection(book.title)
            this.getBookFromCollection(book.title)
                .should('exist')
            cy.get(this.selectors.searchBox).clear()
        })
    }

    assertBooksNotInCollection(books) {
        books.forEach((book) => {
            this.searchBookFromCollection(book.title)
            this.getBookFromCollection(book.title)
                .should('not.exist')
            cy.get(this.selectors.searchBox).clear()
        })
    }

    logout(){
        cy.get(this.selectors.logoutButton).click()
    }
}

export default new ProfilePage()