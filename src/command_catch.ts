import { State } from "./state.js";

export async function commandCatch(state: State, pokemonName: string): Promise<void> {
    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const pokemon = await state.pokeAPI.catch(pokemonName);

    const attempt = Math.random() * 610;
    const threshold = pokemon.base_experience;

    //console.log(`\nAttempting to catch ${pokemonName}:\n\tAttempt: ${attempt}\n\tThreshold: ${threshold}\n`);

    if (attempt < threshold) {
        console.log(`${pokemonName} escaped!`);
        return;
    }

    console.log(`${pokemonName} was caught!`);
    
    if(!state.pokedex[pokemonName])
        state.pokedex[pokemonName] = pokemon;
}