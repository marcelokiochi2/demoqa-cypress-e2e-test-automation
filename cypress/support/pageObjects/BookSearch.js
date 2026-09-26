class BookSearch {

    selectors = {
        bookList: 'tbody',
        searchBox: '#searchBox'
    }

    visit(){
        cy.visit('/books')
    }

    getBookResult(title) {
        return cy.contains('span', title)
    }

}

export default new BookSearch()