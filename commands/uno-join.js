module.exports.run = async ctx => {
  await ctx.client.uno.addUser(ctx.message)
};
module.exports.help = {
  name: "join",
  description: "Joins a game of uno",
  aliases: ["adduser"],
  cat: "uno"
};
