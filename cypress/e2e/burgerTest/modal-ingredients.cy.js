describe("Колонка ингредиентов ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.viewport(1920, 1080);
  });
  it("Вызов модального окна", () => {
    cy.get("a[data-testid='link']")
      .contains("Краторная булка N-200i")
      .should("exist");
    cy.get("a[data-testid='link']").contains("Краторная булка N-200i").click();
    cy.url().should("include", "/ingredients/643d69a5c3f7b9001cfa093c");
    cy.get(".modal_container__modal_center__XfEoo").should("exist");
    cy.get(".ingredient-details_modal__title__14-JZ > .text").should("exist");
    cy.get("[class^=ingredient-details_container__ingridient_image__]").should(
      "exist"
    );
    cy.get(
      "[class^=ingredient-details_container__] > .text_type_main-medium"
    ).should("exist");
    cy.get(
      "[class^=ingredient-details_container__list_energy__] > :nth-child(1) > .text_type_digits-default"
    ).should("exist");
    cy.get(":nth-child(2) > .text_type_digits-default").should("exist");
    cy.get(
      "[class^=ingredient-details_container__list_energy__] > :nth-child(3) > .text_type_digits-default"
    ).should("exist");
    cy.get(":nth-child(4) > .text_type_digits-default").should("exist");
    cy.get("div[data-testid='modal-overlay']").should("exist");
  });
});
