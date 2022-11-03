import { ChangeEvent, useCallback, useState } from 'react';
import { Row, ToggleButton, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PokemonSummary } from '../models/pokemon-management';

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
export const PokemonSummaryComponent = (props: PokemonCardProps) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(props.pokemon.isFavorite);
    const navigate = useNavigate();
    /**
     * Handles liking or unliking the pokemon
     * @param change The Changed input
     */
    const handleChangeFavorite = useCallback((change: ChangeEvent<HTMLInputElement>) => {
        let changeFav = change.target.checked;
        setIsFavorite(changeFav);
        props.pokemon.isFavorite = changeFav;
        props.handleFavorite(props.pokemon);
    }, [props]);

    /**
     * Renders the pokemon card image and navigates to pokemon card on click.
     * @returns Card image
     */
    const renderImage = () => <Card.Img src={props.pokemon.image} onClick={() => navigate(`${props.pokemon.name}`)} />;
    /**
     * Renders the pokemon card title
     * @returns Card title
     */
    const renderTitle = () => <Card.Title>{props.pokemon.name}</Card.Title>;
    /**
     * Renders the pokemon card text
     * @returns Card text
     */
    const renderText = () => <Card.Text>{props.pokemon.types.join(', ')}</Card.Text>;
    /**
     * Renders the pokemon favorite button
     * @returns Toggle button
     */

    const renderFavorite = () => <ToggleButton
        id={`toggle-is-favorite-${props.pokemon.id}`}
        variant='link'
        type='checkbox'
        checked={isFavorite}
        value={String(isFavorite)}
        onChange={handleChangeFavorite} >
        <span className={isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'} style={{ color: 'red', fontSize: '25px' }} />
    </ToggleButton>;

    return (
        <>
            {props.showList ? <Card id={`card-pokemon-${props.pokemon.id}`} style={{ borderRadius: '0px'}} >
                <Card.Header>
                    <Row>
                        <Col>
                            {renderImage()}
                        </Col>
                        <Col style={{ margin: 1 }}>
                            <Row>{renderTitle()}</Row>
                            <Row>{renderText()}</Row>
                        </Col>
                        <Col style={{ textAlign: 'right', margin: 1 }}>{renderFavorite()}</Col>
                    </Row>
                </Card.Header>
            </Card>
                : <Card id={`card-pokemon-${props.pokemon.id}`}
                    style={{ borderRadius: '0px' }}
                >
                    <Card.Body>
                        {renderImage()}
                    </Card.Body>
                    <Card.Header>
                        <Row  >
                            <Col xs={10} style={{ padding: '0px' }}>
                                <Row>{renderTitle()}</Row>
                                <Row>{renderText()}</Row>
                            </Col>
                            <Col xs={2} style={{ textAlign: 'right' }}>
                                <Row>{renderFavorite()}</Row>
                            </Col>
                        </Row>
                    </Card.Header>
                </Card>}
        </>
    );
};