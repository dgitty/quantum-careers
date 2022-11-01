import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Row, ToggleButton, Col, Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Pokemon } from "../common/models/pokemon-management";
import { PokemonService } from "../common/services";

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
    }, [pokemonService])
    /**
        * Renders the pokemon card image
        * @returns Card image
        */
    const renderImage = () => <Card.Img src={pokemon?.image} />;
    /**
     * Renders the pokemon card title
     * @returns Card title
     */
    const renderTitle = () => <Card.Title>{pokemon?.name}</Card.Title>;
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
    const renderToggle = () => <ToggleButton
        id={`toggle-is-favorite-${pokemon?.id}`}
        variant="link"
        type="checkbox"
        checked={isFavorite}
        value={String(isFavorite)}
        onChange={handleChangeFavorite} >
        <span className={isFavorite ? "bi bi-heart-fill" : "bi bi-heart"} style={{ color: 'red', fontSize: '25px' }} />
    </ToggleButton>;

    return (
        // <Loader loading={loading}>
        <Container fluid>
            <Card id={`card-pokemon-${pokemon?.id}`} style={{ minHeight: '600px' }}>
                <Card.Body>
                    {renderImage()}
                </Card.Body>
                <Card.Header>
                    <Row >
                        <Col style={{ margin: 1 }}>
                            <Row>{renderTitle()}</Row>
                            <Row>{renderText()}</Row>
                        </Col>
                        <Col style={{ textAlign: 'right', margin: 1 }}>{renderToggle()}</Col>
                    </Row>
                    <Row >CP: {pokemon?.maxCP}</Row>
                    <Row>HP: {pokemon?.maxHP}</Row>
                    <Row  >
                        <Col >
                            <Row>Weight</Row>
                            <Row>{pokemon?.weight.minimum} - {pokemon?.weight.minimum}</Row>
                        </Col>
                        <Col >
                            <Row >Height</Row>
                            <Row>{pokemon?.height.minimum} - {pokemon?.height.maximum}</Row>
                        </Col>
                    </Row>
                </Card.Header>
            </Card>
        </Container>
    );
};