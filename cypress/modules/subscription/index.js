const seletores = {
  campoEmail: '#susbscribe_email',
  botaoInscrever: '#subscribe',
  mensagemSucesso: 'div.alert-success'
};

function verificarInscricaoHomePage(email) {
  cy.get(seletores.campoEmail, { timeout: 30000 }).should('be.visible').clear().type(email);
  cy.get(seletores.botaoInscrever, { timeout: 30000 }).should('be.visible').click();
  cy.get(seletores.mensagemSucesso, { timeout: 30000 })
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!');
}

module.exports = {
  seletores,
  verificarInscricaoHomePage
};
