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

            cy.alertStub()
            cy.get(this.selectors.confirmDeleteButton).click()
            cy.expectAlert('Book deleted.')
    }

    getAuthData(){
        var userId
        var token

        cy.intercept('GET', '**/Account/v1/User/*').as('getCollection')

        this.visit()

        cy.wait('@getCollection').then(({ request, response }) => {
            userId = response.body.userId
            token = request.headers.authorization.replace('Bearer ', '')    
        })
        return {userId, token}
    }

    deleteBookIfExists(title) {
        this.visitAndWaitForCollection()

        this.searchBookFromCollection(title)
        cy.get(this.selectors.bookList).then(($list) => {
            const books = $list.find(this.selectors.bookRow)

            if (books.length > 0) {
                this.deleteBookFromCollection(title)
            }
        })
    }

    deleteAllBooksFromCollection() {
        cy.get(this.selectors.deleteAllBooksButton).click()
        //cy.alertStub()
        cy.get(this.selectors.confirmDeleteButton).click()
        //cy.expectAlert('All Books deleted.')
    }

    logout(){
        cy.get(this.selectors.logoutButton).click()
    }

}

export default new ProfilePage()