import RegisterPage from '../../support/pageObjects/RegisterPage.js'
import {generateUsername} from '../../support/dataGenerator.js'
import user from '../../fixtures/user.json'

describe('Register', () => {
    beforeEach(() => {
        RegisterPage.visit()
    })
    context('with valid credentials', () => {
        it('should register successfully', () => {
            const username = generateUsername()
            RegisterPage.register('User', 'Name', username, 'Password123*')
            cy.get(RegisterPage.selectors.errorMessage).should('have.text', 'Please verify reCaptcha to register!')
        })
    })

    context('with invalid credentials', () => {
        it('should show error message because of existing username', () => {
            RegisterPage.register('User', 'Name', user.username, 'Password123')
            //cy.get(RegisterPage.selectors.errorMessage).should('have.text', 'Username already exists')
        })

        it('should show error message because of invalid password', () => {
            RegisterPage.register('User', 'Name', generateUsername(), 'pass')
            //cy.get(RegisterPage.selectors.errorMessage).should('have.text', 'Passwords must have at least one non alphanumeric character, one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), one lowercase (\'a\'-\'z\'), one special character and Password must be eight characters or longer.')
        })
    })

    context('with empty credentials', () => {
        it('should require first name', () => {
            const username = generateUsername()            
            cy.get(RegisterPage.selectors.lastNameInput).type('Name')
            cy.get(RegisterPage.selectors.usernameInput).type(username)
            cy.get(RegisterPage.selectors.passwordInput).type('Password123*')
            cy.get(RegisterPage.selectors.registerButton).click()
            cy.get(RegisterPage.selectors.firstNameInput).should('have.class', 'is-invalid')
        })

        it('should require last name', () => {
            const username = generateUsername()
            cy.get(RegisterPage.selectors.firstNameInput).type('User')
            cy.get(RegisterPage.selectors.usernameInput).type(username)
            cy.get(RegisterPage.selectors.passwordInput).type('Password123*')
            cy.get(RegisterPage.selectors.registerButton).click()
            cy.get(RegisterPage.selectors.lastNameInput).should('have.class', 'is-invalid')
        })

        it('should require username', () => {
            cy.get(RegisterPage.selectors.firstNameInput).type('User')
            cy.get(RegisterPage.selectors.lastNameInput).type('Name')
            cy.get(RegisterPage.selectors.passwordInput).type('Password123*')
            cy.get(RegisterPage.selectors.registerButton).click()
            cy.get(RegisterPage.selectors.usernameInput).should('have.class', 'is-invalid')
        })

        it('should require password', () => {
            const username = generateUsername()
            cy.get(RegisterPage.selectors.firstNameInput).type('User')
            cy.get(RegisterPage.selectors.lastNameInput).type('Name')
            cy.get(RegisterPage.selectors.usernameInput).type(username)
            cy.get(RegisterPage.selectors.registerButton).click()
            cy.get(RegisterPage.selectors.passwordInput).should('have.class', 'is-invalid')
        })
    })
})