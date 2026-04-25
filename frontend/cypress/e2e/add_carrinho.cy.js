describe('Adicionar benefício ao carrinho', () => {

  function preencherCodigoOTP(codigo) {
    const digitos = codigo.split('')

    cy.get('input[inputmode="numeric"]', { timeout: 5000 })
      .should('have.length.at.least', 6)
      .each(($el, index) => {
        cy.wrap($el)
          .should('be.visible')
          .clear()
          .type(digitos[index])
      })
  }

  it('Adionando produtos ao carrinho', () => {
 
    Cypress.on('uncaught:exception', () => false)
    cy.viewport(1980, 1080)
    cy.visit('https://loja.vr.com.br/carrinho/beneficios')
    cy.contains('Carrinho', { timeout: 4000 }).should('be.visible')


    //adionando produto auto
    cy.get('[data-testid="adicionar-produto-28"]', { timeout: 3000 })
      .should('be.visible')
      .click()

    const quantidade = Math.floor(Math.random() * 3) + 1
    const valor = Math.floor(Math.random() * 1000) + 150

    cy.get('input:visible').eq(0).clear().type(quantidade)
    cy.get('input:visible').eq(1).clear().type(valor)

    cy.get('#carrinho-seguir-para-a-compra').click()


    //informando cnpj
    cy.get('input[name="cnpj"]', { timeout: 15000 })
      .should('be.visible')
      .type('37735803000102')

    cy.contains('Continuar').click()

    
    // informando dados do solicitante
    cy.get('input[placeholder="Digite seu nome"]', { timeout: 15000 })
      .should('be.visible')
      .type('Joao')

    cy.get('input[placeholder="Digite seu sobrenome"]').type('Silva')
    cy.get('input[placeholder="(xx) xxxxx-xxxx"]').type('11984569849')

    
    cy.get('input[placeholder="Digite seu e-mail"]')
      .type('jferson919@gmail.com')

    cy.get('input[placeholder="xxx.xxx.xxx-xx"]').type('31656429829')
    cy.get('input[placeholder="dd/mm/aaaa"]').type('01011990')

    cy.contains('Continuar').click()

    
    // preenchendo código otp
    cy.contains('código', { timeout: 20000 }).should('be.visible')

    //reenviar
    cy.contains('Reenviar código', { timeout: 15000 })
      .should('be.visible')
      .click()

    cy.log('reenvio solicitado')
 
    cy.wait(4000)

    // busca otp no Mailosaur
    cy.task('getOtp').then((codigo) => {
      expect(codigo).to.not.be.null
      cy.log('otp recebido: ' + codigo)
      preencherCodigoOTP(codigo)
    })
    cy.contains('Verificar')
      .should('not.be.disabled')
      .click()

    // aguarda sair da tela de OTP
    cy.contains('código', { timeout: 20000 }).should('not.exist')


    //validação final
    cy.contains('Finalize sua contratação', { timeout: 20000 })
      .should('be.visible')

    cy.contains('Resumo da contratação').should('be.visible')
  })
})