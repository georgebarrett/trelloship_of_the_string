import LikeButton from './LikeButton';

describe("liking a post", () => {
  it("calls the /add-like endpoint", () => {
    window.localStorage.setItem("token", "fakeToken")

    cy.mount(<LikeButton onLike={handleLike} />)

    cy.intercept('POST', '/posts/add-like', {message: "OK"})
    .as("postAddLike")

    cy.get("#submit-like").click();
    cy.wait('@postAddLike').then( interception => {
      expect(interception.response.nody.message).to.eq("OK")
    })
  })
})