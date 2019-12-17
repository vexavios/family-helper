const Discord = require("discord.js");
const client = new Discord.Client();

client.login();

client.on("ready", () => {
    console.log("family helper is now online!");
    client.user.setActivity("for people to help...", { type: "WATCHING" }).catch(console.error);
});

// suggestions channel clearer
client.on("message", message => {
    if (message.author.bot) return;

    let prefix = "f!";
    let command;
    let args;

    if (message.content.startsWith(prefix)) {
        command = message.content.split(" ")[0].slice(prefix.length).toLowerCase();
        args = message.content.split(" ").slice(1).join(" ");
    }
    
    let server = client.guilds.find(g => g.id === "622821305133039616");
    let sugg_channel = server.channels.find(c => c.id === "622842780074377241");
    
    if (message.guild === server && message.channel === sugg_channel) {
        if (message.content.trim().toLowerCase().startsWith("s!suggest")) return;
    
    message.delete()
        .then(msg => message.channel.send(message.author + "\n**꒰<a:eMessageHeart:623058074524975114>꒱ please suggest using the following format:**\n\n`s!suggest [suggestion]`")
              .then(m => m.delete(5000)).catch(console.error))
        .catch(console.error);
    } else if (command === "send") {
        if (!args) return message.channel.send("Please include a user to DM, as well as a message to send to them!");

        let messageUser;
        let sendMessage;

        // determine if user is either ID or mention, and save it based on that, and save all command arguments
        if (message.mentions.members.first() && args.split(" ")[0].trim().substring(3, args.split(" ")[0].trim().length - 1) === message.mentions.members.first().toString().substring(2, message.mentions.members.first().toString().length - 1) && args.split(" ").slice(1).join(" ").trim() || !isNaN(parseInt(args.split(" ")[0])) && args.split(" ").slice(1).join(" ").trim()) {
            if (args.split(" ")[0].trim().substring(3, args.split(" ")[0].trim().length - 1) === message.mentions.members.first().toString().substring(2, message.mentions.members.first().toString().length - 1)) messageUser = message.mentions.members.first();
            else messageUser = args.split(" ")[0].trim();

            sendMessage = args.split(" ").slice(1).join(" ").trim();
        } else {
            return message.channel.send(message.author + "\n**Usage:**```" + prefix + "send [Member mention or ID of user who you want to send the message to via DMs] [The message content that you want to DM to the user]```");
        }

        if (args.split(" ")[0].trim().substring(3, args.split(" ")[0].trim().length - 1) === message.mentions.members.first().toString().substring(2, message.mentions.members.first().toString().length - 1)) {
            messageUser.send({ embed: {
                title: "Estella Secret Santa",
                color: 16757940,
                description: sendMessage,
                footer: "Sent to you from anonymous"
              }}).then(msg => {
                  message.channel.send(message.author + `\nYour message was successfully sent to **${messageUser.user.tag}**!`);
              }).catch(err => {
                  message.channel.send(message.author + "\nThe following error occurred while trying to send your message to **" + messageUser.user.tag + "**:```" + err + "```");
              });
        } else if (!isNaN(parseInt(args.split(" ")[0]))) {
            messageUser = message.guild.members.find(u => u.id === messageUser);

            if (!messageUser) return message.channel.send("The user ID you entered is invalid!");

            messageUser.send({ embed: {
                title: "Estella Secret Santa",
                color: 16757940,
                description: sendMessage,
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "Sent to you from anonymous"
                } 
              }}).then(msg => {
                  message.channel.send(message.author + `\nYour message was successfully sent to **${messageUser.user.tag}**!`);
              }).catch(err => {
                  message.channel.send(message.author + "\nThe following error occurred while trying to send your message to **" + messageUser.user.tag + "**:```" + err + "```");
              });
        }
    }
});


// voice channel count updater
client.on("guildMemberAdd", member => {
    let server = client.guilds.find(g => g.id === "622821305133039616");
    let count_channel = server.channels.find(c => c.id === "622863885401063426");
    let new_count = server.members.filter(m => !m.user.bot).size;

    count_channel.edit({ name: `┊❝ ${new_count} friends! ❞` }).catch(console.error);
});

client.on("guildMemberRemove", member => {
    let server = client.guilds.find(g => g.id === "622821305133039616");
    let count_channel = server.channels.find(c => c.id === "622863885401063426");
    let new_count = server.members.filter(m => !m.user.bot).size;

    count_channel.edit({ name: `┊❝ ${new_count} friends! ❞` }).catch(console.error);
});
