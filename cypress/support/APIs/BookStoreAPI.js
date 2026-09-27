class BookStoreAPI {
    removeBookAPI(userId, isbn, Authorization){
        cy.request({
            method: 'DELETE',
            url: '/BookStore/v1/Book',
            failOnStatusCode: false,
            headers: {
                Authorization
            },
            body: {
                userId,
                isbn
            }
        })
    }
}

export default new BookStoreAPI()