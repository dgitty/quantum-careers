import { ChangeEvent, useCallback, useState } from 'react';
import { Row, ToggleButton, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PokemonSummary } from '../models/pokemon-management';

type PokemonCardProps = {
    pokemon: PokemonSummary;
    handleFavorite: (pokemon: PokemonSummary) => void;
    showList?: boolean;
    cardType: 'Pokemon' | 'PokemonSummary' | 'Evolution'
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
    const handleChangeFavorite = useCallback((pm: any, change: ChangeEvent<HTMLInputElement>) => {
        let changeFav = change.target.checked;
        setIsFavorite(changeFav);
        pm.isFavorite = changeFav;
        props.handleFavorite(pm);
    }, [props]);

    /**
     * Renders the pokemon card image and navigates to pokemon card on click.
     * @returns Card image
     */
    const renderImage = (pm: any) => <Card.Img src={pm.image} onClick={() => navigate(`/${pm.name}`)} />;

    /**
     * Renders the pokemon card title
     * @returns Card title
     */
    const renderTitle = (pm: any) => <Card.Title style={{ fontWeight: 'bold' }}>{pm?.name}</Card.Title>;

    /**
     * Renders the pokemon card text
     * @returns Card text
     */
    const renderText = (pm: any) => <Card.Text>{pm?.types.join(', ')}</Card.Text>;

    /**
     * Renders the pokemon favorite button
     * @returns Toggle button
     */
    const renderFavorite = (pm: any) => <ToggleButton
        id={`toggle-is-favorite-${pm?.id}`}
        variant='link'
        type='checkbox'
        checked={pm?.isFavorite}
        value={String(pm?.isFavorite)}
        onChange={(change) => handleChangeFavorite(pm, change)} >
        <span className={isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'} style={{ color: 'red', fontSize: '25px' }} />
    </ToggleButton>;

    /**
     * Renders the pokemon sound button and plays their sound on click
     * @returns Sound Button
     */
    const renderSound = (pm: any) => <Button
        id={` button-sound-${pm?.id}`}
        variant='link'
        onClick={() => new Audio(`${pm.sound}`).play()}
    >
        <span className='bi bi-volume-up-fill' style={{ color: 'green', fontSize: '25px' }} />
    </Button>;

    const renderPokemonCardComponent = (pm: any) => {
        return <Card id={`card-pokemon-${pm.id}`} key={`card-pokemon-${pm.id}`} style={{ borderRadius: 0, padding: 0 }}>
            <Card.Body>
                <Row>
                    {props.cardType === 'Pokemon' && <Col xs={2} style={{ padding: 0, display: 'flex', alignItems: 'flex-end' }}>{renderSound(pm)}</Col>}
                    <Col xs={pm.type === 'Pokemon' && 10}>{renderImage(pm)}</Col>
                </Row>
            </Card.Body>
            <Card.Header key={`card-header-main-${pm.id}`}>
                <Row  >
                    <Col xs={10} style={{ padding: '0px' }}>
                        <Row>{renderTitle(pm)}</Row>
                        {props.cardType !== 'Evolution' && <Row>{renderText(pm)}</Row>}
                    </Col>
                    <Col xs={'auto'} style={{ textAlign: 'right', padding: '0px' }}>
                        <Row>{renderFavorite(pm)}</Row>
                    </Col>
                </Row>
                {props.cardType === 'Pokemon' && <>
                    <Row >
                        <Col xs={9} style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 5 }}><hr style={{ borderRadius: '25px', border: 'none', height: '10px', backgroundColor: 'purple' }} /></Col>
                        <Col style={{ fontWeight: 'bold', padding: '0px' }}>CP: {pm.maxCP}</Col>
                    </Row>
                    <Row>
                        <Col xs={9} style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 5 }}><hr style={{ borderRadius: '25px', border: 'none', height: '10px', backgroundColor: 'green' }} /></Col>
                        <Col style={{ fontWeight: 'bold', padding: '0px' }}>HP: {pm.maxHP}</Col>
                    </Row></>}
            </Card.Header>
            {props.cardType === 'Pokemon' &&
                <Card.Header key={`card-header-alt-${pm.id}`}>
                    <Row>
                        <Col>
                            <Row>
                                <Col style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    Weight
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ textAlign: 'center' }}>
                                    {pm.weight.minimum} - {pm.weight.minimum}
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
                                    {pm.height.minimum} - {pm.height.maximum}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Header>}
        </Card>;
    };

    return (
        <>
            {props.showList ? <Card id={`card-pokemon-${props.pokemon.id}`} style={{ borderRadius: '0px' }} >
                <Card.Header>
                    <Row>
                        <Col>
                            {renderImage(props.pokemon)}
                        </Col>
                        <Col style={{ margin: 1 }}>
                            <Row>{renderTitle(props.pokemon)}</Row>
                            <Row>{renderText(props.pokemon)}</Row>
                        </Col>
                        <Col style={{ textAlign: 'right', margin: 1 }}>{renderFavorite(props.pokemon)}</Col>
                    </Row>
                </Card.Header>
            </Card>
                : renderPokemonCardComponent(props.pokemon)
            }
        </>
    )
}