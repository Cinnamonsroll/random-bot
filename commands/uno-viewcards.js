module.exports.run = async ctx => {
  await ctx.client.uno.viewCards(ctx.message);
};
module.exports.help = {
  name: "viewcards",
  description: "Views uno cards",
  aliases: ["vc"],
  cat: "uno"
};
