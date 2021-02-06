module.exports.run = async ctx => {
  await ctx.client.uno.endGame(ctx.message)
};
module.exports.help = {
  name: "end",
  description: "Ends a game of uno",
  aliases: ["endgame"],
  cat: "uno"
};
