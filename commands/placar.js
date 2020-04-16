const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  let user = message.author;
  let guild = message.guild;
  
  let embed = new Discord.RichEmbed().setColor([54, 57, 63]).setTimestamp();
  
  embed.setAuthor("LEADERBOARD | " + guild.name, guild.iconURL);
  
  let place = "SEM COLOCAÇÃO";
  
  await db.startsWith(`total_points_`, {
    sort:'.data'
  }).then(async resp => {
    
    resp.length = 15;
    let xp, level;
    
    let a = 1;
    for (var i in resp) {
      let id = resp[i].ID.split('_')[2];
      let total = await db.fetch(`total_points_${id}`);
      level = await db.fetch(`level_${id}`);
      if (level === null) level = 0;
      xp = await db.fetch(`xp_${id}`);
      if (xp === null) xp = 0;
      if (total === null) total = 0;
      let name;
      try {
        name = await client.users.get(id).username;
      } catch (e) {
        name = `${id}`;
      }
      embed.addField(`[${a}] ${name}`, `Level: ${level} [XP: ${xp}]`, false);
      a++;
    }
    
  });
  
  embed.setDescription(`:clipboard: Top 15`);
  message.channel.send(embed);
  
}
module.exports.config = {
    name: "placar",
    description: "Pulls the serverinfo of the guild!",
    usage: "!serverinfo",
    accessableby: "Members",
    aliases: ["scoreboard","ranking"]
}
