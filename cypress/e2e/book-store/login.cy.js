import LoginPage from '../../support/pageObjects/LoginPage'
import ProfilePage from '../../support/pageObjects/profilePage'
import user from '../../fixtures/user.json'

describe('Login', () => {
    beforeEach(() => {
        LoginPage.visit()
    })

    context('with valid credentials', () => {
        it('should login successfully', () => {
            LoginPage.login(user.username, user.password)
            cy.get(ProfilePage.selectors.usernameValue).should('have.text', user.username)
            cy.get(ProfilePage.selectors.logoutButton).should('be.visible')
        })
    })

    context('with invalid credentials', () => {
        it('should show error message because of invalid username', () => {
            LoginPage.login('InvalidUser', user.password)
            cy.get(LoginPage.selectors.errorMessage).should('have.text', 'Invalid username or password!')
        })

        it('should show error message because of invalid password', () => {
            LoginPage.login(user.username, 'InvalidPassword')
            cy.get(LoginPage.selectors.errorMessage).should('have.text', 'Invalid username or password!')
        })
    })

    context('with empty credentials', () => {
        it('should require username', () => {
            cy.get(LoginPage.selectors.passwordInput).type(user.password)
            cy.get(LoginPage.selectors.loginButton).click()
            cy.get(LoginPage.selectors.usernameInput).should('have.class', 'is-invalid')
        })

        it('should require password', () => {
            cy.get(LoginPage.selectors.usernameInput).type(user.username)
            cy.get(LoginPage.selectors.loginButton).click()
            cy.get(LoginPage.selectors.passwordInput).should('have.class', 'is-invalid')
        })

    })
})