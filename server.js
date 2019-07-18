const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./support/db.js');
const mongoose = require('mongoose');



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.url,{useNewUrlParser:true})
.then(()=>{console.log('connected to database')})
.catch(err => {
    console.log('could not connect to database');
    
})
require('./routes/user.js')(app);
app.listen(3000,()=>{
    console.log("Server is listening to port 3000");
    
});