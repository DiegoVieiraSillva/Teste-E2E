/// <reference types="cypress" />
import produtoPage from "../support/page_objects/produto.page";


describe('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
     let qtd = 2
    produtoPage.visitarURL()
     
    produtoPage.buscarProduto('Teton Pullover Hoodie')
    produtoPage.addProdutoCarrinho('XS', 'Black', qtd)
    cy.get('.woocommerce-message').should('contain',  qtd + ' × “Teton Pullover Hoodie” foram adicionados no seu carrinho.')

    produtoPage.buscarProduto('Mach Street Sweatshirt')
    produtoPage.addProdutoCarrinho('XS', 'Black', qtd)
    cy.get('.woocommerce-message').should('contain',  qtd + ' × “Mach Street Sweatshirt” foram adicionados no seu carrinho.')

    produtoPage.buscarProduto('Marco Lightweight Active Hoodie')
    produtoPage.addProdutoCarrinho('XS', 'Blue', qtd)
    cy.get('.woocommerce-message').should('contain',  qtd + ' × “Marco Lightweight Active Hoodie” foram adicionados no seu carrinho.')

    produtoPage.buscarProduto('Grayson Crewneck Sweatshirt')
    produtoPage.addProdutoCarrinho('XS', 'Red', qtd)
    cy.get('.woocommerce-message').should('contain',  qtd + ' × “Grayson Crewneck Sweatshirt” foram adicionados no seu carrinho.')


    cy.get('.dropdown-toggle > .text-skin').click()
    cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
    
    cy.fixture('checkout').then(dados => {
    cy.get('#billing_first_name_field > label').type(dados.nome)
    cy.get('#billing_last_name').type(dados.sobreNome)
    cy.get('#billing_company').type(dados.nomeEmpresa)
    cy.get('#select2-billing_country-container').type(dados.país).click()
    cy.get('#billing_address_1').type(dados.endereço)
    cy.get('#billing_city').type(dados.cidade)
    cy.get('#select2-billing_state-container').type(dados.estado).click()
    cy.get('#billing_postcode').type(dados.cep)
    cy.get('#billing_phone_field > label').type(dados.telefone)
    cy.get('#billing_email_field > label').type(dados.email)
    
        cy.get('#terms').click()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')

    }) 
 });
})