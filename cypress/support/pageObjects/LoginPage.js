class LoginPage{

    selectors = {
        usernameInput: '#userName',
        passwordInput: '#password',
        loginButton: '#login',
        errorMessage: '#name'
    }

    visit(){
        cy.visit('https://demoqa.com/login')
    }

    login(username, password){
        cy.get(this.selectors.usernameInput).type(username)
        cy.get(this.selectors.passwordInput).type(password)
        cy.get(this.selectors.loginButton).click()
    }
}

export default new LoginPage()