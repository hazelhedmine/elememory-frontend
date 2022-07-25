describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Try out the card below!')
    cy.contains('This is where your question or prompt is!')
  })

  it('sign up page can be opened', function () {
    cy.contains('SIGN UP').click()
    cy.contains('Sign up')
    cy.contains('to start making your flashcards!')
  })

  it('login page can be opened', function () {
    cy.contains('LOGIN').click()
    cy.contains('Sign in to your account')
  })
})
