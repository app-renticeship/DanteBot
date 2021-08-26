const https = require('https');


var WEBHANDLER = (type,username,callback,noLog)=>{
    let path='';
    let host='';
    if (type=='user'){
    host='api.roblox.com';
    path=`/users/get-by-username?username=${username}`;
    WEBREQ((stream)=>{
        if(!noLog){console.log("[WEBHNDLR] GET user "+username);}
        if(stream==undefined||null){return callback(null)}else{
        callback(stream)
        }
    },host,path)
    }
    else if (type=='userplaces'){
    try{
        WEBHANDLER('user',username,(stream)=>{
            if(stream==undefined||null){return callback(null)}
            host='www.roblox.com';
            path=`/users/profile/playergames-json?userId=`+stream.Id;
            WEBREQ((stream)=>{        
            console.log("[WEBHNDLR] GET userplaces "+username);
            stream = stream.Games;
            return(callback(stream))
            
            },host,path)
            },true);
        }catch(err){
            return callback(err)
        }
    }
}
var WEBREQ = (callback,host,path)=>{
    let data=``;
    let options = 
    {
        host:host,
        path:path,
        method: 'GET'
    };
    try{
        https.request(options).on('response',(response)=>{
            response.on('data', (chunk) =>{data +=chunk;});
            response.on('end', ()=>{
            try{
            callback(JSON.parse(data));}
            catch(err){callback(err)}
            });
        }).end();
        
    }
    catch(error){
        callback(error)
    }


}

module.exports={
WEBHANDLER:WEBHANDLER,
WEBREQ:WEBREQ
};
  