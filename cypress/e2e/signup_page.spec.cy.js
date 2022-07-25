describe('Note app', function () {
  beforeEach(function () {
    // empty users database
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'mluukkai',
      firstName: 'Matti',
      lastName: 'Luukkainen',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
    cy.contains('SIGN UP').click()
  })

  it('user can sign up with all fields filled', function () {
    cy.get('#firstNameInput').type('test')
    cy.get('#lastNameInput').type('cypress')
    cy.get('#usernameInput').type('testcypress')
    cy.get('#passwordInput').type('cypress123')
    cy.get('#signUpButton').click()

    // successful account modal
    cy.contains('Thank you for signing up!')
    cy.contains('Your account has been successfully created.')
  })

  it('user can sign up with only last name missing', function () {
    cy.get('#firstNameInput').type('test')
    cy.get('#usernameInput').type('testcypress')
    cy.get('#passwordInput').type('cypress123')
    cy.get('#signUpButton').click()

    // successful account modal
    cy.contains('Thank you for signing up!')
    cy.contains('Your account has been successfully created.')
  })

  it('user cannot sign up with existing username', function () {
    cy.get('#firstNameInput').type('test')
    cy.get('#lastNameInput').type('cypress')
    cy.get('#usernameInput').type('mluukkai')
    cy.get('#passwordInput').type('cypress123')
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
