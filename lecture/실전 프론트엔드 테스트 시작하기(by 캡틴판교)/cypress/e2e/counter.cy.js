// E2E 테스트 작성은 코드 관점이 아닌 사용자 관점으로 작성해야된다.
describe("카운터 앱", () => {
  beforeEach(() => {
    // 현재 그룹핑된 describe 안에서 모든 테스트 코드가 실행되기 전에 공통 로직을 실행하고 싶다면 여기에 추가하세요.
    cy.visit("http://localhost:3000");
  });

  // 첫 번째 테스트 시나리오
  it("페이지에 진입하면 카운터 앱이 정상적으로 실행된다(0이 표시된다)", () => {
    cy.getByCy("counter").contains(0);
  });

  // 두 번째 테스트 시나리오
  it("+ 버튼을 누르면 카운터 값이 1 증가한다", () => {
    cy.getByCy("add-button").click();
    cy.getByCy("counter").contains(1);
  });

  // 세 번째 테스트 시나리오
  it("- 버튼을 누르면 카운터 값이 1 감소한다", () => {
    cy.getByCy("minus-button").click();
    cy.getByCy("counter").contains(-1);
  });
});
