const Discord = require('discord.js');
const fs = require('fs');
const { token,prefix } = require('./config.json');
var funnyvideo=require('./funnyvideo.json');
var rn;
var commandsList= new Array();
const cooldowns = new Discord.Collection();
const client = new Discord.Client();
client.author

async function LoadCommands(){
  console.log("[►]Loading Commands!")
  client.commands = new Discord.Collection();
  const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
  for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    commandsList.push(command.name);
  }
}
async function LoadModules(){
  /// todo
return LoadCommands()
.then(()=>{console.log(`[√] `+commandsList.length+" Commands Loaded!:\n"+stringify(commandsList));return(true)})
.catch((err)=>{console.log(`[‼] Commands Module not loaded!:\n`+err.toString());return(false)});
}
async function Initialize(){
console.log(`[i] === Initializing Modules === [i]`);
let Modules = await LoadModules();
  if(Modules){
    client.login(token);
    return true
  }else{
    client.destroy()
    return false
  }

}
function TIMETAKEN(rn){
  var rn = process.hrtime(rn);
  return (`\n\`\`\`(${((end[0] * 1e9 + end[1])*1e-6).toFixed(5)}ms) /backend \`\`\``);
}
function stringify(arg){
  return JSON.stringify(arg,0,2).replace(/{|},|}/g, "").replace(/\[|\]|"/g, '');
}
var LOGHANDLER = (type,msg,args)=>{
  switch(type){
  case ('cmd'):
    console.log("--------\n[CMD] "+msg.guild.available+"/"+msg.guild.name+"/"+msg.channel.name+"/"+msg.author.tag+"/"+args);
    break;
  case ('msg'):
    console.log("[MSG] "+msg.guild.available+"/"+msg.guild.name+"/"+msg.channel.name+"/"+msg.author.tag);
    break;
  case ('edit'):
    console.log("[MESSAGE EDITED] "+msg.guild.name+"/"+msg.channel.name);
    break;
  case ('msgerr'):
    console.log("[MSG_ERR] "+msg.guild.available+"/"+msg.guild.name+"/"+msg.channel.name+"/"+msg.author.tag);
  }
}
var Reply= (message,msg,condition,extra)=>{
  message = message+TIMETAKEN(rn)
  if (condition=='edit'){return msg.edit(message), LOGHANDLER('msg',msg);}
  else if (condition=='error'){return msg.edit(message).catch(()=>msg.reply(message)),LOGHANDLER('msgerr',extra); }
  else {return (msg.reply(message), LOGHANDLER('msg',msg));}
} 
client.on('ready', () => {
    console.log(`[√]Successfully Logged in:\n${client.user.tag}`);
    //console.log('Funnyvideo:\n'+stringify(funnyvideo.videos)+"\n"+stringify(funnyvideo.whitelist));
    client.user.setActivity('(d/) selfhood code himself',{
      type: 3,
      status: 'idle'
    });
});
client.on('message', msg => {
if(!msg.content.startsWith(prefix)||msg.author.bot)return;
  rn = process.hrtime();

  const arg = msg.content.slice(prefix.length).split(/ +/);
  const commands = arg.shift().toLowerCase();
  LOGHANDLER('cmd',msg,commands);
  switch (commands){
    case ('help'):
      client.commands.get('help').execute(msg,commands);
      break;
    case ('ping'):
      client.commands.get('ping').execute(msg,commands);
      break;
    case ('roblox'):
      client.commands.get('roblox').execute(msg,arg,commands);
      break;
    case ('funnyvideo'):
      client.commands.get('funnyvideo').execute(msg,arg,commands,funnyvideo);
      break;
    default:
      Reply('```'+stringify(commandsList)+'\n Bot coded by selfhood(dante#2406) w/ node.js```',msg);
  }
});
client.on('messageUpdate', (oldmsg,newmsg)=>{
  
  if(oldmsg.author.id!=client.user.id){return;}
  console.log("++++++\n[EDITED] "+newmsg.guild.name+"/"+newmsg.channel.name+"/"+newmsg.author.tag)
});
module.exports={
  LOGHANDLER:LOGHANDLER,
  Reply:Reply
}

Initialize();