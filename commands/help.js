module.exports={
  name: 'help',
  desc: 'Help',
  execute(msg, args){
    var main = require('../bot.js');
    main.Reply('\`\`\`Bot coded by selfhood(dante#2406) in node.js\`\`\`',msg);
   
  }
}
