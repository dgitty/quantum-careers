describe('Home Test', () => {
  let pokemon = 'Charmeleon'

  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
  })

  it('Display detail view of pokemon', () => {
    // Given the pokemon when selected then navitgates to the pokemon's detail view page
    let previousEvolution = 'Charmander'
    let evolution = 'Charizard'
    cy.getByData(`card-image-${pokemon}`).click()
    cy.getByData(`card-pokemon-${pokemon}`).contains(pokemon)
    cy.getByData(`card-pokemon-${previousEvolution}`).contains(previousEvolution)

    cy.getByData(`card-pokemon-${evolution}`).contains(evolution)
    cy.url().should('include', `${pokemon}`)
  })
})