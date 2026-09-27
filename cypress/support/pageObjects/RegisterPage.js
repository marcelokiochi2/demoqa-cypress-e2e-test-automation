class RegisterPage {

    selectors = {
        firstNameInput: '#firstname',
        lastNameInput: '#lastname',
        usernameInput: '#userName',
        passwordInput: '#password',
        registerButton: '#register',
        errorMessage: '#name'

    }

    visit(){
        cy.visit('/register')
    }

    register(firstName, lastName, username, password){
        cy.get(this.selectors.firstNameInput).type(firstName)
        cy.get(this.selectors.lastNameInput).type(lastName)
        cy.get(this.selectors.usernameInput).type(username)
        cy.get(this.selectors.passwordInput).type(password)
        cy.get(this.selectors.registerButton).click()
    }
}

export default new RegisterPage()