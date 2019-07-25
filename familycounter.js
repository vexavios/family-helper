const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.CLIENT_TOKEN);

client.on("ready", () => {
    console.log("family counter is now online!");
});

client.on("guildMemberAdd", member => {
    let saccharine = client.guilds.find(g => g.id === "538114152716173312");
    let count_channel = saccharine.channels.find(c => c.id === "595309464605819033");
    let new_count = saccharine.members.filter(m => !m.user.bot).size;

    count_channel.edit({ name: `・family members: ${new_count}!` }).catch(console.error);
});

client.on("guildMemberRemove", member => {
    let saccharine = client.guilds.find(g => g.id === "538114152716173312");
    let count_channel = saccharine.channels.find(c => c.id === "595309464605819033");
    let new_count = saccharine.members.filter(m => !m.user.bot).size;

    count_channel.edit({ name: `・family members: ${new_count}!` }).catch(console.error);
});
