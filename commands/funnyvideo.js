module.exports={
  name: 'funnyvideo',
  desc: 'Funny videos',
  execute(msg,args,funnyvideo){
      if(!args.length){
        console.log(funnyvideo.videos+funnyvideo.whitelist);
       
      };

  }
}
