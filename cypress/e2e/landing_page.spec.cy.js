describe('Note app', function () {
  beforeEach(function () {
    // empty users database
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'test123',
      firstName: 'test',
      lastName: '123',
      password: 'test123',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.clearLocalStorage('loggedUser')
    cy.window().then(win => {
      win.sessionStorage.clear()
    })
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
