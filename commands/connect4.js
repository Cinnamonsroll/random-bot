module.exports.run = async ctx => {
 let GameCord = require("gamecord-fork").djs
  new GameCord.ConnectFour(ctx.message)
  .setTitle("Connect4")
  .setColor(ctx.client.color)
  .on("end", game => ctx.message.channel.send(`${game.message.author.tag} ended with ${game.score}`))
  .run()
};
module.exports.help = {
  name: "connect4",
  description: "A game of connect4 idek",
  aliases: ["c4"],
  cat: "games"
};
