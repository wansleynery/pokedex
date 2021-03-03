import { PokedexProcessor }
    from './source/processor/pokedex';
import Server, { request }
    from './source/server';

import settings
    from './serverSettings.json';
import pokemonCache
    from './source/cache/pokemon.json';
import dictionary
    from './source/cache/dictionary.json';
import pokemonColors
    from './source/cache/colors.json';



const server        = new Server (settings);
const pokeProcessor = new PokedexProcessor (pokemonCache, pokemonColors);
const pokeGenerator = pokeProcessor.getAll ();

server.get ('/', 'index', { title: 'PokeDex', pokemonList: pokeGenerator.next (), dictionary });

server.getMiddleware ('/pokemon/list', () => pokeGenerator.next ());
server.getMiddleware ('/pokemon/fulllist', () => pokeProcessor.getFullList ());

server.getMiddleware ('/pokemon/color/:name', (req: request) => JSON.stringify ({ name: pokeProcessor.getColor (req.params.name) }));
server.getMiddleware ('/pokemon/:name', (req: request) => pokeProcessor.find (req.params.name));
