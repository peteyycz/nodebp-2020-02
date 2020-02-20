import axios from 'axios';

namespace example6_pokemon {
  type Pokemon = {
    name: string
  }
  
  class PokeAPI {
    constructor(private limit = 5) {}
  
    [Symbol.asyncIterator] = (): AsyncIterator<Pokemon> => {
      let currentPage = 1;
      return {
        next: async (): Promise<IteratorResult<Pokemon>> => {
          const { data } = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${currentPage++}`);
          return { done: currentPage === this.limit, value: data };
        }
      }
    }
  }
  
  const pokeAPI = new PokeAPI()
  
  async function main () {
    for await (const pokemon of pokeAPI) {
      console.log('Pokemon', pokemon.name);
    }
    console.log('The end');
  }
  
  main().catch(ex => {
    console.error(ex);
    process.exit(1);
  });
}