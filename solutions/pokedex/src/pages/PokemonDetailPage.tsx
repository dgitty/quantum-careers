import { useEffect, useMemo, useState } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Loader, PokemonCardComponent } from '../common/components';
import { Pokemon } from '../common/models/pokemon-management';
import { PokemonService } from '../common/services';

export const PokemonDetailPage = () => {
    // Variables
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState<Pokemon>();
    const { name } = useParams();

    // Services
    const pokemonService = useMemo(() => { return new PokemonService(); }, []);

    useEffect(() => {
        let mounted = true;
        pokemonService.getPokemons({search:name}).then((pokemons) => {
            pokemons.items.length && pokemonService.getPokemon(pokemons.items.find(i => i.name === name)?.id!).then((data) => {
                if (mounted) {
                    setPokemon(data);
                    setLoading(false);
                }
            })
        })
            .catch((error) => {
                if (mounted) {
                    setLoading(false);
                }
                console.error(error);

            });
        return () => { mounted = false; };
    }, [pokemonService, name])

    /**
     * Handles favoriting or unfavoriting a pokemon
     * @param change The Changed input
     */
    const handleChangeFavorite = (pm: any) => {
        pm.isFavorite ? pokemonService.postPokemonFavorite(pm?.id!)
            : pokemonService.postPokemonUnfavorite(pm?.id!);
    };

    return (
        <Loader loading={loading!}>
            <Container style={{ overflowX: 'hidden', padding: 10 }}  >
                <div id={`div-pokemon-card-${pokemon?.id}`} className='mb-1' key={`div-pokemon-card-${pokemon?.id}`}>
                    <PokemonCardComponent pokemon={pokemon!} handleFavorite={handleChangeFavorite} cardType='Pokemon'/>
                </div>
                <Row><h1>Evolutions</h1></Row>
                <Row xs={3} md={5} lg={7} >
                    {pokemon?.previousEvolutions.map(prev => {
                        return <Col  style={{ padding: 2 }} key={`previous-evolution-${prev.id}`}>
                            <PokemonCardComponent pokemon={prev!} handleFavorite={handleChangeFavorite} cardType='Evolution'/>
                        </Col>
                    })}
                    {pokemon?.evolutions.map(evol => {
                        return <Col  style={{ padding: 2 }} key={`evolution-${evol.id}`}>
                            <PokemonCardComponent pokemon={evol!} handleFavorite={handleChangeFavorite} cardType='Evolution'/>
                        </Col>
                    })}
                </Row>
            </Container>
        </Loader>
    );
}