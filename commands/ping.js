module.exports={
  name: 'ping',
  desc: 'Ping',
  execute(msg, args){
    var Main = require('../bot.js');
    Main.Reply(`pong`,msg);
    
  }
}
