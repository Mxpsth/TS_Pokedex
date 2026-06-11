import { State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string): Promise<void> {
    const pokemon = state.pokedex[pokemonName];

    if(!pokemon) {
        console.log(`You have not caught this Pokemon yet!`);
        return;
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Stats:`);
    for (const stat of pokemon.stats) {
        console.log(`\t-${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log(`Types:`);
    for (const type of pokemon.types) { 
        console.log(`\t- ${type.type.name}`);
    }
}