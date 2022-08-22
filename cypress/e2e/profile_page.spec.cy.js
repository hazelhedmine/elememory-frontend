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

    // to bypass login ui
    cy.login({ username: 'test123', password: 'test123' })
  })

  it('profile page can be accessed', function () {
    cy.contains('Account').click()
    cy.contains('Profile').click()

    cy.contains('User Profile')
  })

  describe('in profile page', function () {
    beforeEach(function () {
      cy.contains('Account').click()
      cy.contains('Profile').click()

      cy.contains('User Profile')
      cy.contains('Edit').click()
    })
    it('user can update first name', function () {
      cy.get('#firstNameInput').clear().type('new first name')
      cy.get('#saveButton').click()

      // error toast
      cy.contains('Your profile has been successfully updated.')
      cy.get('#firstNameInput').should('have.value', 'new first name')
    })

    it('user can update last name', function () {
      cy.get('#lastNameInput').clear().type('new last name')
      cy.get('#saveButton').click()

      // error toast
      cy.contains('Your profile has been successfully updated.')
      cy.get('#lastNameInput').should('have.value', 'new last name')
    })

    // it('user can update password', function () {
    //   cy.get('#passwordInput').clear().type('newpassword')
    //   cy.get('#saveButton').click()

    //   // error toast
    //   cy.contains('Your profile has been successfully updated.')
    //   cy.get('#passwordInput').should('have.value', 'newpassword')
    // })
  })
})
