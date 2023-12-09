describe("Колонка ингредиентов ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.viewport(1920, 1080);
  });
  it("Закрытие модального окна на крестик", () => {
    cy.get("a[data-testid='link']")
      .contains("Краторная булка N-200i")
      .should("exist");
    cy.get("a[data-testid='link']").contains("Краторная булка N-200i").click();
    cy.get("[class^=modal_modal__cross__]").should("exist");
    cy.get("[class^=modal_modal__cross__]").click();
    cy.get("div[data-testid='modal-overlay']").should("not.exist");
  });
  it("Закрытие модального окна на overlay", () => {
    cy.get("a[data-testid='link']")
      .contains("Краторная булка N-200i")
      .should("exist");
    cy.get("a[data-testid='link']").contains("Краторная булка N-200i").click();
    cy.get("div[data-testid='modal-overlay']").should("exist");
    cy.get("div[data-testid='modal-overlay']").click({ force: true });
    cy.get("div[data-testid='modal-overlay']").should("not.exist");
  });
  it("Закрытие модального окна с помощью клавиши 'Esc'", () => {
    cy.get("a[data-testid='link']")
      .contains("Краторная булка N-200i")
      .should("exist");

    cy.get("a[data-testid='link']").contains("Краторная булка N-200i").click();
    cy.get("div[data-testid='modal-overlay']").should("exist");
    cy.get("body").type("{esc}");
    cy.get("div[data-testid='modal-overlay']").should("not.exist");
  });
});
