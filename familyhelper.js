const Discord = require("discord.js");
const client = new Discord.Client();

client.login();

client.on("ready", () => {
    console.log("family counter is now online!");
    client.user.setActivity("for user changes...", { type: "WATCHING" }).catch(console.error);
});

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
