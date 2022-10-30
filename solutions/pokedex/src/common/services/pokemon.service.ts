import { PokemonListResponse } from "../models/pokemon-management";
import { BaseApiService } from "./base-api.service";

import configData from "../../config.json";

/**
 * PokemonService extends BaseAPIService and is an interface to the Pokemon API.
 * @extends {BaseAPISerivce}
 */
export class PokemonService extends BaseApiService {
    /**
     * Gets the Pokemon List Response
     * @returns The Pokemon List Response
     */
    public getPokemons(): Promise<PokemonListResponse> {
        return this.get(`${configData.SERVER_URL}/api/rest/pokemon/`);
    }

    /**
     * Gets the Pokemon Types
     * @returns A string list of pokemon types
     */
    public getPokemonTypes(): Promise<string[]>{
        return this.get(`${configData.SERVER_URL}/api/rest/pokemon-types/`);
    }
}