describe("liking a post", () => {
  it("increments like by one then returns to 0 after second click", () => {
    cy.signup("someone@example.com", "password", "username1", "User Name")
    .then(() => {
      cy.visit("/login");
      cy.get("#email").type("someone@example.com");
      cy.get("#password").type("password");
      cy.get("#submit").click()
      .then(() => {
        cy.get("#submit-like").click();
        cy.contains("1");
  
        cy.get("#submit-like").click();
        cy.contains("some message 0");
      })
    })
  })
})