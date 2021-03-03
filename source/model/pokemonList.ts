import PokemonUrl from "./pokemonUrl";

export default interface PokemonList {

    count   : number;
    next    : number | null;
    previous: number | null;
    results : Array <PokemonUrl>

}

export class ImplPokemonList implements PokemonList {

    count   : number;
    next    : number | null;
    previous: number | null;
    results : Array <PokemonUrl>;

    constructor () {
        this.count      = 0;
        this.next       = 0;
        this.previous   = 0;
        this.results    = new Array <PokemonUrl> ();
    }

}