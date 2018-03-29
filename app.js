function init(){
    const express = require('express');
    const app = express();
    const bodyparser = require('body-parser');
    var info = [];
    app.use(bodyparser.json(), bodyparser.urlencoded({extended:true}));
    app.post('/', async function(req, res){
        info.push(req.body);
        return res.sendStatus(200);
    });
    app.get('/', async function(req, res){
        return res.json(info);
    });
    app.listen(8080);
    return app;
}

const app = init();