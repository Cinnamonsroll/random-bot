module.exports.run = async ctx => {
  await ctx.client.uno.removeUser(ctx.message)
};
module.exports.help = {
  name: "leave",
  description: "Leaves a game of uno",
  aliases: ["removeuser"],
  cat: "uno"
};
