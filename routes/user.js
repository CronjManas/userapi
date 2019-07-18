module.exports  = (app) =>{
    const user = require('../controller/user.js');
    app.post('/user',user.create);
    app.get('/user',user.displayAll)
    app.get('/user/:id',user.display);
    app.post('/edit/:id',user.edit);
    app.post('/delete/:id',user.delete);
    app.get('/filter',user.filter)
}