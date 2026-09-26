import BookSearch from '../../support/pageObjects/BookSearch'

describe('Book Search', () => {

    beforeEach(() => {
        BookSearch.visit()
    })

    context('when accessing the book store with no filters', () => {
        it('should display the list of books', () => {
            cy.get(BookSearch.selectors.bookList).children().should('have.length', 8)
        })
    })

    context('when searching for existing books', () => {
        it('should display the matching book when searching by exact title', () => {
            cy.get(BookSearch.selectors.searchBox).type('Speaking JavaScript')
            cy.get(BookSearch.selectors.bookList).children().should('have.length', 1)
            BookSearch.getBookResult('Speaking JavaScript').should('be.visible')
        })

        it('should display the matching books when searching by partial title', () => {
            cy.get(BookSearch.selectors.searchBox).type('design')
            cy.get(BookSearch.selectors.bookList).children().should('have.length', 2)
            BookSearch.getBookResult('Learning JavaScript Design Patterns').should('be.visible')
            BookSearch.getBookResult('Designing Evolvable Web APIs with ASP.NET').should('be.visible')
        })
    })

    context('when searching for a non-existing book', () => {
        it('should display no results', () => {
            cy.get(BookSearch.selectors.searchBox).type('Non Existing Book')
            cy.get(BookSearch.selectors.bookList).children().should('have.length', 0)
            BookSearch.getBookResult('Non Existing Book').should('not.exist')
        })
    })

    context('when clearing the search', () => {
        it('should display the book list again', () => {
            cy.get(BookSearch.selectors.searchBox).type('Speaking JavaScript')
            cy.get(BookSearch.selectors.bookList).children().should('have.length', 1)
            cy.get(BookSearch.selectors.searchBox).clear()
            cy.get(BookSearch.selectors.bookList).children().should('have.length', 8)
        })
    })

})