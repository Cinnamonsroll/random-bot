module.exports.run = async ctx => {
  let moment = require("moment");
  await ctx.message.guild.members.fetch({
    withPresences: true
  });
  let members = ctx.message.guild.members.cache.sort(
    (b, a) => b.joinedTimestamp - a.joinedTimestamp
  );
  let joins = members.array();
  let mention = ctx.message.mentions.members.first() || ctx.message.member;
  let mainIndex = members.array().findIndex(m => m.user.id === mention.user.id);
  let embeds = members
    .array()
    .map((m, c) =>
      c === mainIndex
        ? `**#${c + 1} ${ctx.Discord.Util.escapeMarkdown(m.user.tag)} \`(${
            m.user.bot ? `BOT` : `USER`
          })\` (${moment.utc(m.joinedAt).fromNow()}) <--**`
        : `#${c + 1} ${ctx.Discord.Util.escapeMarkdown(m.user.tag)} \`${
            m.user.bot ? `BOT` : `USER`
          }\` (${moment.utc(m.joinedAt).fromNow()})`
    );
  embeds = Array.from(
    {
      length: Math.ceil(embeds.length / 20)
    },
    (a, r) => embeds.slice(r * 10, r * 10 + 10)
  );
  
  embeds = embeds.map(
    e =>
      new ctx.Discord.MessageEmbed({
        color: ctx.client.color,
        title: "Join Positions",
        description: e.join("\n")
      })
  );
 
  await pages(ctx, ctx.message, {
    type: ctx.flags.includes("noembed") ? "message" : "embed",
    messages: embeds.map(t =>
      ctx.flags.includes("noembed") ? ctx.getAllTextFromEmbed(t) : t
    ),
    time: 60000 * 2,
    editedMessage: ctx.editedMessage || undefined
  });
  async function pages(ctx, message, ops = {}) {
    let demessage =
      (await ctx.message.channel.messages.fetch(ops.editedMessage)) ||
      undefined;
   
    let pages = ops.page ? ops.page : 0;
    let reactions =
      ops.messages.length > 1 ? ["⏪", "◀️", "⏹️", "▶️", "⏩"] : ["⏹️"];
   console.log(ops.messages[pages])
    let mainMessage = ops.editedMessage && demessage
      ? await demessage.edit(ops.messages[pages])
      : await ctx.message.channel.send(ops.messages[pages]);
   await Promise.all(reactions.map(r => mainMessage.react(r)))
    let filter = (reaction, user) =>
      reactions.includes(reaction.emoji.name) &&
      user.id === ctx.message.author.id;
    let col = mainMessage.createReactionCollector(filter, {
      time: ops.time
    });
    col.on("collect", async (reaction, user) => {
      switch (reaction.emoji.name) {
        case "⏪":
          pages = 0;
          break;
        case "◀️":
          pages === 0 ? (pages = ops.messages.length - 1) : (pages -= 1);
          break;
        case "⏹️":
          for (let reaction of mainMessage.reactions.cache
            .filter(r => r.users.cache.has(ctx.client.user.id))
            .array()) {
            await reaction.users.remove(ctx.client.user.id);
          }
          col.stop()
          break;
        case "▶️":
          pages === ops.messages.length ? (pages = 0) : (pages += 1);
          break;
        case "⏩":
          pages = ops.messages.length
          break;
      }
      await mainMessage.edit(ops.type === "message" ? ops.messages[pages] : {
        embed: ops.messages
      })
    });
  }
};
module.exports.help = {
  name: "joinpos",
  description: "Sends joinpositions",
  aliases: ["jp", "joinposition"],
  cat: "general"
};
