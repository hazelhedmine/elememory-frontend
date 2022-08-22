describe('Note app', function () {
  describe('Testing login form', function () {
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
      cy.contains('LOGIN').click()
    })

    it('user can login with all fields filled', function () {
      cy.get('#usernameInput').type('test123')
      cy.get('#passwordInput').type('test123')
      cy.get('#signInButton').click()

      // home page
      cy.contains('test')
    })

    it('user cannot login with non-existing username', function () {
      cy.get('#usernameInput').type('mluukkai')
      cy.get('#passwordInput').type('test123')
      cy.get('#signInButton').click()

      // error toast
      cy.contains('Username does not exist.')
      cy.get('html').should('not.contain', 'test')
    })

    it('user cannot login with wrong password', function () {
      cy.get('#usernameInput').type('test123')
      cy.get('#passwordInput').type('wrong')
      cy.get('#signInButton').click()

      // error toast
      cy.contains('Password is wrong.')
      cy.get('html').should('not.contain', 'test')
    })

    it('user cannot login with missing username', function () {
      cy.get('#passwordInput').type('wrong')
      cy.get('#signInButton').click()

      // error toast
      cy.contains('Missing fields.')
      cy.get('html').should('not.contain', 'test')
    })

    it('user cannot login with missing password', function () {
      cy.get('#usernameInput').type('username')
      cy.get('#signInButton').click()

      // error toast
      cy.contains('Missing fields.')
      cy.get('html').should('not.contain', 'test')
    })
  })

  describe('Testing user session', function () {
    beforeEach(function () {
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
      cy.contains('LOGIN').click()
      cy.get('#usernameInput').type('test123')
      cy.get('#passwordInput').type('test123')
    })

    it('user is saved to localStorage when remember me is checked', function () {
      cy.contains('Remember me').click()
      cy.get('#signInButton').click()

      // home page
      cy.contains('test')
      cy.window()
        .its('localStorage')
        .invoke('getItem', 'loggedUser')
        .should('exist')
      cy.window()
        .its('sessionStorage')
        .invoke('getItem', 'loggedUser')
        .should('not.exist')
    })

    it('user is saved to sessionStorage when remember me is not checked', function () {
      cy.get('#signInButton').click()

      // home page
      cy.contains('test')
      cy.window()
        .its('sessionStorage')
        .invoke('getItem', 'loggedUser')
        .should('exist')
      cy.window()
        .its('localStorage')
        .invoke('getItem', 'loggedUser')
        .should('not.exist')
    })
  })
})
