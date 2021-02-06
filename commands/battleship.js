module.exports.run = async ctx => {
  const { DiscordBattleShip } = require("discord-battleship");
  const BattleShip = new DiscordBattleShip({
    embedColor: ctx.client.color,
    prefix: "#"
  });
  await BattleShip.createGame(ctx.message);
};
module.exports.help = {
  name: "battleship",
  description: "Plays a game of battleship",
  aliases: ["bs"],
  cat: "games"
};
