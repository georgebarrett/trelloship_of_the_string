describe("liking a post", () => {
  before(() => {
    cy.signup("someone@example.com", "password", "username1", "User Name")
    cy.login("someone@example.com", "password")
  })

  it("increments like by one then returns to 0 after second click", () => {
    cy.get("#message").type("some message")
    cy.get("#submit").click();
    cy.get("#submit-like").click();
    cy.get("#submit-like").click();
    cy.contains("some message 1");

    cy.get("#submit-like").click();
    cy.contains("some message 0");
  })
})