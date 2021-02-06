module.exports.run = async ctx => {
  let token = ctx.client.config.api
  let fetch = require("node-fetch");
  let uri = "https://bread-api-url.herokuapp.com/api/image/bread";
  let user = ctx.message.mentions.members.first() || ctx.message.member;
  fetch(uri, {
    method: "POST",
    
    headers: { "Content-type": "application/json", token: token }
  })
    .then(res => res.json())
    .then(json => {
     ctx.message.channel.send(json.bread)
    });
};
module.exports.help = {
  name: "bread",
  description: "Sends random bread image",
  aliases: ["bread"],
  cat: "images"
};
