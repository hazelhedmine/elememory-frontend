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

    cy.visit('http://localhost:3000')
    cy.contains('LOGIN').click()
  })

  it('user can login with all fields filled', function () {
    cy.get('#usernameInput').type('test123')
    cy.get('#passwordInput').type('test123')
    cy.get('#signUpButton').click()

    // home page
    cy.contains('hi test123')
  })

  it('user cannot login with non-existing username', function () {
    cy.get('#usernameInput').type('mluukkai')
    cy.get('#passwordInput').type('test123')
    cy.get('#signUpButton').click()

    // error toast
    cy.contains('Username already exists.')
    cy.get('html').should(
      'not.contain',
      'Your account has been successfully created.'
    )
  })

  it('user cannot sign up with missing fields', function () {
    cy.get('#signUpButton').click()

    // error toast
    cy.contains('Missing fields.')
    cy.get('html').should(
      'not.contain',
      'Your account has been successfully created.'
    )
  })
})
