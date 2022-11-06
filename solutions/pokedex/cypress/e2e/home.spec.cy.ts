/**
 * Home tests various features from the home page
 */
describe('Home Test', () => {
  let pokemon = 'Charmeleon'

  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
  })

  it('Contains all and favorite views', () => {
    // Given the page when visited then should contain all and favorite button
    // All button should contain a pokemon
    cy.getByData('toggle-show-all')
    cy.contains('All').click()
    cy.getByData('card-pokemon-summary').contains(pokemon)
    cy.getByData('toggle-show-favorites').contains('Favorites')
  })

  it('Infinite scroll fetches data ', () => {
    cy.getByData('row-pokemons').should('have.length', 1)
    cy.getByData('card-pokemon-summary').should('have.length.greaterThan', 1)
      .then(cards => {
        cy.window().scrollTo('bottom')
        cy.getByData('card-pokemon-summary').should('have.length', cards.length * 2)
      })
  })

  it('Select favorite adds to favorites and unfavorites removes from favorites', () => {
    // Given the pokemons, favorite them when selecting favorites then expect them to appear in favorites list.

    let aPokemon = 'Metapod'
    let bPokemon = 'Squirtle'
    cy.scrollTo('bottom')
    // favorite a pokemon
    cy.getByData('card-pokemon-summary').contains(aPokemon)
    cy.getByData(`toggle-favorite-${aPokemon}`).click()
    // favorite b pokemon
    cy.getByData('card-pokemon-summary').contains(bPokemon)
    cy.getByData(`toggle-favorite-${bPokemon}`).click()

    // show favorites
    cy.getByData('toggle-show-favorites')
    cy.contains('Favorites').click()
    cy.getByData('card-pokemon-summary').contains(aPokemon)
    cy.getByData('card-pokemon-summary').contains(bPokemon)

    // unfavorite pokemon b, pokemon a should still exist
    cy.getByData(`toggle-favorite-${bPokemon}`).click()
    cy.getByData(`card-pokemon-${bPokemon}`).should('not.exist')
  })

  it('Contains list and grid views', () => {
    // Given a list and grid view when selected then shows pokemon
    cy.getByData('toggle-view-list').click()
    cy.getByData('card-pokemon-summary').contains(pokemon)
    cy.getByData('toggle-view-grid').click()
    cy.getByData('card-pokemon-summary').contains(pokemon)
  })

  it('Search text finds pokemons', () => {
    //Given the pokemon name when entered in the search text then the pokemons should appear
    cy.getByData('form-search-text').type('Char')
    cy.getByData('card-pokemon-summary').contains(pokemon)
  })

  it('Search text does not find pokemons', () => {
    //Given the invalid name when entered in the search text then the pokemons should not appear
    cy.getByData('form-search-text').type('Chardoesnotexist')
    cy.get('card-pokemon-summary').should('not.exist')
  })

  it('Select type finds pokemons', () => {
    //Given the pokemon type when selected in the select type field then the pokemons should appear
    cy.getByData('form-select-type').select('Fire')
    cy.getByData('card-pokemon-summary').contains(pokemon)
  })

})