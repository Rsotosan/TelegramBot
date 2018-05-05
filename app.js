const request = require('request');
const express = require('express');
function init(){
    const app = express();
    const bodyparser = require('body-parser');
    app.use(bodyparser.json(), bodyparser.urlencoded({extended:true}));
    app.post('/', async function(req, res){
        if(req.body.message){
            var name = req.body.message.from.first_name;
            var text =  `Ay amigo, ` + name + ' creo que te has equivocado de animal o no se de que me estás hablando. ¿Podrías volver a intentarlo?';
            if(req.body.message.text && req.body.message.text.toLowerCase().indexOf('flamenco') > -1){
                text = 'Aqui iría el enlace al siguiente grupo';
            }
            sendMessage(text, req.body.message.chat.id, req.body.message.message_id);
        }
        if(req.body.new_chat_members){
            var name = req.body.new_chat_members.first_name;
            var text =  `Hola amigo ` + name + ' ,me gustaría saber cual es el animal más maravilloso del mundo, podrías ayudarme?';
            sendMessage(text, req.body.message.chat.id);
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