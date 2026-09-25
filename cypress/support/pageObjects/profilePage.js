class ProfilePage {

    selectors = {
        usernameValue: '#userName-value',
        logoutButton: '.btn.btn-primary'
    }

    visit(){
        cy.visit('https://demoqa.com/profile')
    }

}

export default new ProfilePage()