export default interface PokemonColor {

    color   : string;
    names   : Array <string>

}

export class ImplPokemonColor implements PokemonColor {

    color   : string;
    names   : Array <string>

    constructor () {
        this.color      = '';
        this.names      = new Array <string> ();
    }

}