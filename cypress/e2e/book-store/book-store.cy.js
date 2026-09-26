import BookSearchPage from '../../support/pageObjects/BookSearchPage'
import LoginPage from '../../support/pageObjects/LoginPage'
import user from '../../fixtures/user.json'
import ProfilePage from '../../support/pageObjects/profilePage'
import BookDetailsPage from '../../support/pageObjects/BookDetailsPage'

describe('Book Search', () => {

    beforeEach(() => {
        BookSearchPage.visitAndWaitForBooks()
    })

    context('when accessing the book store with no filters', () => {
        it('should display the list of books', () => {
            cy.get(BookSearchPage.selectors.bookList).children().should('have.length', 8)
        })
    })

    context('when searching for existing books', () => {
        it('should display the matching book when searching by exact title', () => {
            BookSearchPage.searchBook('Speaking JavaScript')
            cy.get(BookSearchPage.selectors.bookList).children().should('have.length', 1)
            BookSearchPage.getBookResult('Speaking JavaScript').should('be.visible')
        })

        it('should display the matching books when searching by partial title', () => {
            BookSearchPage.searchBook('design')
            cy.get(BookSearchPage.selectors.bookList).children().should('have.length', 2)
            BookSearchPage.getBookResult('Learning JavaScript Design Patterns').should('be.visible')
            BookSearchPage.getBookResult('Designing Evolvable Web APIs with ASP.NET').should('be.visible')
        })
    })

    context('when searching for a non-existing book', () => {
        it('should display no results', () => {
            BookSearchPage.searchBook('Non Existing Book')
            cy.get(BookSearchPage.selectors.bookList).children().should('have.length', 0)
            BookSearchPage.getBookResult('Non Existing Book').should('not.exist')
        })
    })

    context('when clearing the search', () => {
        it('should display the book list again', () => {
            BookSearchPage.searchBook('Git Pocket Guide')
            cy.get(BookSearchPage.selectors.bookList).children().should('have.length', 1)
            cy.get(BookSearchPage.selectors.searchBox).clear()
            cy.get(BookSearchPage.selectors.bookList).children().should('have.length', 8)
        })
    })
})

describe('Book collection', () => {

    const bookName = 'Speaking JavaScript'

    beforeEach(() => {
        BookSearchPage.visitAndWaitForBooks()
    })

    context('when the user is logged in', () => {
        beforeEach(() => {
            cy.session('login', () => {
                LoginPage.visit()
                LoginPage.login(user.username, user.password)
                cy.get(ProfilePage.selectors.usernameValue).should('have.text', user.username)
            })
        })

        it('should add the book to the collection', () => {            
            ProfilePage.deleteBookIfExists(bookName)

            BookSearchPage.searchAndOpenBookDetails(bookName)
            
            cy.alertStub()
            BookDetailsPage.addBook()
            cy.expectAlert('Book added to your collection.')

            ProfilePage.visitAndWaitForCollection()
            ProfilePage.searchBookFromCollection(bookName)
            ProfilePage.getBookFromCollection(bookName)
            .should('be.visible')
        })

        it('should not add the book again if it is already in the collection', () => {
            cy.addBookIfNotInCollection(bookName)

            BookSearchPage.searchAndOpenBookDetails(bookName)
            
            cy.alertStub()
            BookDetailsPage.addBook()
            cy.expectAlert('Book already present in the your collection!')
        })

        it('should remove the book from the collection', () => {
            cy.addBookIfNotInCollection(bookName)

            ProfilePage.visitAndWaitForCollection()
            ProfilePage.searchBookFromCollection(bookName)
            ProfilePage.deleteBookFromCollection(bookName)
        })

        it('Should remove all books from the collection', () => {
            const bookName2 = 'Git Pocket Guide'

            cy.addBookIfNotInCollection(bookName)
            cy.addBookIfNotInCollection(bookName2)
            ProfilePage.visitAndWaitForCollection()
            cy.get(ProfilePage.selectors.bookList).children().should('have.length', 2)
            ProfilePage.deleteAllBooksFromCollection()

            ProfilePage.visitAndWaitForCollection()            
            ProfilePage.searchBookFromCollection(bookName)
            ProfilePage.getBookFromCollection(bookName).should('not.exist')

            cy.get(ProfilePage.selectors.searchBox).clear()
            ProfilePage.searchBookFromCollection(bookName2)
            ProfilePage.getBookFromCollection(bookName2).should('not.exist')
        })

        it('should not allow accessing the collection after logout', () => {
            ProfilePage.visitAndWaitForCollection()
            ProfilePage.logout()
            ProfilePage.visit()
            cy.get(ProfilePage.selectors.notLoginLabel)
                .should('be.visible')
                .should('have.text', 'Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.')
            cy.get(ProfilePage.selectors.bookList).should('not.exist')
        })
    })

    context('when the user is not logged in', () => {
        
        it('should not allow adding a book to the collection', () => {
            BookSearchPage.searchAndOpenBookDetails(bookName)
            cy.get(BookDetailsPage.selectors.bookName).should('have.text', bookName)

            BookDetailsPage.getButton('Add To Your Collection').should('not.exist')
        })

        it('should not allow accessing the collection', () => {
            ProfilePage.visit()
            cy.get(ProfilePage.selectors.notLoginLabel)
                .should('be.visible')
                .should('have.text', 'Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.')
            cy.get(ProfilePage.selectors.bookList).should('not.exist')
        })
    })
})