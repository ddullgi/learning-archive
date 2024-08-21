// E2E 테스트 작성은 코드 관점이 아닌 사용자 관점으로 작성해야된다.
describe("카운터 앱", () => {
  // 첫 번째 테스트 시나리오
  it("페이지에 진입하면 카운터 앱이 정상적으로 실행된다(0이 표시된다)", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=counter]").contains(0);
  });

  // 두 번째 테스트 시나리오
  it("+ 버튼을 누르면 카운터 값이 1 증가한다", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=add-button]").click();
    cy.get("[data-cy=counter]").contains(1);
  });

  // 세 번째 테스트 시나리오
  it("- 버튼을 누르면 카운터 값이 1 감소한다", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy=minus-button]").click();
    cy.get("[data-cy=counter]").contains(-1);
  });
});
