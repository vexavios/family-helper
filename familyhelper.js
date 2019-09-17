const Discord = require("discord.js");
const client = new Discord.Client();

client.login();

client.on("ready", () => {
    console.log("family helper is now online!");
    client.user.setActivity("for people to help...", { type: "WATCHING" }).catch(console.error);
});

// suggestions channel clearer
client.on("message", message => {
    let server = client.guilds.find(g => g.id === "622821305133039616");
    let sugg_channel = server.channels.find(c => c.id === "622842780074377241");
    
    if (message.guild !== server && message.channel !== sugg_channel) return;
    if (message.trim().toLowerCase().startsWith("s!suggest")) return;
    
    message.delete()
        .then(msg => message.channel.send(message.author + "\n**꒰<a:eMessageHeart:623058074524975114>꒱ please suggest using the following format:**\n\n`s!suggest [suggestion]`"))
        .catch(console.error);
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
