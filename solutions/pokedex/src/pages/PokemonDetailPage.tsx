import { useEffect, useMemo, useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Loader, PokemonSummaryComponent } from '../common/components';
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
        pokemonService.getPokemons(undefined, undefined, name).then((pokemons) =>
            pokemonService.getPokemon(pokemons.items.find(i => i.name === name)?.id!).then((data) => {
                if (mounted) {
                    setPokemon(data);
                    setLoading(false);
                }
            }))
            .catch((error) => {
                if (mounted) {
                    console.log('NOT FOUND');
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
            <Container style={{ overflowX: 'hidden' }}  >
                <div id={`div-pokemon-card-${pokemon?.id}`} className='mb-1' key={`div-pokemon-card-${pokemon?.id}`}>
                    <PokemonSummaryComponent pokemon={pokemon!} handleFavorite={handleChangeFavorite} cardType='Pokemon'></PokemonSummaryComponent>
                </div>
                <Row><h1>Evolutions</h1></Row>
                <Row xs={3} md={5} lg={7} >
                    {pokemon?.previousEvolutions.map(prev => {
                        return <div style={{ padding: 4 }} key={`div-pokemon-card-${prev.id}`}>
                            <PokemonSummaryComponent pokemon={prev!} handleFavorite={handleChangeFavorite} cardType='Evolution'></PokemonSummaryComponent>
                        </div>;
                    })}
                    {pokemon?.evolutions.map(evol => {
                        return <div key={`div-pokemon-card-${evol.id}`}>
                            <PokemonSummaryComponent pokemon={evol!} handleFavorite={handleChangeFavorite} cardType='Evolution'></PokemonSummaryComponent>
                        </div>
                    })}
                </Row>
            </Container>
       </Loader>
    );
}