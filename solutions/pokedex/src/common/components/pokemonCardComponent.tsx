import { ChangeEvent, useState } from "react";
import { Row, ToggleButton, Col, Card, } from "react-bootstrap";
import { PokemonSummary } from "../models/pokemon-management";
import { PokemonService } from "../services";

type PokemonCardProps = {
    pokemon: PokemonSummary;
    pokemonService: PokemonService;
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
    const handleChangeFavorite = (change: ChangeEvent<HTMLInputElement>) => {
        let changeFav = change.target.checked;
        setIsFavorite(changeFav);
        // If favorite then post fav otherwise post unfav
        changeFav ? props.pokemonService.postPokemonFavorite(props.pokemon.id) : props.pokemonService.postPokemonUnfavorite(props.pokemon.id);
    }
    return (
        <>
            <Card key={props.pokemon.id}>
                <Card.Body>
                    <Card.Img variant="top" src={props.pokemon.image} />
                </Card.Body>
                <Card.Header>
                    <Row>
                        <Col xs={10}>
                            <Row><Card.Title>{props.pokemon.name}</Card.Title>
                            </Row>
                            <Row><Card.Text>
                                {props.pokemon.types.join(', ')}
                            </Card.Text></Row>
                        </Col>
                        <Col style={{ textAlign: 'right' }}>
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
        </>

        // <>
        //     {showView === '1' ? <Card key={props.pokemon.id}>
        //         <Card.Body>
        //             <Card.Img variant="top" src={props.pokemon.image} />
        //         </Card.Body>
        //         <Card.Header>
        //             <Row>
        //                 <Col xs={10}>
        //                     <Row><Card.Title>{props.pokemon.name}</Card.Title>
        //                     </Row>
        //                     <Row><Card.Text>
        //                         {props.pokemon.types.join(', ')}
        //                     </Card.Text></Row>
        //                 </Col>
        //                 <Col style={{ textAlign: 'right' }}>
        //                     {/* <ToggleButton
        //     className="mb-2"
        //     id="toggle-check"
        //     type="checkbox"
        //     variant="outline-primary"
        //     checked={checked}
        //     value="1"
        //     onChange={(e) => setChecked(e.currentTarget.checked)}
        //   >
        //     Checked
        //   </ToggleButton> */}
        //                     <ToggleButton
        //                         id='toggle-is-favorite'
        //                         style={{}}
        //                         variant="outline-danger link"
        //                         className="bi bi-heart"
        //                         type="checkbox"
        //                         checked={isFavorite}
        //                         value={String(props.pokemon.isFavorite)}
        //                         onChange={handleChangeFavorite} />
        //                 </Col>
        //             </Row>
        //         </Card.Header>
        //     </Card>
        //         : <Card key={props.pokemon.id}>
        //             <Card.Header>
        //                 <Row>
        //                     <Col>          <Card.Img variant="top" src={props.pokemon.image} />
        //                     </Col>
        //                     <Col xs={10}>
        //                         <Row><Card.Title>{props.pokemon.name}</Card.Title>
        //                         </Row>
        //                         <Row><Card.Text>
        //                             {props.pokemon.types.join(', ')}
        //                         </Card.Text></Row>
        //                     </Col>
        //                     <Col style={{ textAlign: 'right' }}>
        //                         {/* <ToggleButton
        //   className="mb-2"
        //   id="toggle-check"
        //   type="checkbox"
        //   variant="outline-primary"
        //   checked={checked}
        //   value="1"
        //   onChange={(e) => setChecked(e.currentTarget.checked)}
        // >
        //   Checked
        // </ToggleButton> */}
        //                         <ToggleButton
        //                             id='toggle-is-favorite'
        //                             variant="link"
        //                             type="checkbox"
        //                             checked={isFavorite}
        //                             value={String(props.pokemon.isFavorite)}
        //                             onChange={handleChangeFavorite} >
        //                             <span className={isFavorite ? "bi bi-heart-fill" : "bi bi-heart"} style={{ color: 'red' }} />
        //                         </ToggleButton>
        //                     </Col>
        //                 </Row>
        //             </Card.Header>
        //         </Card>}
        // </>
    );
};