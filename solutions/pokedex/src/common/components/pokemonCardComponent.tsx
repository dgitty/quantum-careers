import { ChangeEvent, useCallback, useState } from "react";
import { Row, ToggleButton, Col, Card, } from "react-bootstrap";
import { PokemonSummary } from "../models/pokemon-management";

type PokemonCardProps = {
    pokemon: PokemonSummary;
    handleFavorite: (pokemon: PokemonSummary) => void;
    showList: boolean;
}

/**
 *
 * @param props PokemonCardProps
 * @returns A pokemon card summary
 */
export const PokemonCardComponent = (props: PokemonCardProps) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(props.pokemon.isFavorite);

    /**
     * Handles liking or unliking the pokemon
     * @param change The Changed input
     */
    const handleChangeFavorite = useCallback((change: ChangeEvent<HTMLInputElement>) => {
        let changeFav = change.target.checked;
        setIsFavorite(changeFav);
        props.pokemon.isFavorite = changeFav;
        props.handleFavorite(props.pokemon);
        // changeFav !==true && document.getElementById(`card-pokemon-${props.pokemon.id}`)?.remove();
        // var elem = document.getElementById(`card-pokemon-${props.pokemon.id}`);
        // changeFav === false && elem?.remove();// elem?.parentNode?.removeChild(elem!);
    }, [props]);

    return (
        <>
            {props.showList ?
                <Card id={`card-pokemon-${props.pokemon.id}`}>
                    <Card.Header>
                        <Row>
                            <Col>          <Card.Img variant="top" src={props.pokemon.image} />
                            </Col>
                            <Col xs={10}>
                                <Row><Card.Title>{props.pokemon.name}</Card.Title>
                                </Row>
                                <Row><Card.Text>
                                    {props.pokemon.types.join(', ')}
                                </Card.Text></Row>
                            </Col>
                            <Col style={{ textAlign: 'right' }}>
                                <ToggleButton
                                    id={`toggle-is-favorite-${props.pokemon.id}`}
                                    variant="link"
                                    type="checkbox"
                                    checked={isFavorite}
                                    value={String(isFavorite)}
                                    onChange={handleChangeFavorite} >
                                    <span className={isFavorite ? "bi bi-heart-fill" : "bi bi-heart"} style={{ color: 'red' }} />
                                </ToggleButton>
                            </Col>
                        </Row>
                    </Card.Header>
                </Card>
                : <Card id={`card-pokemon-${props.pokemon.id}`}>
                    <Card.Body>
                        <Card.Img variant="top" src={props.pokemon.image} />
                    </Card.Body>
                    <Card.Header>
                        <Row>
                            <Col xs={10}>
                                <Row>
                                    <Card.Title>{props.pokemon.name}</Card.Title>
                                </Row>
                                <Row>
                                    <Card.Text>
                                        {props.pokemon.types.join(', ')}
                                    </Card.Text>
                                </Row>
                            </Col>
                            <Col style={{ textAlign: 'right' }}>
                                <ToggleButton
                                    id={`toggle-is-favorite-${props.pokemon.id}`}
                                    variant="link"
                                    type="checkbox"
                                    checked={isFavorite}
                                    value={String(isFavorite)}
                                    onChange={handleChangeFavorite} >
                                    <span className={isFavorite ? "bi bi-heart-fill" : "bi bi-heart"} style={{ color: 'red' }} />
                                </ToggleButton>
                            </Col>
                        </Row>
                    </Card.Header>
                </Card>}
        </>
    );
};