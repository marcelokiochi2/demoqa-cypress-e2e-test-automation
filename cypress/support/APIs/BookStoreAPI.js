class BookStoreAPI {
    removeBookIfExists(userId, isbn, token){
        cy.request({
            method: 'DELETE',
            url: '/BookStore/v1/Book',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                userId,
                isbn
            }
        }).then((response) => {
            cy.log(`Status: ${response.status}`)
            cy.log(`Body: ${JSON.stringify(response.body)}`)
            cy.log('Response:', response)
        })
    }

    addBooksIfNotExists(userId, isbns, token) {
        cy.request({
            method: 'POST',
            url: '/BookStore/v1/Books',
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                userId,
                collectionOfIsbns: isbns
            }
        }).then((response) => {
            cy.log(`Status: ${response.status}`)
            cy.log(`Body: ${JSON.stringify(response.body)}`)
            cy.log('Response:', response)
        })
    }
}

export default new BookStoreAPI()