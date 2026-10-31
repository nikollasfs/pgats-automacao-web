const seletores = {
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
  usuarioAutenticado: 'a[href="/logout"]',
  textoErro: 'form[action*="/login"] > p',
  botaoLogout: 'a[href="/logout"]'
};

function acessarLogin() {
  cy.visit('/login');
}

function efetuarLogin(email, senha) {
  cy.get(seletores.email, { timeout: 30000 }).should('be.visible').clear().type(email);
  cy.get(seletores.senha, { timeout: 30000 }).should('be.visible').clear().type(senha);
  cy.get(seletores.botaoEntrar, { timeout: 30000 }).should('be.visible').click();
}

function validarLogin(nomeUsuario = null) {
  cy.get(seletores.usuarioAutenticado, { timeout: 30000 }).should('be.visible');

  if (nomeUsuario) {
    cy.contains('Logged in as').should('be.visible');
    cy.contains(nomeUsuario).should('be.visible');
  }
}

function validarErroNoLogin() {
  cy.get(seletores.textoErro, { timeout: 30000 })
    .should('be.visible')
    .and('contain.text', 'Your email or password is incorrect!');
}

function efetuarLogout() {
  cy.get(seletores.botaoLogout, { timeout: 30000 }).should('be.visible').click();
}

function validarLogout() {
  cy.location('pathname', { timeout: 30000 }).should('eq', '/login');
  cy.contains('Login to your account', { timeout: 30000 }).should('be.visible');
}

module.exports = {
  seletores,
  acessarLogin,
  efetuarLogin,
  validarLogin,
  validarErroNoLogin,
  efetuarLogout,
  validarLogout
};
