module.exports.run = async ctx => {
  await ctx.client.uno.createGame(ctx.message)
};
module.exports.help = {
  name: "creategame",
  description: "Creates a game of uno",
  aliases: ["cg"],
  cat: "uno"
};
