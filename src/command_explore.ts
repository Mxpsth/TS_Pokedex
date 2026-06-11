import { State } from "./state.js";

export async function commandExplore(state: State, location: string): Promise<void> {
    const encounters = await state.pokeAPI.explore(location);

    console.log(`Exploring ${location}...`);
    console.log(`Found Pokemon:`);

    for (const encounter of encounters) {
        console.log(` - ${encounter.pokemon.name}`);
    }
}