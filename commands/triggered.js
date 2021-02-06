module.exports.run = async ctx => {
let Canvas  = require("canvacord")
let user = ctx.message.mentions.members.first() || ctx.message.member
let image = await Canvas.Canvas.trigger(user.user.avatarURL({format: "png"}))
let attachment = new ctx.Discord.MessageAttachment(image, "triggered.gif")
ctx.message.channel.send(attachment)
};
module.exports.help = {
  name: "triggered",
  description: "idk",
  aliases: ["idk"],
  cat: "images"
};
