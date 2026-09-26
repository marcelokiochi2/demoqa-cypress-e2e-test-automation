class ProfilePage {

    selectors = {
        usernameValue: '#userName-value',
        logoutButton: '.btn.btn-primary'
    }

    visit(){
        cy.visit('/profile')
    }

}

export default new ProfilePage()