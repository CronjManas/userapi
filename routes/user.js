module.exports  = (app) =>{
    const user = require('../controller/user.js');
    app.post('/api/user/create',user.create);
    app.get('/api/user/listAll',user.displayAll)
    app.get('/api/user/list/:id',user.display);
    app.post('/api/user/edit/:id',user.edit);
    app.post('/api/user/delete/:id',user.delete);
    app.get('/api/user/filter',user.filter)
}