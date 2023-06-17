describe("Commenting on a post", () => {
  before(() => {
    cy.signup("someone@example.com", "password", "username1", "User Name")
    cy.login("someone@example.com", "password")
  })

  it("Adds a comment to the post with valid input", () => {
    // cy.signup("someone@example.com", "password", "username1", "User Name")
    // .then(() => {
    //   cy.visit("/login");
    //   cy.get("#email").type("someone@example.com");
    //   cy.get("#password").type("password");
    //   cy.get("#submit").click()
    //   .then(() => {
    cy.get('#message').type('my post');
    cy.get('#submit').click()
    .then(() => {
      cy.get('[data-cy="comment-input-field"]').last().type("Making a comment");
      cy.get('[data-cy="submit-comment"]').last().click();
    })
    .then(() => {
      cy.get('[data-cy="comment"]').last().should('contain.text', 'Making a comment');
    });
  })
})