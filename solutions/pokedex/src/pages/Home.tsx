import { ChangeEvent, useEffect, useState } from "react";
import { Row, ButtonGroup, ToggleButton, Form, Container, Col } from "react-bootstrap";
import { PokemonService } from "../common/services";

export const Home = () => {
  // Variables
  const [show, setShow] = useState('all');

  const shows = [
    { name: 'All', value: 'all' },
    { name: 'Favorites', value: 'favorites' },
  ];

  // const [loading, setLoading] = useState(true);
  const [selectedPokemonType, setSelectedPokemonType] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);



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
    Promise.all([pokemonService.getPokemonTypes()])
      .then(([pokemonTypeList]) => {
        if (mounted) {
          setPokemonTypes(pokemonTypeList);
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

  const handleSelectPokemonType = (change: ChangeEvent<HTMLSelectElement>) => { setSelectedPokemonType(change.target.value); };

  return (
    // <Loader loading={loading}>
    <Container>
      <Row>
        <ButtonGroup>
          {shows.map((showValue, idx) => (
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
          <Form.Control size="sm" type="text" placeholder="Small text" />
        </Col>
        <Col>
          <Form.Select size="sm" onChange={handleSelectPokemonType} value={selectedPokemonType}>
            <option value=''>Type</option>
            {pokemonTypes && pokemonTypes.map((pokemonType) => {
              return <option key={pokemonType} value={pokemonType} >{pokemonType}</option>
            })}
          </Form.Select>
        </Col>
      </Row>
      {selectedPokemonType}
      {show}
    </Container>
    // </Loader>
  );
};