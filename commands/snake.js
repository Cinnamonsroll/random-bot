module.exports.run = async ctx => {
  let GameCord = require("gamecord-fork").djs
  new GameCord.SnakeGame(ctx.message)
  .setTitle("Snek")
  .setColor(ctx.client.color)
  .on("end", game => ctx.message.channel.send(`${game.message.author.tag} ended with ${game.score}`))
  .run()
};
module.exports.help = {
  name: "snake",
  description: "A fun game of snake",
  aliases: ["snek"],
  cat: "games"
};
