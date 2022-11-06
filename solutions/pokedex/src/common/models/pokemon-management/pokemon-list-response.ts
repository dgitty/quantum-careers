import { PokemonSummary } from './pokemon-summary';

/**
 * PokemonListResponse contains a list of all pokemon summaries
 */
export interface PokemonListResponse {
    limit: number | undefined;
    offset: number | undefined;
    count: number | undefined;
    items: PokemonSummary[];
}