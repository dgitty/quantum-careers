import { PokemonSummary } from './pokemon-summary';

/**
 * Pokemon contains details of the Pokemon
 */
export interface Pokemon {
    id: string;
    name: string;
    number: number;
    image: string;
    isFavorite: boolean;
    types: string[];
    weight: { minimum: string, maximum: string };
    height: { minimum: string, maximum: string };
    evolutions: PokemonSummary[];
    previousEvolutions: PokemonSummary[];
    maxCP: number;
    maxHP: number;
    sound: string;

}