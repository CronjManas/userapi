const User = require('../Model/User.js');
const Moment = require('moment');
const Newid = require('./Newid.js');

exports.displayAll = (req,res) => {
    User.find()
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({
            error : err
        })
    })
}

exports.create = (req,res) => {

    if(req.body.content){
        return res.status(400).send({
            message:'empty'
        })
    }
    const id = Newid();
    

    // const newUser = new User({
    //     UserId : id,
    //     Name: req.body.name,
    //     Dob: req.body.dob || null,
    //     Gender : req.body.gender || null,
    //     Address : req.body.address || null,
    //     City : req.body.city || null,
    //     Profession : req.body.profession || null 

    // });

    let current = Moment().format('YYYY-MM-DD');
    let CurrentDay = Moment(current);
    let dYear = Moment(req.body.Dob).format('YYYY-MM-DD');
    let dAge = Moment(dYear);
    let Age = Moment.duration(CurrentDay.diff(dAge)).asYears();
    let Age2 = parseInt(Age);

    req.body.Age = Age2;
    req.body.UserId = id;
    const newUser = new User(req.body);
    newUser.save()
    .then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message: err.message
        });
    });
}

exports.display = (req,res) => {
    User.find({UserId:req.params.id})
    .then((data) => {
        if(data.length===0){
            return res.send({
                err:'Cannot find the user'
            })
        }
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });

 
}

exports.edit = (req,res) => {
    // let user = {
    //     Name : req.body.name,
    //     Dob : req.body.dob,
    //     Gender : req.body.gender,
    //     Address : req.body.address,
    //     City : req.body.city,
    //     Profession : req.body.prof
    // }
    let query = {UserId:req.params.id};
    User.updateOne(query,req.body)
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send('cannot update');
    })
}

exports.delete = (req,res) => {
    let query = {UserId:req.params.id}
    User.deleteOne(query)
    .then( (user) =>{
        if(!user){
            return res.send('Not found');
        }
        res.send('Deleted');
    }).catch(err=>{
        res.send('could not delete',err)
    })
}

//filter data

exports.filter = (req,res,next) => {
    
    let Query = {};
    if(req.query.age){
        Query = Object.assign({Age:req.query.age},Query);
    }
    if(req.query.name){
        Query = Object.assign({Name:req.query.name},Query);
    }
    if(req.query.prof){
        Query = Object.assign({Proffession:req.query.prof},Query);
    }
    if(req.query.city){
        Query = Object.assign({City:req.query.city},Query);
    }
    if(req.params.gen){
        Query = Object.assign({Gender:req.query.gen},Query);
    }
    User.find(Query)
    .then(data=>{

        if(data.length ===0){
            return res.status(404).send({
                message : 'Not found Any User'
            })
        }
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message : err
        });
    });   
}