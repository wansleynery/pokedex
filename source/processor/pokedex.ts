import PokemonColor
    from "../model/pokemonColor";
import PokemonList
    from "../model/pokemonList";

/*********************************************************************
 * Pokedex Processor
 * 
 * @description Creates an instance of pokemon list processor
 * @author Wansley Nery Soto
 *********************************************************************/

export class PokedexProcessor {

    private pokeList    : PokemonList;
    private pokeColors  : Array <PokemonColor>;

    constructor (pokeList: PokemonList, pokeColors: Array <PokemonColor>) {
        this.pokeList   = pokeList;
        this.pokeColors = pokeColors;
    }

    find (pokemonName: string) {
        return this.pokeList.results.filter (v => v.name.includes (pokemonName));
    }

    * getAll (settings: { consumes: number } = { consumes: 10 }) {
        const limit = this.pokeList.count;
        let actual = 0;
        let previous = 0;

        while (actual < limit) {
            previous = actual;
            actual += settings.consumes;
            
            yield this.pokeList.results.
                filter ((_v, i) => i >= previous && i < actual);

        }
        return [];
    }

    getColor  (name: string) {
        let colorName = '';
        this.pokeColors.forEach (color => {
            color.names.forEach (pokeName => {

                if (pokeName.toLowerCase () === name.toLowerCase ()) {
                    colorName = color.color;
                }
            })
        });

        if (!colorName.length) {
            this.pokeColors.forEach (color => {
                color.names.forEach (pokeName => {
    
                    if (pokeName.toLowerCase ().includes (name.toLowerCase ())) {
                        colorName = color.color;
                    }
                })
            });
        }
        return colorName;
    }

    getFullList  () {
        return this.pokeList.results;
    }

}