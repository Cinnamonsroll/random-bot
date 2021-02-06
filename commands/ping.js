module.exports.run = async ctx => {
  
  let m = await ctx.commandFunctions.sendMessage(ctx, "Ping?", {
    editedMessage: ctx.editedMessage || undefined
  });

  await m.delete();
  await ctx.commandFunctions.sendMessage(
    ctx,
    new ctx.Discord.MessageEmbed({
      color: ctx.client.color,
      fields: [
        {
          name: "RoundTrip",
          value: `${m.createdTimestamp - ctx.message.createdTimestamp} ms`
        }
      ]
    })
   
  );
};
module.exports.help = {
  name: "ping",
  description: "Pings the bot or something idk",
  aliases: ["pong", "pingpongyouropinioniswrong"],
  cat: "general"
};
