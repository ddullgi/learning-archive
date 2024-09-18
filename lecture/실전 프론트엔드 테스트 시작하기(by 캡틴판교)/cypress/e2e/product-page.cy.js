const { TREE_PRODUCT_ITEMS } = require("../fixtures");

describe("상품 목록 페이지", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // 첫 번째 테스트 시나리오
  it(`페이지에 진입하면 상품 목록이 표시된다`, () => {
    // 상품이 화면에 표시되는지 판별
    cy.get("[data-cy=product-item]").should("be.visible");
  });

  // 두 번째 테스트 시나리오
  it("네비게이션바의 장바구니 링크를 클릭하면 장바구니 페이지로 이동한다.", () => {
    // prepare - 준비
    // cy.visit("/");

    // action - 인터렉션
    cy.get("[data-cy=cart-link]").click();

    // assertion - 보장
    // 주소 이동만 보장
    cy.url().should("include", "/cart");
    // 페이지의 ui 로드를 보장
    cy.get("[data-cy=cart-header]").should("be.visible");
  });

  // 세 번째 테스트 시나리오
  it("상품 목록의 아이템을 클릭하면 상품 상세 페이지로 이동한다", () => {
    // prepare
    // cy.visit("/")

    // action
    cy.get("[data-cy=product-item]").first().click();

    // assertion
    cy.get("[data-cy=product-header]")
      .contains("상품 상세 페이지!!")
      .should("be.visible");
  });

  // 네 번째 테스트 시나리오 - API 모킹
  it.only("상품 목록이 3개면 화면에 3개 상품이 표시된다.", () => {
    // prepare & action
    cy.intercept("/products", TREE_PRODUCT_ITEMS).as("getProducts");
    cy.visit("/");
    cy.wait("@getProducts");

    // assertion
    cy.get("[data-cy=product-item]").should("have.length", 3);
  });
});
