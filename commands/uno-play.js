module.exports.run = async ctx => {
  await ctx.client.uno.playCard(ctx.message)
};
module.exports.help = {
  name: "playcard",
  description: "Plays an uno card",
  aliases: ["playcard"],
  cat: "uno"
};
