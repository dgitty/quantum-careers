import { PokemonListResponse } from "../model/pokemon-management";
import { BaseApiService } from "./base-api.service";

import configData from "../../config.json";


export class PokemonService extends BaseApiService {
    public getPokemons(): Promise<PokemonListResponse> {
        return this.get(`${configData.SERVER_URL}/api/rest/pokemon/`);
    }
    public getPokemonTypes(): Promise<string[]>{
        return this.get(`${configData.SERVER_URL}/api/rest/pokemon-types/`);
    }
}