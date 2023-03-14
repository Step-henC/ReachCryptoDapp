import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs'; //built by compiler

const stdlib = loadStdlib(process.env);

//front end implementation is within an async function 

(async () => {
//our code executes within this
//define network tokens
const startingBalance = stdlib.parseCurency(10);


//keyword await prevents anything else from happening until new accounts form
//also test accts only work on reach devvnet and not eth or algo network
const acctAlice = await stdlib.newTestAccount(startingBalance);
const acctBob = await stdlib.newTestAccount(startingBalance);

const contractAlice = acctAlice.contract(backend); //returns a contract
const contractBob = acctBob.contract(backend, contractAlice.getInfo()); //attaches bob to backend 

//How will user interact as Alice from the front?
await Promise.all([ //promise does all actions together
backend.Alice(contractAlice, {

}),

backend.Bob(contractBob, {

})
]);
})(); 