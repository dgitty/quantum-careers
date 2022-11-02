import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Row, ToggleButton, Col, Card, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Pokemon } from '../common/models/pokemon-management';
import { PokemonService } from '../common/services';

export const PokemonDetailPage = () => {
    // Variables
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const [pokemon, setPokemon] = useState<Pokemon>();
    const { name } = useParams();

    // Services
    const pokemonService = useMemo(() => { return new PokemonService(); }, []);

    useEffect(() => {
        let mounted = true;
        pokemonService.getPokemons(undefined, undefined, name).then((pokemons) =>
            pokemonService.getPokemon(pokemons.items[0].id).then((data) => {
                if (mounted) {
                    setPokemon(data);
                    setIsFavorite(data.isFavorite);
                }
            }))
            .catch((error) => {
                if (mounted) {
                    // setLoading(false);
                }
                console.error(error);

            });
        // return () => mounted = false;
    }, [pokemonService, name])
    /**
        * Renders the pokemon card image
        * @returns Card image
        */
    const renderImage = () => <Card.Img src={pokemon?.image} />;
    /**
     * Renders the pokemon card title
     * @returns Card title
     */
    const renderTitle = () => <Card.Title style={{ fontWeight: 'bold' }}>{pokemon?.name}</Card.Title>;
    /**
     * Renders the pokemon card text
     * @returns Card text
     */
    const renderText = () => <Card.Text>{pokemon?.types.join(', ')}</Card.Text>;

    /**
     * Handles liking or unliking the pokemon
     * @param change The Changed input
     */
    const handleChangeFavorite = (change: ChangeEvent<HTMLInputElement>) => {
        let changeFav = change.target.checked;
        setIsFavorite(changeFav);
        changeFav ? pokemonService.postPokemonFavorite(pokemon?.id!)
            : pokemonService.postPokemonUnfavorite(pokemon?.id!);
        // pokemon.isFavorite = changeFav;
        // changeFav !==true && document.getElementById(`card-pokemon-${props.pokemon.id}`)?.remove();
        // var elem = document.getElementById(`card-pokemon-${props.pokemon.id}`);
        // changeFav === false && elem?.remove();// elem?.parentNode?.removeChild(elem!);
    };

    /**
     * Renders the pokemon favorite button
     * @returns Toggle button
     */
    const renderFavorite = () => <ToggleButton
        id={`toggle-is-favorite-${pokemon?.id}`}
        variant='link'
        type='checkbox'
        checked={isFavorite}
        value={String(isFavorite)}
        onChange={handleChangeFavorite} >
        <span className={isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'} style={{ color: 'red', fontSize: '25px' }} />
    </ToggleButton>;

    /**
     * Renders the pokemon sound button and plays their sound on click
     * @returns Sound Button
     */
    const renderSound = () => <Button
        id={` button-sound-${pokemon?.id}`}
        variant='link'
        onClick={() => new Audio(`${pokemon?.sound}`).play()}
    >
        <span className='bi bi-volume-up-fill' style={{ color: 'green', fontSize: '25px' }} />
    </Button>;

    return (
        // <Loader loading={loading}>
        <Container fluid >
            <Card id={`card-pokemon-${pokemon?.id}`} >
                <Card.Body>
                    <Row>
                        <Col xs={2} style={{ padding: 0, display: 'flex', alignItems: 'flex-end' }}>{renderSound()}</Col>
                        <Col xs={10}>{renderImage()}</Col>
                    </Row>
                </Card.Body>
                <Card.Header key='card-header-main'>
                    <Row  >
                        <Col xs={10} style={{ padding: '0px' }}>
                            <Row>{renderTitle()}</Row>
                            <Row>{renderText()}</Row>
                        </Col>
                        <Col xs={2} style={{ textAlign: 'right' }}>
                            <Row>{renderFavorite()}</Row>
                        </Col>
                    </Row>
                    <Row >
                        <Col xs={9} style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 5 }}><hr style={{ borderRadius: '25px', border: 'none', height: '10px', backgroundColor: 'purple' }} /></Col>
                        <Col style={{ fontWeight: 'bold', padding: '0px' }}>CP: {pokemon?.maxCP}</Col>
                    </Row>
                    <Row>
                        <Col xs={9} style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 5 }}><hr style={{ borderRadius: '25px', border: 'none', height: '10px', backgroundColor: 'green' }} /></Col>
                        <Col style={{ fontWeight: 'bold', padding: '0px' }}>HP: {pokemon?.maxHP}</Col>
                    </Row>
                </Card.Header>
                <Card.Header key='card-header-alt'>
                    <Row>
                        <Col>
                            <Row>
                                <Col style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    Weight
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ textAlign: 'center' }}>
                                    {pokemon?.weight.minimum} - {pokemon?.weight.minimum}
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    Height
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ textAlign: 'center' }}>
                                    {pokemon?.height.minimum} - {pokemon?.height.maximum}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Header>
            </Card>
        </Container>
    );
};