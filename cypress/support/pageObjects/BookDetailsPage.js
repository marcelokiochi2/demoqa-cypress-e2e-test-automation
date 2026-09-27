class BookDetail{
    selectors = {
        button: '#addNewRecordButton',
        bookName: '#title-wrapper > .col-md-9 > #userName-value'
    }

    getButton(buttonText){
        return cy.contains(this.selectors.button, buttonText)
    }

    addBook() {
        this.getButton('Add To Your Collection').click()
    }    
}

export default new BookDetail()