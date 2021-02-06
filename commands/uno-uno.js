module.exports.run = async ctx => {
  await ctx.client.uno.UNO(ctx.message)
};
module.exports.help = {
  name: "unocall",
  description: "Calls uno",
  aliases: ["1call"],
  cat: "uno"
};
