describe("Commenting on a post", () => {
  before(() => {
    cy.signup("someone@example.com", "password", "username1", "User Name")
    cy.login("someone@example.com", "password")
  })

  it("Adds a comment to the post with valid input", async () => {
    cy.get('#message').type('my post');
    await cy.get('#submit').click()
    cy.get('[data-cy="comment-input-field"]').last().type("Making a comment");
    await cy.get('[data-cy="submit-comment"]').last().click();
    cy.get('[data-cy="comment"]').last().should('contain.text', 'Making a comment');
  })
})