
module.exports={
  name: 'roblox',
  desc: 'Roblox-related commands',
  arguments: 'user/userplaces <username>',
  execute(msg,arg){
    const Web = require('../Webhandler.js');
    const Main = require('../bot.js');
    if (!arg.length){return Main.Reply('**Where are your arguments? dumbass fr**\n```usage: d/roblox '+this.arguments+'```',msg)}
    if (arg[0]==='user'){
      if (arg[1]!=""||null||typeof arg[1]==String){
        
        Web.WEBHANDLER(arg[0],arg[1], (response)=>{
          try{
            if (response.Id==undefined){throw error()}
            Main.Reply("\n"+'ID: '+response.Id+"\n"+'Username: '+response.Username+"\n"+'Online: '+response.IsOnline,msg);}
          catch(err){Main.Reply(`\nRoblox API error [user]\n:x::x::x:`,msg,'error',msg)}
        });
      }
      }else if (arg[0]==='userplaces'){
        if (arg[1]!=""||null||typeof arg[1]==String){
          let ogMsg = msg //original message
          msg.channel.send(`${ogMsg.author} \n`+'PROCESSING...:eyes::clock12:').then((ms)=>{
          Main.LOGHANDLER('msg',ogMsg);
          Web.WEBHANDLER(arg[0],arg[1],(response)=>{
            let payload = "";
            try{
              for(const element of response ) {
               payload = payload +`Creator: ${element.CreatorName}\nName: ${element.Name}\nPlaceID: ${element.PlaceID}\nDesc: ${element.Description}`+"\n";
              }
              return (Main.Reply(`${ogMsg.author}\n`+payload,ms,'edit',ogMsg));
            }catch(err){Main.Reply(`${ogMsg.author}\nRoblox API error [userplaces]\n:x::x::x:`,ms,'error',ogMsg)}
             
          })
        })
        }
      } else {return Main.Reply('Wrong arguments retard\n```usage: d/roblox '+this.arguments+'```',msg) }
  }
};
