/// <reference types="cypress"/>

describe('Funcionalidade: login', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    afterEach(() => {
        cy.screenshot()
    });

it('Deve fazer login com sucesso', () => {
    cy.get('#username').type('thalissiamorais@yahoo.com.br')
    cy.get('#password').type('teste123')
    cy.get('.woocommerce-form > .button').click()
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, thalissiamorais')
})


it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
    cy.get('#username').type('thalissiamorais2@yahoo.com.br')
    cy.get('#password').type('teste123')
    cy.get('.woocommerce-form > .button').click() 
    cy.get('.woocommerce-error').should('exist')

});

it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
    cy.get('#username').type('thalissiamorais@yahoo.com.br')
    cy.get('#password').type('teste12344')
    cy.get('.woocommerce-form > .button').click()
    cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail thalissiamorais@yahoo.com.br está incorreta. Perdeu a senha?')
    cy.get('.woocommerce-error').should('exist')

});

})