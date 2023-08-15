import LikeButton from './LikeButton'

describe("LikeButton", () => {
	it("Calls post /add-like endpoint when clicked", () => {
			window.localStorage.setItem("token", "fakeToken")
	
			const post = { _id: 1,
				message: "post one",
				likedByUsers: []
			}

			cy.mount(<LikeButton token={"token"} post={post} setLikeCount={() => {null}}/>)
	
			cy.intercept('POST', 'posts/add-like', {message: "OK"}).as("postAddLike")
	
			cy.get('[data-cy="likeButton"]').click();
			cy.wait('@postAddLike').then( interception => {
				expect(interception.response.body.message).to.eq("OK")
			})
		})
})