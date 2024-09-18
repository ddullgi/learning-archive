const ALERT_MESSAGE = "장바구니에 추가됨";

describe("상품 상세 페이지", () => {
  beforeEach(() => {
    // prepare
    cy.visit("/products/0");
  });

  // 첫 번째 테스트 코드
  it("상품 상세 페이지로 진입하면 상품의 이름과 가격, 이미지가 정상적으로 표시된다.", () => {
    // assertion
    cy.get("[data-cy=product-image]").should("be.visible");
    cy.get("[data-cy=product-name]").should("be.visible");
    cy.get("[data-cy=product-price]").should("be.visible");
  });

  // 두 번째 테스트 코드
  it("장바구니에 담기 버튼을 클릭하면 '장바구니에 추가됨'이 표시된다.", () => {
    // prepare
    const stub = cy.stub();
    cy.on("window:alert", stub);

    // action
    cy.get("[data-cy=cart-button]")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ALERT_MESSAGE);
      });
  });

  // 세 번째 테스트 코드
  it.only("장바구니 버튼을 클릭하면 장바구니 페이지로 이동한다.", () => {
    // action
    cy.get("[data-cy=cart-button]").click();

    // assertion
    cy.url().should("include", "/cart");
  });
});
