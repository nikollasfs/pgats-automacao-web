/// <reference types="cypress" />

const cadastro = require('../modules/cadastro');
const login = require('../modules/login');
const produtos = require('../modules/produtos');
const pedido = require('../modules/pedido');
const subscription = require('../modules/subscription');

describe('Trabalho Final - Automation Exercise', () => {
  const emailValido = `pgats-final-${Date.now()}@mail.com`;
  const usuarioNome = 'PGATS Final';
  const produtoBusca = 'Blue Top';
  const produtoDetalhe = 'Blue Top';
  const dadosCartao = {
    nome: 'PGATS Automacao',
    numero: '4111111111111111',
    cvc: '123',
    mes: '12',
    ano: '2028'
  };

  const usuarioExistenteEmail = 'test@example.com';

  const criarUsuarioParaLogin = (nome = 'PGATS', sobrenome = 'Aut', senha = '12345') => {
    const emailCriado = `pgats-login-${Date.now()}@mail.com`;

    cadastro.acessarCadastro();
    cadastro.iniciarCadastro(`${nome} ${sobrenome}`, emailCriado);
    cadastro.preencherCadastro();
    cadastro.validarCadastroComSucesso();

    cy.visit('/logout');
    cy.location('pathname', { timeout: 30000 }).should('eq', '/login');

    return {
      nome: `${nome} ${sobrenome}`,
      email: emailCriado,
      senha
    };
  };

  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Caso 1 - Register User', () => {
    cadastro.acessarCadastro();
    cadastro.iniciarCadastro(usuarioNome, emailValido);
    cadastro.preencherCadastro();
    cadastro.validarCadastroComSucesso();
  });

  it('Caso 2 - Login User with correct email and password', () => {
    const usuario = criarUsuarioParaLogin('PGATS', 'Aut');

    login.acessarLogin();
    login.efetuarLogin(usuario.email, usuario.senha);
    login.validarLogin();
  });

  it('Caso 3 - Login User with incorrect email and password', () => {
    const usuario = criarUsuarioParaLogin('PGATS', 'Errado', '12345');

    login.acessarLogin();
    login.efetuarLogin(usuario.email, 'senha-errada');
    login.validarErroNoLogin();
  });

  it('Caso 4 - Logout User', () => {
    const usuario = criarUsuarioParaLogin('PGATS', 'Logout');

    login.acessarLogin();
    login.efetuarLogin(usuario.email, usuario.senha);
    login.validarLogin();
    login.efetuarLogout();
    login.validarLogout();
  });

  it('Caso 5 - Register User with existing email', () => {
    cadastro.acessarCadastro();
    cadastro.iniciarCadastro('Existing User', usuarioExistenteEmail);
    cadastro.validarCadastroExistente();
  });

  it('Caso 8 - Verify All Products and product detail page', () => {
    produtos.acessarProdutos();
    produtos.validarPaginaProdutos();
    produtos.abrirDetalhesDoProduto(produtoDetalhe);
    produtos.validarDetalhesDoProduto(produtoDetalhe);
  });

  it('Caso 9 - Search Product', () => {
    produtos.acessarProdutos();
    produtos.pesquisarProduto(produtoBusca);
    produtos.validarProdutoPesquisado(produtoBusca);
  });

  it('Caso 10 - Verify Subscription in home page', () => {
    cy.visit('/');
    subscription.verificarInscricaoHomePage(`pgats-subscribe-${Date.now()}@mail.com`);
  });

  it('Caso 15 - Place Order: Register before Checkout', () => {
    cadastro.acessarCadastro();
    cadastro.iniciarCadastro(usuarioNome, `pgats-order-${Date.now()}@mail.com`);
    cadastro.preencherCadastro();
    cadastro.validarCadastroComSucesso();

    cy.visit('/products');
    produtos.adicionarPrimeiroProdutoAoCarrinho();
    pedido.acessarCarrinho();
    pedido.prosseguirParaCheckout();
    pedido.confirmarPedidoComCartao(dadosCartao);
    pedido.validarPedidoConfirmado();
  });

  it('Caso 16 - Place Order: Login before Checkout', () => {
    login.acessarLogin();
    login.efetuarLogin('pgats-aut-test-1791030872114@mail.com', '12345');
    cy.visit('/products');
    produtos.adicionarPrimeiroProdutoAoCarrinho();
    pedido.acessarCarrinho();
    pedido.prosseguirParaCheckout();
    pedido.confirmarPedidoComCartao(dadosCartao);
    pedido.validarPedidoConfirmado();
  });
});
