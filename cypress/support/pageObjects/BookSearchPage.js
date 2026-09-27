class BookSearch {

    selectors = {
        bookList: 'tbody',
        searchBox: '#searchBox'
    }

    visit(){
        cy.visit('/books')
    }

    visitAndWaitForBooks(){
        cy.intercept('GET', '**/BookStore/v1/Books').as('getBooks')
        cy.visit('/books')
        cy.wait('@getBooks')
    }

    searchBook(title) {
        cy.get(this.selectors.searchBox).type(title)
    }

    getBookResult(title) {
        return cy.contains('a', title)
    }

    openBookDetails(title) {        
        this.getBookResult(title).click()
    }

    searchAndOpenBookDetails(title) {
        this.visitAndWaitForBooks()
        this.searchBook(title)
        this.openBookDetails(title)
    }
}

export default new BookSearch()