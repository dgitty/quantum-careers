import { useEffect, useState } from "react";
import { Row, ButtonGroup, ToggleButton, Form, Container, Col, Card, Button } from "react-bootstrap";
import { PokemonListResponse } from "../common/models/pokemon-management";
import { PokemonService } from "../common/services";

export const Home = () => {
  // Variables associated to user input
  const [show, setShow] = useState('all');
  const showValues = [
    { name: 'All', value: 'all' },
    { name: 'Favorites', value: 'favorites' },
  ];

  // const [loading, setLoading] = useState(true);
  const [selectedPokemonType, setSelectedPokemonType] = useState('');
  const [searchText, setSearchText] = useState('');

  // Variables associated to api
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [pokemons, setPokemons] = useState<PokemonListResponse>();



  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(url);
    //     const json = await response.json();
    //     console.log('NEW JSON', json);
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // };

    // fetchData();



    // Services
    const pokemonService = new PokemonService();

    // pokemonService.getPokemonTypes().then((data) => {console.log('the data',data); setPokemonTypes(data);});
    let mounted = true;
    Promise.all([pokemonService.getPokemonTypes(), pokemonService.getPokemons()])
      .then(([pokemonTypeList, pokemonList]) => {
        if (mounted) {
          setPokemonTypes(pokemonTypeList);
          setPokemons(pokemonList);
          console.log('pokrmonlist', pokemonList);
        }
      })
      .catch((error) => {
        if (mounted) {
          // setLoading(false);
        }
        console.error(error);

      });
    // return () => mounted = false;
  }, [])

  return (
    // <Loader loading={loading}>
    <Container>
      <Row>
        <ButtonGroup>
          {showValues.map((showValue, idx) => (
            <ToggleButton
              key={idx}
              id={`show-${idx}`}
              type="radio"
              variant={'outline-success'}
              name="radio"
              value={showValue.value}
              checked={show === showValue.value}
              onChange={(e) => setShow(e.currentTarget.value)}
            >
              {showValue.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Row>
      <Row>
        <Col>
          <Form.Control size="sm" type="text" placeholder="Search" onChange={(change) => setSearchText(change.target.value)} value={searchText} />
        </Col>
        <Col>
          <Form.Select size="sm" onChange={(change) => setSelectedPokemonType(change.target.value)} value={selectedPokemonType}>
            <option value=''>Type</option>
            {pokemonTypes && pokemonTypes.map((pokemonType) => {
              return <option key={pokemonType} value={pokemonType} >{pokemonType}</option>
            })}
          </Form.Select>
        </Col>

      </Row>
      {pokemons && pokemons.items.map((pokemon) => {
        return <Card key={pokemon.id}>
          <Card.Body>
            <Card.Img variant="top" src={pokemon.image} />
          </Card.Body>
          <Card.Header>
            <Row>
              <Col>
                <Row><Card.Title>{pokemon.name}</Card.Title>
                </Row>
                <Row><Card.Text>
                  {pokemon.types.join(', ')}
                </Card.Text></Row>
              </Col>
              <Col>
                {/* <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={checked}
                  value="1"
                  onChange={(e) => setChecked(e.currentTarget.checked)}
                >
                  Checked
                </ToggleButton> */}
                <Button variant="outline-danger" className="bi bi-heart-fill" />
              </Col>
            </Row>
          </Card.Header>
        </Card>;
      })}

    </Container>
    // </Loader>
  );
};