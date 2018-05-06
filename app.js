const request = require('request');
const express = require('express');
require('dotenv').config();
function init(){
    const app = express();
    const bodyparser = require('body-parser');
    app.use(bodyparser.json(), bodyparser.urlencoded({extended:true}));
    var info = [];
    var stop = false;
    var text = 'Para configurarme enviar /frase seguido de la frase que quieras que repita como un mono';
    app.post('/', async function(req, res){
        info.push(req.body);
        info.push('-----');
        if(req.body.message){
            if(req.body.message.text === "/OFF"){
                stop = true;
                sendMessage('Apagando', req.body.message.chat.id);
                return res.sendStatus(200);
            }
            if(req.body.message.text === "/ON"){
                stop = false;
                sendMessage('Aquí estoy de nuevo para tocaros las narices con mis mensajes repetitivos :)', req.body.message.chat.id);
                return res.sendStatus(200);
            }
        }
        if(!stop){
            if(req.body.message && !req.body.new_chat_members){
                if(req.body.message.text && req.body.message.text.toLowerCase().indexOf('/frase') > -1){
                    text = req.body.message.text.replace('/frase ', '');    
                    return res.sendStatus(200);
                }
            }
            if(req.body.message && req.body.message.text){
                var name = req.body.message.from.first_name;
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
    }).on('response', function(response){
        sendSticker('CAADBAADSAADU9S8BcnOFkhyJiQfAg', chat_id);
    });;
}

var sendSticker = function(sticker_id, chat_id){
    var json = {
        chat_id,
        sticker: sticker_id}
    request({
        url: `https://api.telegram.org/bot${process.env.TOKEN}/sendSticker`,
        method: 'POST',
        json
    });
}

const app = init();