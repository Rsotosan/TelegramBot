function init(){
    const express = require('express');
    const app = express();
    const bodyparser = require('body-parser');
    var request = require('request');
    var info = [];
    app.use(bodyparser.json(), bodyparser.urlencoded({extended:true}));
    app.post('/', async function(req, res){
        console.log('Recibido mensaje: ' + req.body);
        info.push(req.body);
        request({
            url: `https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`,
            method: 'POST',
            json: {
                chat_id: req.body.message.chat.id,
                text: `Dijiste: ${req.body.message.text}`,
                reply_to_message_id: req.body.message.message_id
            }
        });
        return res.sendStatus(200);
    });
    app.get('/', async function(req, res){
        return res.json(info);
    });
    app.listen(8080);
    return app;
}

const app = init();