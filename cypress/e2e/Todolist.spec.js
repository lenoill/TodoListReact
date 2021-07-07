describe('test my todolist', () => {
    it('create todo and delete', () => {
        cy.visit('/');
        cy.get('#todo').click();
        cy.get('#todo').type('azeae');
        cy.get('.w-5').click();
        cy.get('li').then(($) => {
            const initialCount = $.length+1
            cy.get(`:nth-child(${initialCount}) > .justify-between > .flex > :nth-child(2)`).should('have.text','azeae')
            cy.get(`.flex:nth-child(${initialCount}) > .flex > .flex path`).click();
            cy.get(`:nth-child(${initialCount}) > .justify-between > .flex > :nth-child(2)`).should('not.exist')
        })        
    })
    it('create todo with a category and delete', () => {
        cy.visit('/');
        cy.visit('/');
        cy.get('#todo').click();
        cy.get('#todo').type('Test with cat2');
        cy.get('#tag').select('2');
        cy.get('.w-5').click();
        cy.get('li').then(($) => {
            const initialCount = $.length+1
            cy.get(`:nth-child(${initialCount}) > .justify-between > .flex > :nth-child(2)`).should('have.text','Test with cat2')
            cy.get(`:nth-child(${initialCount}) > .justify-between > .flex > .px-3`).should('have.text', 'Work')
            cy.get(`.flex:nth-child(${initialCount}) > .flex > .flex path`).click();
            cy.get(`:nth-child(${initialCount}) > .justify-between > .flex > :nth-child(2)`).should('not.exist')
        })  
    })

})