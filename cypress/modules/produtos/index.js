const seletores = {
  tituloProdutos: '.title',
  listaProdutos: '.product-image-wrapper',
  campoBusca: '#search_product',
  botaoBusca: '#submit_search',
  nomeDetalheProduto: '.product-information h2',
  detalhesProduto: '.product-information',
  botaoAdicionarCarrinho: '.product-details .btn.btn-default.cart',
  botaoContinuarComprando: 'button.btn.btn-success.close-modal.btn-block'
};

function acessarProdutos() {
  cy.visit('/products');
}

function validarPaginaProdutos() {
  cy.location('pathname').should('eq', '/products');
  cy.get(seletores.tituloProdutos).should('contain.text', 'All Products');
  cy.get(seletores.listaProdutos).should('have.length.at.least', 1);
}

function abrirDetalhesDoProduto(nomeProdutoEsperado) {
  cy.contains('.product-image-wrapper', nomeProdutoEsperado).then(($produto) => {
    cy.wrap($produto).find('a').contains('View Product').click({ force: true });
  });
}

function validarDetalhesDoProduto(nomeProdutoEsperado) {
  cy.get(seletores.detalhesProduto).should('be.visible');
  cy.get(seletores.nomeDetalheProduto).should('contain.text', nomeProdutoEsperado);
}

function pesquisarProduto(nomeProduto) {
  cy.get(seletores.campoBusca).clear().type(nomeProduto);
  cy.get(seletores.botaoBusca).click();
}

function validarProdutoPesquisado(nomeProduto) {
  cy.get(seletores.listaProdutos).should('have.length.at.least', 1);
  cy.contains('.product-image-wrapper', nomeProduto).should('be.visible');
}

function adicionarPrimeiroProdutoAoCarrinho() {
  cy.get('a[href*="/product_details/"]').first().click({ force: true });
  cy.get('#quantity').clear().type('1');
  cy.contains('Add to cart').click({ force: true });
  cy.get('#cartModal').should('be.visible');
  cy.contains('View Cart').click({ force: true });
  cy.get('.check_out').should('be.visible');
}

function adicionarProdutoDetalhadoAoCarrinho() {
  cy.get(seletores.botaoAdicionarCarrinho).click({ force: true });
  cy.get(seletores.botaoContinuarComprando).click({ force: true });
}

module.exports = {
  seletores,
  acessarProdutos,
  validarPaginaProdutos,
  abrirDetalhesDoProduto,
  validarDetalhesDoProduto,
  pesquisarProduto,
  validarProdutoPesquisado,
  adicionarPrimeiroProdutoAoCarrinho,
  adicionarProdutoDetalhadoAoCarrinho
};
