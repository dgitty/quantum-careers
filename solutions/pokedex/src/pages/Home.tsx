import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Row, ButtonGroup, ToggleButton, Form, Col, Container } from "react-bootstrap";
import { PokemonCardComponent } from "../common/components";
import { PokemonListResponse, PokemonSummary } from "../common/models/pokemon-management";
import { PokemonService } from "../common/services";

export const Home = () => {
  // Variables
  // const [loading, setLoading] = useState(true);

  // Variables associated to user input
  const [showList, setShowList] = useState(false);
  const views = [
    { name: 'Grid', className: 'bi bi-list', value: false },
    { name: 'List', className: 'bi bi-grid-3x2', value: true },
  ];

  const [showFavorite, setShowFavorite] = useState<boolean | undefined>();
  const showValues = [
    { name: 'All', value: undefined },
    { name: 'Favorites', value: true },
  ];

  const [selectedPokemonType, setSelectedPokemonType] = useState('');
  const [searchText, setSearchText] = useState('');

  // Variables associated to api
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [pokemons, setPokemons] = useState<PokemonListResponse>();


  // Services
  const pokemonService = useMemo(() => { return new PokemonService(); }, []);

  useEffect(() => {
    let mounted = true;
    Promise.all([pokemonService.getPokemonTypes(), pokemonService.getPokemons()])
      .then(([pokemonTypeList, pokemonList]) => {
        if (mounted) {
          setPokemonTypes(pokemonTypeList);
          setPokemons(pokemonList);
        }
      })
      .catch((error) => {
        if (mounted) {
          // setLoading(false);
        }
        console.error(error);

      });
    // return () => mounted = false;
  }, [pokemonService])

  /**
   * Handles showing all or favorite pokemons
   * @param change The change event
   */
  const handleShow = (change: ChangeEvent<HTMLInputElement>) => {
    let changeShowFavorite = change.currentTarget.value === 'true' ? true : undefined;
    setShowFavorite(changeShowFavorite);
    // Show favorites otherwise show all
    pokemonService.getPokemons(undefined, undefined, searchText, changeShowFavorite, selectedPokemonType).then((pokemonList) => setPokemons(pokemonList));
  }

  /**
   * Handles selecting the pokemon type
   * @param change The change event
   */
  const handleSelectPokemonType = (change: ChangeEvent<HTMLSelectElement>) => {
    let changeType = change.target.value
    setSelectedPokemonType(changeType);
    pokemonService.getPokemons(undefined, undefined, searchText, showFavorite, changeType).then((pokemonList) => setPokemons(pokemonList));
  }

  /**
   * Handles searching the pokemon based on input text
   * @param change The change event
   */
  const handleSearchText = (change: ChangeEvent<HTMLInputElement>) => {
    let changeSearch = change.target.value
    setSearchText(changeSearch);
    pokemonService.getPokemons(undefined, undefined, changeSearch, showFavorite, selectedPokemonType).then((pokemonList) => setPokemons(pokemonList));
  }

  /**
   * Handles favoriting or unfavoriting a pokemon
   * @param pokemon The pokemon
   */
  const handleChangeFavorite = (pokemon: PokemonSummary) => {
    // if isfavorite then post favorite otherwise unfavorite and if showing favorite then update favorite pokemon list
    pokemon.isFavorite ? pokemonService.postPokemonFavorite(pokemon.id)
      : pokemonService.postPokemonUnfavorite(pokemon.id).then(() => {
        showFavorite && pokemonService.getPokemons(undefined, undefined, searchText, showFavorite, selectedPokemonType).then((pokemonList) => setPokemons(pokemonList));
      });
  };

  return (
    // <Loader loading={loading}>
    <>
      <Row>
        <ButtonGroup>
          {showValues.map((showValue, idx) => (
            <ToggleButton
              key={idx}
              id={`show-${idx}`}
              type="radio"
              variant={'outline-success'}
              name="radio"
              value={String(showValue.value)}
              checked={showFavorite === showValue.value}
              onChange={handleShow}
            >
              {showValue.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Row>
      <Row>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Col>
            <Form.Control type="text" placeholder="Search" onChange={handleSearchText} value={searchText} />
          </Col>
          <Col md="auto">
            <Form.Select style={{ minWidth: 'max-content' }} onChange={handleSelectPokemonType} value={selectedPokemonType}>
              <option value=''>Type</option>
              {pokemonTypes.map((pokemonType) => {
                return <option key={pokemonType} value={pokemonType} >{pokemonType}</option>
              })}
            </Form.Select>
          </Col>
          <Col xs lg="2">
            <ButtonGroup>
              {views.map((view) => <ToggleButton
                id={`toggle-${view.name}`}
                key={`toggle-${view.name}`}
                variant="link"
                type="checkbox"
                checked={view.value}
                value={String(view.value)}
                onChange={(change) => setShowList(change.target.checked)} className={view.className}>
              </ToggleButton>
              )}
            </ButtonGroup>
          </Col>
        </Form.Group>
      </Row>
      <hr />
      <Row md={showList ? 1 : 3}>
        {pokemons?.items.map((pokemon) => {
          return <div id={`div-pokemon-card-${pokemon.id}`} className="mb-3" key={pokemon.id}><PokemonCardComponent pokemon={pokemon} handleFavorite={handleChangeFavorite} showList={showList} /></div>;
        })}
      </Row>
    </>
  );
};