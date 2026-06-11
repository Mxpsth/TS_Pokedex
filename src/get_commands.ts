import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp,
    },
    exit: {
        name: "exit",
        description: "Exit the Pokedex",
        callback: commandExit,
    },
    map: {
        name: "map",
        description: "Lists 20 Locations",
        callback: commandMap,
    },
    mapb: {
        name: "mapb",
        description: "Lists the previous 20 Locations",
        callback: commandMapBack,
    },
    explore: {
        name: "explore",
        description: "Lists all pokemons that can be encountered in the specified location",
        callback: commandExplore,
    },
    catch: {
        name: "catch",
        description: "Attemtps to catch specified Pokemon",
        callback: commandCatch,
    },
    inspect: {
        name: "inspect",
        description: "Displays details about a specified caught Pokemon",
        callback: commandInspect,
    },
    pokedex: {
        name: "pokedex",
        description: "Displays all caught Pokemon's names",
        callback: commandPokedex,
    },
  };
}
