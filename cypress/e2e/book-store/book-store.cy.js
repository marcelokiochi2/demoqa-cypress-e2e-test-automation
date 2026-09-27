import BookSearchPage from '../../support/pageObjects/BookSearchPage'
import LoginPage from '../../support/pageObjects/LoginPage'
import user from '../../fixtures/user.json'
import ProfilePage from '../../support/pageObjects/profilePage'
import BookDetailsPage from '../../support/pageObjects/BookDetailsPage'
import BookStoreAPI from '../../support/APIs/BookStoreAPI'
import books from '../../fixtures/books.json'

describe('Book Search', () => {

    beforeEach(() => {
        BookSearchPage.visitAndWaitForBooks()
    })

    context('when accessing the book store with no filters', () => {
        it('should display the list of books', () => {
            cy.get(BookSearchPage.selectors.bookList).children()
                .should('have.length', 8)
        })
    })

    context('when searching for existing books', () => {
        it('should display the matching book when searching by exact title', () => {
            BookSearchPage.searchBook(books[0].title)
            cy.get(BookSearchPage.selectors.bookList).children()
                .should('have.length', 1)
            BookSearchPage.getBookResult(books[0].title)
                .should('be.visible')
        })

        it('should display the matching books when searching by partial title', () => {            
            const searchTerm = 'script'
            const expectedBooks = books.filter((book) =>
                book.title.toLowerCase().includes(searchTerm)
            )

            BookSearchPage.searchBook(searchTerm)
            cy.get(BookSearchPage.selectors.bookList)
                .children()
                .should('have.length', expectedBooks.length)
            expectedBooks.forEach((book) => {
                BookSearchPage.getBookResult(book.title)
                    .should('be.visible')
            })            
        })
    })

    context('when searching for a non-existing book', () => {
        it('should display no results', () => {
            BookSearchPage.searchBook('Non Existing Book')
            cy.get(BookSearchPage.selectors.bookList).children()
                .should('have.length', 0)
            BookSearchPage.getBookResult('Non Existing Book')
                .should('not.exist')
        })
    })

    context('when clearing the search', () => {
        it('should display the book list again', () => {
            BookSearchPage.searchBook(books[0].title)
            cy.get(BookSearchPage.selectors.bookList).children()
                .should('have.length', 1)
            cy.get(BookSearchPage.selectors.searchBox).clear()
            cy.get(BookSearchPage.selectors.bookList).children()
                .should('have.length', 8)
        })
    })
})

describe('Book collection', () => {

    context('when the user is logged in', () => {

        beforeEach(() => {
            cy.session('login', () => {                
                LoginPage.visit()
                LoginPage.login(user.username, user.password)
                cy.url().should('include', '/profile')
                cy.get(ProfilePage.selectors.usernameValue)
                    .should('have.text', user.username)
            })
        })

        it('should add the book to the collection', () => {
            cy.getAuthCookies().then(({userId, token}) => {
                BookStoreAPI.removeBookIfExists(
                    userId, 
                    books[0].isbn,
                    token
                )
            })

            BookSearchPage.searchAndOpenBookDetails(books[0].title)
            
            cy.alertStub()
            BookDetailsPage.addBook()
            cy.expectAlert('Book added to your collection.')

            ProfilePage.visitAndWaitForCollection()
            ProfilePage.searchBookFromCollection(books[0].title)
            ProfilePage.getBookFromCollection(books[0].title)
                .should('be.visible')
        })

        it('should not add the book again if it is already in the collection', () => {
            cy.getAuthCookies().then(({userId, token}) => {
                BookStoreAPI.addBooksIfNotExists(
                    userId, 
                    [{isbn: String(books[0].isbn)}],
                    token
                )
            })

            BookSearchPage.searchAndOpenBookDetails(books[0].title)
            
            cy.alertStub()
            BookDetailsPage.addBook()
            cy.expectAlert('Book already present in the your collection!')
        })

        it('should remove the book from the collection', () => {
            cy.getAuthCookies().then(({userId, token}) => {
                BookStoreAPI.addBooksIfNotExists(
                    userId, 
                    [{ isbn: String(books[0].isbn) }],
                    token
                )
            })

            ProfilePage.visitAndWaitForCollection()
            ProfilePage.searchBookFromCollection(books[0].title)

            cy.alertStub()
            ProfilePage.deleteBookFromCollection(books[0].title)
            cy.expectAlert('Book deleted.')

            ProfilePage.visitAndWaitForCollection()            
            ProfilePage.searchBookFromCollection(books[0].title)
            ProfilePage.getBookFromCollection(books[0].title).should('not.exist')
        })

        it('Should remove all books from the collection', () => {
            const booksToAdd = Object.values(books)
            const isbns = booksToAdd.map(({isbn}) => ({isbn}))

            cy.getAuthCookies().then(({ userId, token }) => {
                BookStoreAPI.addBooksIfNotExists(userId, isbns, token)
            })

            ProfilePage.visitAndWaitForCollection()
            ProfilePage.assertBooksInCollection(booksToAdd)

            //cy.alertStub()
            ProfilePage.deleteAllBooksFromCollection()

            // Known defect: no success message is displayed after book removal.
            // See DEFECTS.md
            //cy.expectAlert('All books were removed!')

            ProfilePage.visitAndWaitForCollection()
            ProfilePage.assertBooksNotInCollection(booksToAdd)
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
            BookSearchPage.searchAndOpenBookDetails(books[0].title)
            cy.get(BookDetailsPage.selectors.bookName)
                .should('have.text', books[0].title)
            BookDetailsPage.getButton('Add To Your Collection')
                .should('not.exist')
        })

        it('should not allow accessing the collection', () => {
            ProfilePage.visit()
            cy.get(ProfilePage.selectors.notLoginLabel)
                .should('be.visible')
                .should('have.text', 'Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.')
            cy.get(ProfilePage.selectors.bookList)
                .should('not.exist')
        })
    })
})