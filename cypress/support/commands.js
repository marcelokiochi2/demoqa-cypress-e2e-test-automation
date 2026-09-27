Cypress.Commands.add('alertStub', () => {
    cy.window().then((win) => {
        cy.stub(win, 'alert').as('alert')
    })
})

Cypress.Commands.add('expectAlert', (message) => {
    cy.get('@alert').should('have.been.calledWith', message)
})

Cypress.Commands.add('getAuthCookies', () => {
    return cy.getCookie('userID').then((userIdCookie) => {
        return cy.getCookie('token').then((tokenCookie) => {
            return {
                userId: userIdCookie.value,
                token: tokenCookie.value
            }
        })
    })
})