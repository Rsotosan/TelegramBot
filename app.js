const request = require('request');
const express = require('express');
function init(){
    const app = express();
    const bodyparser = require('body-parser');
    app.use(bodyparser.json(), bodyparser.urlencoded({extended:true}));
    var info = [];
    var stop = false;
    app.post('/', async function(req, res){
        info.push(req.body);
        info.push('-----');
        if(req.body.message){
            if(req.body.message.text = "/OFF"){
                stop = true;
                sendMessage('Apagando', req.body.message.chat.id);
            }
            if(req.body.message.text = "/ON"){
                stop = false;
                sendMessage('Aquí estoy de nuevo para tocaros las narices con mis mensajes repetitivos :)', req.body.message.chat.id);
            }
        }
        if(!stop){
            if(req.body.new_chat_members){
                var name = req.body.new_chat_members[0].first_name;
                var text =  `Hola amigo ` + name + ', me gustaría saber cual es el animal más maravilloso del mundo, podrías ayudarme?';
                sendMessage(text, req.body.message.chat.id);
            }
            if(req.body.message && !req.body.new_chat_members){
                var name = req.body.message.from.first_name;
                var text =  `Ay amigo ` + name + ', creo que te has equivocado de animal o no se de que me estás hablando. ¿Podrías volver a intentarlo?';
                if(req.body.message.text && req.body.message.text.toLowerCase().indexOf('flamenco') > -1){
                    text = 'Aqui iría el enlace al siguiente grupo';
                }
                sendMessage(text, req.body.message.chat.id, req.body.message.message_id);
            }
        }
        return res.sendStatus(200);
    });
    app.get('/', async function(req, res){
        return res.json(info);
    });
    app.listen(8080);
    return app;
}

var sendMessage = function(text, chat_id, reply){
    var json = {
        chat_id,
        text}
    if(reply){
        json.reply_to_message_id = reply;
    }
    request({
        url: `https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`,
        method: 'POST',
        json
    });
}

const app = init();