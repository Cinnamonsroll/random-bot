module.exports.run = async ctx => {
 let GameCord = require("gamecord-fork").djs
  new GameCord.Quiz(ctx.message)
  .setTitle("Quiz")
  .setColor(ctx.client.color)

  .run()
};
module.exports.help = {
  name: "quiz",
  description: "a quiz",
  aliases: ["EEEEEE"],
  cat: "games"
};
