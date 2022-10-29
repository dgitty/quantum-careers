import { PokemonSummary } from "./pokemon-summary";

export interface PokemonListResponse{
    limit:	number;
    offset:	number;
    count:	number;
    items: PokemonSummary[]
}