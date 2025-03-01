import { Pokemon, PokemonListResponse } from '../models/pokemon-management';
import { BaseApiService } from './base-api.service';

import configData from '../../config.json';
import { Utils } from '../utils';

/**
 * PokemonService extends BaseAPIService and is an interface to the Pokemon API.
 * @extends {BaseAPISerivce}
 */
export class PokemonService extends BaseApiService {
    /**
     *  Gets the Pokemon List Response
     * @param limit Number of pokemons to limit
     * @param offset Offset value
     * @param search Search pokemon by name
     * @param isFavorite Is favorite - true or false
     * @param type Pokemon Type
     * @returns The Pokemon List Response
     */
    public getPokemons({limit, offset, search, isFavorite, type}:{limit?: number, offset?: number, search?: string, isFavorite?: boolean, type?: string}): Promise<PokemonListResponse> {
        let parameters: { [id: string]: any; } = {};
        if (limit) parameters['limit'] = limit;
        if (offset) parameters['offset'] = offset;
        if (search) parameters['search'] = search;
        if (isFavorite) parameters['isFavorite'] = isFavorite;
        if (type) parameters['type'] = type;

        let urlParam = Utils.createUrlParameters(parameters);
        return this.get(`${configData.SERVER_URL}/pokemon/${urlParam}`);
    }

    /**
     * Gets the Pokemon Types
     * @returns A string list of pokemon types
     */
    public getPokemonTypes(): Promise<string[]> {
        return this.get(`${configData.SERVER_URL}/pokemon-types/`);
    }

    /**
     * Post the favorited pokemon
     * @param id The pokemon id
     * @returns The pokemon
     */
    public postPokemonFavorite(id: string): Promise<Pokemon> {
        return this.post(`${configData.SERVER_URL}/pokemon/${id}/favorite`);
    }

    /**
     * Post the unfavorited pokemon
     * @param id The pokemon id
     * @returns The pokemon
     */
    public postPokemonUnfavorite(id: string): Promise<Pokemon> {
        return this.post(`${configData.SERVER_URL}/pokemon/${id}/unfavorite`);
    }

    /**
     * Gets the pokemon
     * @param id The pokemon id
     * @returns The pokemon
     */
    public getPokemon(id: string): Promise<Pokemon> {
        return this.get(`${configData.SERVER_URL}/pokemon/${id}`);
    }
}