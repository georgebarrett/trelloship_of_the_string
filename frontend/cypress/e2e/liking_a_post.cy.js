describe("liking a post", () => {
  before(() => {
    cy.signup("someone@example.com", "password", "username1", "User Name")
    cy.login("someone@example.com", "password")
  })

  it("increments like by one then returns to 0 after second click", async () => {
    await cy.get("#submit-like").click();
    cy.contains("some message 1");

    await cy.get("#submit-like").click();
    cy.contains("some message 0");
  })
})