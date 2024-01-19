/// <reference types="cypress"/>
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: login', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
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

it.only('Deve fazer login com sucesso - Usando massa de dados', () => {
    cy.get('#username').type(perfil.usuario)
    cy.get('#password').type(perfil.senha)
    cy.get('.woocommerce-form > .button').click()
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, thalissiamorais')
});

it('Deve fazer login com sucesso - Usando Fixture', () => {
    cy.fixture('perfil').then( dados => {
        cy.get('#username').type(dados.usuario)
    cy.get('#password').type(dados.senha, {log:false})
    cy.get('.woocommerce-form > .button').click()
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, thalissiamorais')
});
    })

it('Deve fazer login com sucesso - Usando comandos customizados', () => {
    cy.login('thalissiamorais@yahoo.com.br', 'teste123')
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, thalissiamorais')
});

})