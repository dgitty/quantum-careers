import { PokemonSummary } from "./pokemon-summary";

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