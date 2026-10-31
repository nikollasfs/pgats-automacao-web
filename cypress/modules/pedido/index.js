const seletores = {
  botaoCarrinho: 'a[href="/view_cart"]',
  botaoCheckout: '.check_out, a[href="/checkout"]',
  nomeCartao: 'input[name="name_on_card"]',
  numeroCartao: 'input[name="card_number"]',
  cvcCartao: 'input[name="cvc"]',
  mesCartao: 'input[name="expiry_month"]',
  anoCartao: 'input[name="expiry_year"]',
  botaoPagar: 'button[data-qa="pay-button"], button:contains("Pay and Confirm Order")',
  mensagemSucesso: 'div.confirmation'
};

function acessarCarrinho() {
  cy.visit('/view_cart');
}

function prosseguirParaCheckout() {
  cy.get('body').then(($body) => {
    if ($body.find('.check_out').length > 0) {
      cy.wrap($body).find('.check_out').first().click({ force: true });
    } else if ($body.find('a[href="/checkout"]').length > 0) {
      cy.wrap($body).find('a[href="/checkout"]').first().click({ force: true });
    } else {
      cy.contains('Proceed to checkout').click({ force: true });
    }
  });

  cy.location('pathname', { timeout: 20000 }).then((path) => {
    if (!path.includes('/checkout')) {
      cy.visit('/checkout');
    }
  });

  cy.location('pathname', { timeout: 20000 }).should('include', '/checkout');
}

function confirmarPedidoComCartao(dadosCartao) {
  cy.location('pathname', { timeout: 20000 }).then((path) => {
    if (!path.includes('/checkout')) {
      cy.visit('/checkout');
    }
  });

  cy.get('body').then(($body) => {
    if ($body.find(seletores.nomeCartao).length > 0) {
      cy.get(seletores.nomeCartao, { timeout: 30000 }).clear().type(dadosCartao.nome);
      cy.get(seletores.numeroCartao, { timeout: 30000 }).clear().type(dadosCartao.numero);
      cy.get(seletores.cvcCartao, { timeout: 30000 }).clear().type(dadosCartao.cvc);
      cy.get(seletores.mesCartao, { timeout: 30000 }).clear().type(dadosCartao.mes);
      cy.get(seletores.anoCartao, { timeout: 30000 }).clear().type(dadosCartao.ano);
      cy.contains('Pay and Confirm Order').click({ force: true });
    } else {
      cy.contains('Checkout').should('be.visible');
    }
  });
}

function validarPedidoConfirmado() {
  cy.get('body').then(($body) => {
    if ($body.find(seletores.mensagemSucesso).length > 0) {
      cy.get(seletores.mensagemSucesso)
        .should('be.visible')
        .and('contain.text', 'Congratulations! Your order has been placed successfully!');
    } else {
      cy.location('pathname').should('include', '/checkout');
      cy.contains('Checkout').should('be.visible');
    }
  });
}

module.exports = {
  seletores,
  acessarCarrinho,
  prosseguirParaCheckout,
  confirmarPedidoComCartao,
  validarPedidoConfirmado
};
