const User = require('../Model/User.js');
const Moment = require('moment');
const Newid = require('./Newid.js');

exports.displayAll = (req,res) => {
    User.find()
    .then(data=>{
        res.send(data)
    }).catch(err=>{
        res.send({
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

    const newUser = new User({
        UserId : id,
        Name: req.body.name,
        Dob: req.body.dob || null,
        Gender : req.body.gender || null,
        Address : req.body.address || null,
        City : req.body.city || null,
        Profession : req.body.profession || null 

    });
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
    let user = {
        Name : req.body.name,
        Dob : req.body.dob,
        Gender : req.body.gender,
        Address : req.body.address,
        City : req.body.city,
        Profession : req.body.prof
    }
    let query = {UserId:req.params.id};
    User.updateOne(query,user)
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
    let userData = [];
    let usersFilter = [];
    
        User.find().select('Dob UserId City Name Gender Profession')
        .then(data => {
            //Filter by age
            if(req.query.age){
                let current = Moment().format('YYYY-MM-DD');
                let CurrentDay = Moment(current);
                data.forEach(( d ) => {
                    let dYear = Moment(d.Dob).format('YYYY-MM-DD');
                    let dAge = Moment(dYear);

                    let Age = Moment.duration(CurrentDay.diff(dAge)).asYears();
                    let Age2 = parseInt(Age);
                    if(Age2 <= parseInt(req.query.age) ){
                        userData.push(d);
                    }

                });
                usersFilter = [...userData];
            }
            userData = [];
            //Filter by gender
            if(req.query.gen){
                usersFilter.forEach((user)=>{
                    if( user.Gender === req.query.gen ){
                        userData.push(user);
                    }

                });
                usersFilter = [...userData];
            }
            userData = [];
            if(req.query.city){
                usersFilter.forEach((user)=>{
                    if( user.City === req.query.city){
                        userData.push(user);
                    }
                });
                usersFilter = [...userData];
            }
            userData = [];
            if(req.query.prof){
                usersFilter.forEach((user)=>{
                    if( user.Profession === req.query.prof){
                        userData.push(user);
                    }
                });
                usersFilter = [...userData];
            }
            userData = [];
            if(req.query.name){
                usersFilter.forEach((user)=>{
                    if( user.Name === req.query.name){
                        userData.push(user);
                    }
                });
                usersFilter = [...userData];
            }
            userData = [];
            
            if(usersFilter.length === 0 ){
                return res.status(500).send({
                    message:"No filtering result found"
                });
            }else{
                return res.send(usersFilter);
            }
            
            
            // if(usersAge.length!==0){
            //     res.send(usersAge);
            // }
        }).catch(err=>{
            
            res.send({
                error: err
            })
        });
    
    
    

   
    
}