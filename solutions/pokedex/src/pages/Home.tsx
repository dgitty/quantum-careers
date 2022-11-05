import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Row, ButtonGroup, ToggleButton, Form, Col, Container } from 'react-bootstrap';
import { Loader, PokemonSummaryComponent } from '../common/components';
import { PokemonListResponse, PokemonSummary } from '../common/models/pokemon-management';
import { PokemonService } from '../common/services';
import InfiniteScroll from 'react-infinite-scroll-component';

export const Home = () => {
  // Variables
  const [loading, setLoading] = useState(true);

  // Variables associated to user input
  const [showList, setShowList] = useState(false);
  const views = [
    { name: 'Grid', className: 'bi bi-list', value: false },
    { name: 'List', className: 'bi bi-grid-3x2-gap-fill', value: true },
  ];

  const [showFavorite, setShowFavorite] = useState<boolean | undefined>();
  const showValues = [
    // All is set to undefined instead of false so that
    // the request data returns all items instead of unfavorited items
    { name: 'All', value: undefined },
    { name: 'Favorites', value: true },
  ];

  const [selectedPokemonType, setSelectedPokemonType] = useState('');
  const [searchText, setSearchText] = useState('');

  // Variables associated to api
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [pokemons, setPokemons] = useState<PokemonListResponse>();
  const LIMIT = 20; // denotes number of pokemons to retrieve from api
  const [offset, setOffset] = useState(0); // offset number at which to begin retrieving pokemons

  // Services
  const pokemonService = useMemo(() => { return new PokemonService(); }, []);

  /**
   * Fetches data from pokemon api
   */
  const fetchData = useCallback(() => {
    let mounted = true;

      Promise.all([pokemonService.getPokemonTypes(), pokemonService.getPokemons(LIMIT, offset)])
        .then(([pokemonTypeList, pokemonList]) => {
          if (mounted) {
            setPokemonTypes(pokemonTypeList);

            if (pokemons) {
              var tempPokemons: PokemonListResponse = { ...pokemons! };
              tempPokemons.items = tempPokemons.items.concat(pokemonList.items);
              setPokemons(tempPokemons);
            }
            else {
              setPokemons(pokemonList);
            }
            setOffset(offset + LIMIT);
            setLoading(false);
          }
        })
        .catch((error) => {
          if (mounted) { setLoading(false); }
          console.error(error);
        });

    return () => { mounted = false; }
  }, [offset, pokemonService, pokemons]);

  useEffect(() => {
    fetchData();
  }, [])

  /**
   * Handles showing all or favorite pokemons
   * @param change The change event
   */
  const handleShow = (change: ChangeEvent<HTMLInputElement>) => {
    let changeShowFavorite = change.currentTarget.value === 'true' ? true : undefined;
    setShowFavorite(changeShowFavorite);
    // Show favorites otherwise show all
    pokemonService.getPokemons(LIMIT, undefined, searchText, changeShowFavorite, selectedPokemonType).then((pokemonList) => setPokemons(pokemonList));
  }

  /**
   * Handles selecting the pokemon type
   * @param change The change event
   */
  const handleSelectPokemonType = (change: ChangeEvent<HTMLSelectElement>) => {
    let changeType = change.target.value
    setSelectedPokemonType(changeType);
    pokemonService.getPokemons(LIMIT, undefined, searchText, showFavorite, changeType).then((pokemonList) => setPokemons(pokemonList));
  }

  /**
   * Handles searching the pokemon based on input text
   * @param change The change event
   */
  const handleSearchText = (change: ChangeEvent<HTMLInputElement>) => {
    let changeSearch = change.target.value
    setSearchText(changeSearch);
    pokemonService.getPokemons(LIMIT, undefined, changeSearch, showFavorite, selectedPokemonType).then((pokemonList) => setPokemons(pokemonList));
  }

  /**
   * Handles favoriting or unfavoriting a pokemon
   * @param pokemon The pokemon
   */
  const handleChangeFavorite = (pokemon: PokemonSummary) => {
    // if isfavorite then post favorite otherwise unfavorite and if showing favorite then update favorite pokemon list
    pokemon.isFavorite ? pokemonService.postPokemonFavorite(pokemon.id)
      : pokemonService.postPokemonUnfavorite(pokemon.id).then(() => {
        showFavorite && pokemonService.getPokemons(LIMIT, undefined, searchText, showFavorite, selectedPokemonType).then((pokemonList) => setPokemons(pokemonList));
      });
  }

  return (
    <Loader loading={loading!}>
      <>
        <Container fluid>
          <Row className='mb-2' style={{ paddingTop: 5 }}>
            <ButtonGroup>
              {showValues.map((showValue, idx) => (
                <ToggleButton style={{ borderRadius: '0px' }}
                  key={idx}
                  id={`show-${idx}`}
                  type='radio'
                  variant={'outline-primary'}
                  name='radio'
                  value={String(showValue.value)}
                  checked={showFavorite === showValue.value}
                  onChange={handleShow}
                >
                  {showValue.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Row>
          <Row style={{ padding: 0 }}>
            <Col>
              <Form.Control style={{ borderRadius: '0px', border: 'none', backgroundColor: '#F0F0F0' }} type='text' placeholder='Search' onChange={handleSearchText} value={searchText} />
            </Col>
            <Col xs={'auto'}>
              <Form.Select style={{ minWidth: 'max-content', borderRadius: '0px', border: 'none', backgroundColor: '#F0F0F0' }} onChange={handleSelectPokemonType} value={selectedPokemonType}>
                <option value=''>Type</option>
                {pokemonTypes.map((pokemonType) => {
                  return <option key={pokemonType} value={pokemonType} >{pokemonType}</option>
                })}
              </Form.Select>
            </Col>
            <Col xs={'auto'}  >
              <ButtonGroup >
                {views.map((view) => <ToggleButton style={{ padding: 0, fontSize: '25px' }}
                  id={`toggle-${view.name}`}
                  key={`toggle-${view.name}`}
                  variant='link'
                  type='checkbox'
                  checked={view.value}
                  value={String(view.value)}
                  onChange={(change) => setShowList(change.target.checked)} className={view.className}>
                </ToggleButton>
                )}
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
        <hr style={{ padding: 0, border: 'none', height: '3px', backgroundColor: 'grey' }} />
        <InfiniteScroll
          dataLength={pokemons?.items.length! || 0}
          next={fetchData}
          hasMore={Boolean(pokemons?.items.length! !== pokemons?.count!)}
          loader={<></>}
        >
          <Container fluid style={{ overflowX: 'hidden' }}>
            <Row xs={showList ? 1 : 3} md={showList ? 1 : 5} lg={showList ? 1 : 7} >
              {pokemons?.items.map((pokemon) => {
                return <div id={`div-pokemon-card-${pokemon.id}`} className='mb-1' key={`div-pokemon-card-${pokemon.id}`}>
                  <PokemonSummaryComponent pokemon={pokemon} handleFavorite={handleChangeFavorite} showList={showList} cardType='PokemonSummary'></PokemonSummaryComponent>
                </div>;
              })}
            </Row>
          </Container>
        </InfiniteScroll>
      </>
    </Loader>
  );
}