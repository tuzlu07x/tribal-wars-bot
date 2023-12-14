import { TWCredentials } from "./types";
import Agent from "./Puppeteer/Agent";
import TribalWars from "./TWClient/TribalWars";

const credentials: TWCredentials = {
  mainUrl: "https://www.klanlar.org/",
  username: "lordFatih",
  password: "1234567890",
};
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// const client = new TribalWars(Region.TR, credentials.username, credentials.password)
// await client.login()
// const worlds = client.worlds();
// const world = client.world(worlds[0].code) // tr81
// world.loadInfo() // Koy listesi, villages overview bilgilerini topla
// const villages = world.villages();
// const village = villages[0];
// village.attack('100|100', {spy: 1, sword: 10, mizrak: 10})
// village.support('100|100', {spy: 1, sword: 10, mizrak: 10})
// village.transport('100|100', {wood: 1000, cray: 1000, iron: 2000})
// const buildQueue = village.buildQueue()
// village.build(Builds.Main, BuildAction.Upgrade)
// village.buildUpgrade(Builds.Main)
// village.train(Solider.Sword, 100)

// class Vilage
// public attack(...args) {
//   return new Attack(..args)
// }
// await village.attack('100|100', {spy: 1, sword: 10, mizrak: 10}).process()

const run = async () => {

  const agent = new Agent('./session');
  //const client = new TWClient(agent, credentials);
  const tribalWars = new TribalWars(agent, credentials)

  await tribalWars.login();
  await sleep(5000)
  const world = tribalWars.world('TR')
  await world.worldNames()
  console.log(await world.list());
}

run().catch((error) => console.error(error));
