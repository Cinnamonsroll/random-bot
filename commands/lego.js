module.exports.run = async ctx => {
  let token = ctx.client.config.api
  let fetch = require("node-fetch");
  let uri = "https://bread-api-url.herokuapp.com/api/image/lego";
  let user = ctx.message.mentions.members.first() || ctx.message.member;
  fetch(uri, {
    method: "POST",
    body: JSON.stringify({
      image: user.user.avatarURL({ format: "png", size: 4096 })
    }),
    headers: { "Content-type": "application/json", token: token }
  })
    .then(res => res.json())
    .then(json => {
      ctx.message.channel.send({
        files: [
          {
            attachment: Buffer.from(json.image.data),
            name: "Lego.png"
          }
        ]
      });
    });
};
module.exports.help = {
  name: "lego",
  description: "legoifys an image",
  aliases: ["legoify"],
  cat: "images"
};
