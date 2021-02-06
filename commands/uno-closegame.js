module.exports.run = async ctx => {
  await ctx.client.uno.closeGame(ctx.message)
};
module.exports.help = {
  name: "closegame",
  description: "Closes a game of uno",
  aliases: ["closegame"],
  cat: "uno"
};
