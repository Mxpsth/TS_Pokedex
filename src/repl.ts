import { State } from "./state.js";

export function startREPL(state: State): void {
    state.readline.prompt();

    state.readline.on("line", async (input: string) => {
        let reply = cleanInput(input);

        if (reply.length)
            try {
                const userCmd = state.commands[reply[0]];

                const args = reply.splice(1);

                if(!userCmd)
                    console.log(`Unknown command: "${reply[0]}". Type "help" for a list of commands.`);
                else
                    await userCmd.callback(state, ...args);


            } catch (error) {
                console.log(error);
            }

        state.readline.prompt();
    });
}

export function cleanInput(input: string): string[] {
    const rVal: string[] = [];

    for (const value of input.trim().split(/\s+/)) { 
        ///when splitting with regex that checks for any number of spaces, no longer necessary to continue if value is string.empty
        //if (value == "") continue;
        rVal.push(value.toLocaleLowerCase());
    }

    return rVal;
}
/*
const rVal = input.trim().split(' ');

for (let i = 0; i < rVal.length; i++)
    rVal[i] = rVal[i].toLowerCase();
*/