module.exports.run = async ctx => {
  await ctx.client.uno.startGame(ctx.message)
};
module.exports.help = {
  name: "start",
  description: "Starts a game of uno",
  aliases: ["startgame"],
  cat: "uno"
};
