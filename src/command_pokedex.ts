import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    if (Object.keys(state.pokedex).length === 0) {
        console.log(`Catch a pokemon first before listing them!`);
        return;
    }
    
    console.log(`Your Pokedex:`);
    for (const pokemon in state.pokedex) {
        console.log(`\t- ${state.pokedex[pokemon].name}`);
    }
}