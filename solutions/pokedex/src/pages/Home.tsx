import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Row, ButtonGroup, ToggleButton, Form, Col, Button } from "react-bootstrap";
import { PokemonCardComponent } from "../common/components";
import { PokemonListResponse } from "../common/models/pokemon-management";
import { PokemonService } from "../common/services";

export const Home = () => {
  // Variables
  // const [loading, setLoading] = useState(true);

  // Variables associated to user input
  const [showView, setShowView] = useState('2');
  const showViews = [
    { name: 'Grid', value: '1' },
    { name: 'List', value: '2' },
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
          // console.log('pokrmonlist', pokemonList);
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

  const handleShowView = (change: ChangeEvent<HTMLButtonElement>) => {
    setShowView(change.target.value);
    console.log('in here');
    setPokemons(() => pokemons);
  }

  return (
    // <Loader loading={loading}>
    <>
      <Row className="mb-2">
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
      <Row className="mb-2">
        <Col xs={7}>
          <Form.Control type="text" placeholder="Search" onChange={handleSearchText} value={searchText} />
        </Col>
        <Col>
          <Form.Select onChange={handleSelectPokemonType} value={selectedPokemonType}>
            <option value=''>Type</option>
            {pokemonTypes.map((pokemonType) => {
              return <option key={pokemonType} value={pokemonType} >{pokemonType}</option>
            })}
          </Form.Select>
        </Col>
        <Col>
          <Button id="button-list-view" className="bi bi-list" variant="outline-secondary" value='1' onChange={handleShowView} />
          <Button id="button-grid-view" className="bi bi-grid-3x2" value='2' onChange={handleShowView} />
        </Col>

      </Row>
      <hr />
      <Row>
        {pokemons?.items.map((pokemon) => {
          return <Col key={`pokemon-${pokemon.id}`}><PokemonCardComponent pokemon={pokemon} pokemonService={pokemonService} /></Col>;
        })}
      </Row>
    </>
    // </Loader>
  );
};