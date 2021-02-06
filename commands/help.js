module.exports.run = async ctx => {
  let cats = [];
  ctx.client.commands.map(cmd =>
    cats.includes(cmd.help.cat) ? "" : cats.push(cmd.help.cat)
  );
  cats = cats.sort((a, b) => {
    a.localeCompare(b);
  });
  let stringTools = new (require("string-toolkit"))();
  let query = ctx.args[0];
  if (
    (query && ctx.client.commands.get(query)) ||
    ctx.client.commands.get(ctx.client.aliases.get(query))
  ) {
    let command =
      ctx.client.commands.get(query) ||
      ctx.client.commands.get(ctx.client.aliases.get(query));
    let embed = new ctx.Discord.MessageEmbed()
      .setColor(ctx.client.color)
      .setAuthor("Help")
      .addField("Command", stringTools.toProperCase(command.help.name))
      .addField(
        "Description",
        stringTools.toProperCase(command.help.description)
      )
      .addField("Cat", stringTools.toProperCase(command.help.cat))
      .addField(
        "Aliases",
        `${command.help.aliases
          .map(t => `\`${stringTools.toProperCase(t)}\``)
          .join(" | ")}`
      );
    ctx.commandFunctions.sendMessage(ctx, embed, {
      editedMessage: ctx.editedMessage || undefined
    });
  } else if (
    (query && cats.includes(query.toLowerCase())) ||
    (parseInt(query) > 0 && parseInt(query) <= cats.length)
  ) {
    let cat = isNaN(parseInt(query))
      ? cats[parseInt(cats.indexOf(query.toLowerCase()))]
      : cats[parseInt(query - 1)];
    let embed = new ctx.Discord.MessageEmbed({ color: ctx.client.color })
      .setAuthor("Help")
      .addField("Cat", stringTools.toProperCase(cat))
      .addField(
        "Commands",
        ctx.client.commands
          .filter(cmd => cmd.help.cat === cat)
          .map(t => `\`${stringTools.toProperCase(t.help.name)}\``)
      );
    ctx.commandFunctions.sendMessage(ctx, embed, {
      editedMessage: ctx.editedMessage || undefined
    });
  } else {
    let embed = new ctx.Discord.MessageEmbed({ color: ctx.client.color })
      .setAuthor("Help")
   
      .addField(
        "Cats",
      `${cats.map((c, i) => `${stringTools.toProperCase(c)} - \`${i + 1}\``).join("\n")}`
      );
    ctx.commandFunctions.sendMessage(ctx, embed, {
      editedMessage: ctx.editedMessage || undefined
    });
  }
};
module.exports.help = {
  name: "help",
  description: "Sends help message",
  aliases: ["h"],
  cat: "general"
};
