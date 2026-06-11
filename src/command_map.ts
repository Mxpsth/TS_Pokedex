import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    let locations;
    
    if (!state.nextLocationsURL)
        locations = await state.pokeAPI.fetchLocations()
    else
        locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL)

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    console.log();

    for (const location of locations.results) {
        console.log(location.name)
    }

    console.log();
}

export async function commandMapBack(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        console.log("\nYou're on the first page\n")
        return;
    }

    const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL)

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;

    console.log();

    for (const location of locations.results) {
        console.log(location.name)
    }

    console.log();
}