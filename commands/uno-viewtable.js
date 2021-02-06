module.exports.run = async ctx => {
  await ctx.client.uno.viewTable(ctx.message);
};
module.exports.help = {
  name: "viewtable",
  description: "Views uno table",
  aliases: ["vt"],
  cat: "uno"
};
