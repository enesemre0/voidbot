const Discord = require("discord.js");
const ms = require("ms");
const client = new Discord.Client();
const db = require("quick.db");
exports.run = async (receivedMessage,  msg, args) => {
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
        if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("Bu komudu kullanabilmek için `Ban` yetkisine sahip olmanız gerek.");
 if (user.hasPermission("BAN_MEMBERS")) return msg.channel.send(`Hata! \`${user.tag}\` isimli kullanıcı bu sunucuda yetkili.`) 
let log = await db.fetch(`mlog_${msg.guild.id}`) 
  if (!log) return msg.channel.send("Ayarlı Bir Mute Log Kanalı Yok! Ayarlamak için \`-mute-log #kanal\` !")  
var mod = msg.author
var reason = args[1]
 let sebep = args.slice(2).join(' ')

  if (!user) return msg.reply('<a:hayirgif:787990150331760641> Kullanıcı Etiketlemedin')
 if (!reason) return msg.reply('<a:hayirgif:787990150331760641> Süre Belirtmedin! Seçeneklerin : 1sn/1dk/1s/1g/1h')
if (!sebep) return msg.reply('<a:hayirgif:787990150331760641> Sebep Belirtmedin!')

 
 
  let mute = msg.guild.roles.find(r => r.name === "Muted");
          
  let mutetime = args[1]
if(!mute){
      mute = await msg.guild.createRole({
        name: "Muted",
        color: "#818386",
        permissions:[]
      })
      msg.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(mute, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
  
    }
  
  
  await(user.addRole(mute.id));
msg.channel.send(``)
  let mutezaman = args[1]
.replace(`g`," Gün")
.replace(`sn`," Saniye")
.replace(`s`," Saat")
.replace(`dk`," Dakika")
.replace(`h`," Hafta")
.replace(`gün`," Gün")
.replace(`saniye`," Saniye")
.replace(`saat`," Saat")
.replace(`dakika`," Dakika")
.replace(`hafta`," Hafta")
  msg.channel.send(`${user} Adlı Kişi , ${mutezaman} Susturuldu! Sunucudan Çıkarsa Bile Mutesi Devam edecek!`)
db.set(`muteli_${msg.guild.id + user.id}`, 'muteli')
db.set(`süre_${msg.mentions.users.first().id + msg.guild.id}`, mutetime)
                         
  const muteembed = new Discord.RichEmbed()
     	.setTitle('Ceza: Susturma')
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
      .addField('Moderatör', `${mod}`,true)
      .addField('Sebep', `\`${sebep}\``,true)
      .addField('Kullanıcı', `<@${user.id}>`,true)
      .addField('Süre',`\`${mutezaman}\``)
  . setColor("RANDOM") 
msg.guild.channels.get(log).sendEmbed(muteembed)

  setTimeout(function(){
db.delete(`muteli_${msg.guild.id + user.id}`)
    user.removeRole(mute.id)
 msg.channel.send(`<@${user.id}> Muten açıldı.`)
  }, ms(mutetime));

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sustur"],
  permLevel: 0
};

exports.help = {
  name: "mute",
  description: "",
  usage: ""
};