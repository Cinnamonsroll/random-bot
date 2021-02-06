module.exports = {
  async sendMessage(ctx, content, ops = {}) {
    let reses = ctx.client.reses.get(ctx.message.author.id) || [];
    if (
      content instanceof ctx.Discord.MessageEmbed && ctx.flags && 
      ctx.flags.includes("noembed")
    ) {
      if (ops.editedMessage) {
        let demessage = await ctx.message.channel.messages.fetch(
          ctx.editedMessage
        );
        await demessage.edit(ctx.getAllTextFromEmbed(content));
        return demessage
      } else {
        let mm = await ctx.message.channel.send(ctx.getAllTextFromEmbed(content));
        reses.unshift({ user: ctx.message.id, bot: mm.id });
        ctx.client.reses.set(ctx.message.author.id, reses);
        return mm
      }
    } else {
      if (ops.editedMessage) {
        let demessage = await ctx.message.channel.messages.fetch(
          ctx.editedMessage
        );
        await demessage.edit(content);
        return demessage
      } else {
        let mm = await ctx.message.channel.send(content);
        reses.unshift({ user: ctx.message.id, bot: mm.id });
        ctx.client.reses.set(ctx.message.author.id, reses);
        return mm
      }
    }
  },
  getAllTextFromEmbed(embed) {
    let text = ""
    if(embed.title) text += embed.title
    if(embed.description) text += `\n${embed.description}`
    if(embed.fields){
      text += "\n"
      for(const field of embed.fields){
      text += `\n**${field.name}**\n ${field.value}`
      }
    }
    if(embed.footer && embed.footer.text){
      text += embed.footer.text
    }
    return text
  }
};
