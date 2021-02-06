const Discord = require("discord.js"),
  client = new Discord.Client({
    fetchAllMembers: true,
    restTimeOffset: 60,
    ws: { intents: 32767 }
  });
let { DiscordUNO } = require("discord-uno");
client.reses = new Map();
client.config = require("./config.json");
client.color = "#ff9966";
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.uno = new DiscordUNO();
let fs = require("fs");
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  jsfiles.map(f => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
    props.help.aliases.map(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.on("message", async message => {
  let prefix = "#";
  if (message.author.bot || !message.content.toLowerCase().startsWith(prefix))
    return;
  let ctx = {
    Discord: Discord,
    client: client,
    args: message.content
      .slice(prefix.toLowerCase().length)
      .trim()
      .split(/ +/g),
    flags: new (require("string-toolkit"))().parseOptions(
      message.content.split(" ")
    ).flags,
    getAllTextFromEmbed: require("./functions/commands.js").getAllTextFromEmbed,
    commandFunctions: require("./functions/commands.js"),
    message: message
  };
  const TicTacToe = require("discord-tictactoe");
  new TicTacToe(
    {
      language: "en",
      command: "#ttt"
    },
    ctx.client
  );
  let cmd;
  cmd = ctx.args.shift();
  let command;
  if (client.commands.has(cmd)) {
    command = client.commands.get(cmd);
  } else if (client.aliases.has(cmd)) {
    command = client.commands.get(client.aliases.get(cmd));
  }
  try {
    if(command){
    command.run(ctx);
    }
  } catch (err) {
    console.log(err);
  }
});
client.on("messageUpdate", async (old, message) => {
  let prefix = "#";
  if (message.author.bot || !message.content.toLowerCase().startsWith(prefix))
    return;
  let res = client.reses.get(message.author.id) || [];
  let editedMessage =
    res && res.find(rese => rese.user === old.id)
      ? res.find(rese => rese.user === old.id).bot
      : undefined;

  let ctx = {
    Discord: Discord,
    client: client,
    args: message.content
      .slice(prefix.toLowerCase().length)
      .trim()
      .split(/ +/g),
    flags: new (require("string-toolkit"))().parseOptions(
      message.content.split(" ")
    ).flags,
    getAllTextFromEmbed: require("./functions/commands.js").getAllTextFromEmbed,
    commandFunctions: require("./functions/commands.js"),
    message: message,
    editedMessage: editedMessage
  };
  let cmd;
  cmd = ctx.args.shift();
  let command;
  if (client.commands.has(cmd)) {
    command = client.commands.get(cmd);
  } else if (client.aliases.has(cmd)) {
    command = client.commands.get(client.aliases.get(cmd));
  }
  try {
    command.run(ctx);
  } catch (err) {
    console.log(err);
  }
});
client.on("messageDelete", async message => {
  let res = client.reses.get(message.author.id) || [];
  let editedMessage =
    res && res.find(rese => rese.user === message.id)
      ? res.find(rese => rese.user === message.id).bot
      : undefined;
  if (editedMessage){
   editedMessage = await message.channel.messages.fetch(editedMessage)
editedMessage.delete();
  }
});
client.login(client.config.token);
require("./web/server.js")
