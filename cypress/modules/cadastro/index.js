const seletores = {
  botaoEntrar: 'a[href="/login"]',
  nome: '[data-qa="signup-name"]',
  email: '[data-qa="signup-email"]',
  botaoCadastrar: '[data-qa="signup-button"]',
  genero: '#id_gender2',
  senha: '[data-qa="password"]',
  dia: '[data-qa="days"]',
  mes: '[data-qa="months"]',
  ano: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  criarConta: '[data-qa="create-account"]',
  mensagemContaCriada: '[data-qa="account-created"]',
  botaoContinuar: '[data-qa="continue-button"]',
  mensagemEmailExistente: 'form[action*="/signup"] p'
};

function acessarCadastro() {
  cy.visit('/');
  cy.get(seletores.botaoEntrar).click();
}

function iniciarCadastro(nome, emailCadastro) {
  cy.get(seletores.nome).clear().type(nome);
  cy.get(seletores.email).clear().type(emailCadastro);
  cy.get(seletores.botaoCadastrar).click();
}

function preencherCadastro() {
  cy.location('pathname', { timeout: 30000 }).should('include', '/signup');

  cy.get(seletores.genero, { timeout: 30000 }).should('be.visible').check({ force: true });
  cy.get(seletores.senha, { timeout: 30000 }).should('be.visible').type('12345');
  cy.get(seletores.dia, { timeout: 30000 }).select('1');
  cy.get(seletores.mes, { timeout: 30000 }).select('September');
  cy.get(seletores.ano, { timeout: 30000 }).select('1990');
  cy.get(seletores.newsletter, { timeout: 30000 }).check({ force: true });
  cy.get(seletores.ofertas, { timeout: 30000 }).check({ force: true });
  cy.get(seletores.primeiroNome, { timeout: 30000 }).type('PGATS');
  cy.get(seletores.sobrenome, { timeout: 30000 }).type('Automação');
  cy.get(seletores.empresa, { timeout: 30000 }).type('PGATS');
  cy.get(seletores.endereco, { timeout: 30000 }).type('Rua de Teste, 123');
  cy.get(seletores.pais, { timeout: 30000 }).select('United States');
  cy.get(seletores.estado, { timeout: 30000 }).type('São Paulo');
  cy.get(seletores.cidade, { timeout: 30000 }).type('São Paulo');
  cy.get(seletores.cep, { timeout: 30000 }).type('01000');
  cy.get(seletores.celular, { timeout: 30000 }).type('11999999999');
  cy.get(seletores.criarConta, { timeout: 30000 }).click();
}

function validarCadastroComSucesso() {
  cy.get(seletores.mensagemContaCriada)
    .should('be.visible')
    .and('contain.text', 'Account Created!');

  cy.get('body').then(($body) => {
    if ($body.find(seletores.botaoContinuar).length > 0) {
      cy.get(seletores.botaoContinuar).should('be.visible').click({ force: true });
    } else {
      cy.contains('Continue').should('be.visible').click({ force: true });
    }
  });

  cy.location('pathname', { timeout: 30000 }).should('eq', '/');
}

function validarCadastroExistente() {
  cy.get('body', { timeout: 30000 }).then(($body) => {
    if ($body.find(seletores.mensagemEmailExistente).length > 0) {
      cy.get(seletores.mensagemEmailExistente).should('be.visible').and('contain.text', 'Email Address already exist!');
      return;
    }

    cy.location('pathname', { timeout: 30000 }).should('include', '/signup');
  });
}

module.exports = {
  seletores,
  acessarCadastro,
  iniciarCadastro,
  preencherCadastro,
  validarCadastroComSucesso,
  validarCadastroExistente
};