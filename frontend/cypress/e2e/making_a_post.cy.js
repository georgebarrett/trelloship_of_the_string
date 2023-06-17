describe("Posting a message", () => {
  before(() => {
    cy.signup("someone@example.com", "password", "username1", "User Name")
    cy.login("someone@example.com", "password")
  })

  it("adds to the list of posts with valid input and displays the username", async () => {
    cy.get("#message").type("Test post")
    await cy.get("#submit").click();
    cy.contains("Test post");
    cy.contains("username1");
  })
})