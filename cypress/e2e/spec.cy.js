describe('Note app', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Try out the card below!')
    cy.contains('This is where your question or prompt is!')
  })
})
