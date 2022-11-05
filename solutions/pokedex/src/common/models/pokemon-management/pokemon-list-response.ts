import { PokemonSummary } from './pokemon-summary';

/**
 * PokemonListResponse contains a list of all pokemon summaries
 */
export interface PokemonListResponse{
    limit:	number;
    offset:	number;
    count:	number;
    items: PokemonSummary[];
}