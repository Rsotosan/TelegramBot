function init(){
    const express = require('express');
    const app = express();
    app.get('/', async function(req, res){
        return res.json({ 'test': 'test'});
    });
    app.listen(9000);
    return app;
}

const app = init();