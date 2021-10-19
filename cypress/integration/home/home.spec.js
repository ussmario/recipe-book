describe("Home page", () => {
  beforeEach(() => {
      cy.visit('/')
  })
  it("header contains recipe heading with a message that there are no recipes", () => {
    cy.findByRole('heading').should('contain', 'My Recipes')
    cy.get('p')
      .findByText('There are no recipes to list.')
      .should('exist')
  })
  it("contains an add recipe button that when clicked opens a form", () => {
    cy.findByRole('button').click();

    cy.get('form')
      .findByRole('button')
      .should('exist')
  })
})