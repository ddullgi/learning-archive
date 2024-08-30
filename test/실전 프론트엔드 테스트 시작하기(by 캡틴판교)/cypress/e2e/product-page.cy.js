describe("상품 목록 페이지", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // 첫 번째 테스트 시나리오
  it(`페이지에 진입하면 상품 목록이 표시된다`, () => {
    // 상품이 화면에 표시되는지 판별
    cy.get("[data-cy=product-item]").should("be.visible");
  });
});
