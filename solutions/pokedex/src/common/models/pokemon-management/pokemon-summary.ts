/**
 * PokemonSummary contains the summary of the pokemon
 */
export interface PokemonSummary{
    id:	string;
    name:	string;
    number:	number;
    image:	string;
    isFavorite:	boolean;
    types:	string[];
}