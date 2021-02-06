module.exports.run = async ctx => {
  await ctx.client.uno.viewWinners(ctx.message);
};
module.exports.help = {
  name: "viewwinners",
  description: "Views uno winners",
  aliases: ["vw"],
  cat: "uno"
};
