module.exports.run = async ctx => {
  await ctx.client.uno.draw(ctx.message);
};
module.exports.help = {
  name: "draw",
  description: "Draws a card",
  aliases: ["uwu"],
  cat: "uno"
};
