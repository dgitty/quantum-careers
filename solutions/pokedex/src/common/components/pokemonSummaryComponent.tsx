import { ChangeEvent, useCallback, useState } from 'react';
import { Row, ToggleButton, Col, Card, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type PokemonCardProps = {
    pokemon: any;
    handleFavorite: (pokemon: any) => void;
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
    const renderTitle = (pm: any) => <text style={{ fontWeight: 'bold', fontSize: '12px' }}>{pm?.name}</text>;

    /**
     * Renders the pokemon card text
     * @returns Card text
     */
    const renderSubtitle = (pm: any) => <text style={{ fontSize: '10px' }}>{pm?.types.join(', ')}</text>;

    /**
     * Renders the pokemon favorite button
     * @returns Toggle button
     */
    const renderFavorite = (pm: any) => <ToggleButton
        style={{ padding: 0 }}
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

    /**
     * Renders the Pokemon Card Component. Depending on the type of card (Pokemon | Evolution) that is being displayed, certain information will show.
     * @returns The pokemon card component
     */
    const renderPokemonCardComponent = () => {
        return <Card id={`card-pokemon-${props.pokemon.id}`} key={`card-pokemon-${props.pokemon.id}`} style={{ borderRadius: 0, padding: 0 }}>
            <Card.Body>
                <Row>
                    {props.cardType === 'Pokemon' && <Col xs={2} style={{ padding: 0, display: 'flex', alignItems: 'flex-end' }}>{renderSound(props.pokemon)}</Col>}
                    <Col >{renderImage(props.pokemon)}</Col>
                </Row>
            </Card.Body>
            <Card.Header key={`card-header-main-${props.pokemon.id}`} style={{ borderBottom: 0 }}>
                {/* <Row>
                    <Col xs={10} style={{ padding: '0px' }}>
                        <Row>{renderTitle(props.pokemon)}</Row>
                        {props.cardType !== 'Evolution' && <Row>{renderSubtitle(props.pokemon)}</Row>}
                    </Col>
                    <Col style={{ textAlign: 'right', padding: '0px' }}>
                        <Row>{renderFavorite(props.pokemon)}</Row>
                    </Col>
                </Row> */}
                <Row style={{ position: 'relative', padding: 0 }}>
                    <Col style={{ padding: '0px' }}>
                        {renderTitle(props.pokemon)}
                        {props.cardType !== 'Evolution' && <Row>{renderSubtitle(props.pokemon)}</Row>}
                    </Col>
                    <Col style={{ textAlign: 'right', padding: '0px' }}>
                        {renderFavorite(props.pokemon)}
                    </Col>
                </Row>
                {props.cardType === 'Pokemon' && <>
                    <Row style={{ padding: 0 }}>
                        <Col xs={10} md={11} lg={11} style={{ paddingLeft: 0, paddingRight: 5 }}><hr className='xp-bar' style={{ marginTop: 8, backgroundColor: '#4828E4' }} /></Col>
                        <Col style={{ fontWeight: 'bold' }}><Row style={{ position: 'absolute', paddingRight: 10 }}>CP: {props.pokemon.maxCP}</Row></Col>
                    </Row>
                    <Row style={{ padding: 0 }}>
                        <Col xs={10} md={11} lg={11} style={{ paddingLeft: 0, paddingRight: 5 }}><hr className='xp-bar' style={{ marginTop: 8, backgroundColor: 'green' }} /></Col>
                        <Col style={{ fontWeight: 'bold' }}><Row style={{ position: 'absolute', paddingRight: 10 }}>HP: {props.pokemon.maxHP}</Row></Col>
                    </Row></>}
            </Card.Header>
            {props.cardType === 'Pokemon' &&
                <Card.Header key={`card-header-alt-${props.pokemon.id}`} style={{ borderBottom: 0 }}>
                    <Row style={{ padding: 0 }}>
                        <Col style={{ borderRight: 'solid' }}>
                            <Row >
                                <text className='text-center' style={{ fontWeight: 'bold' }}>
                                    Weight
                                </text>
                            </Row>
                            <Row>
                                <text className='text-center' >
                                    {props.pokemon.weight.minimum} - {props.pokemon.weight.minimum}
                                </text>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <text className='text-center' style={{ fontWeight: 'bold' }}>
                                    Height
                                </text>
                            </Row>
                            <Row>
                                <text className='text-center' >
                                    {props.pokemon.height.minimum} - {props.pokemon.height.maximum}
                                </text>
                            </Row>
                        </Col>
                    </Row>
                </Card.Header>}
        </Card>
    }

    /**
     * Renders the list view of a pokemon card
     * @returns The pokemon list component
     */
    const renderListComponent = () => {
        return <Card id={`card-pokemon-${props.pokemon.id}`} style={{ borderRadius: '0px' }} >
            <Container fluid>
                <Row>
                    <Col xs={2} md={2} lg={2}>
                        {renderImage(props.pokemon)}
                    </Col>
                    <Col style={{ background: '#F0F0F0' }}>
                        <Row>
                            <Col>
                                <Row>{renderTitle(props.pokemon)}</Row>
                                <Row>{renderSubtitle(props.pokemon)}</Row>
                            </Col>
                            <Col style={{ textAlign: 'right' }}>{renderFavorite(props.pokemon)}</Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Card>
    }
    return (
        <>
            {props.showList ? renderListComponent()
                : renderPokemonCardComponent()
            }
        </>
    )
}