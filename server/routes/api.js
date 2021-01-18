var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');
var mongoose = require('mongoose');
const user = require('../models/user');
const tasks = require('../models/tasks');
// const { error } = require('console');
const db = "mongodb+srv://matheusHenrique:159845@cluster0.asfun.mongodb.net/eventsdb?retryWrites=true&w=majority"

mongoose.connect(db, err =>{
  if(err){
    console.error('Error!'+err);
  }else{
    console.log("Connected to mongoDB!");
  }
})

function verifyToken(req,res,next){
  if(!req.headers.authorization){
    return res.status(401).send("Unauthorized request");
  } 
    let token = req.headers.authorization.split(' ')[1];
  if(token === 'null'){
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token,'secretKey');
  if(!payload){
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;
  next();
}

/* GET users listing. */
router.get('/events', function(req, res, next) {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2020-12-26T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2020-12-26T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2020-12-26T18:25:43.511Z"
    }
  ];
  res.json(events);
});

router.get('/special', verifyToken ,function(req, res, next) {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2020-12-26T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2020-12-26T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2020-12-26T18:25:43.511Z"
    }
  ];
  res.json(events);
});

router.get('/mytasks', verifyToken, function(req,res){
    tasks.find({user_id: req.userId},(error,user2)=>{
    if(user2){
      res.send(user2);
     
     }
    if(error){
      res.status(401).send('nothing found');
    }
  })



});

router.post('/register',function(req,res){
  let userData = req.body;
  let user = new User(userData);
  User.findOne({email: userData.email},(error,user1)=>{
    if(user1){
      res.status(401).send("Email already in use!");
      
    }else{
      user.save((error, registeredUser)=>{
        if(error){
          console.log(error);
        }else{
          let payload = { subject: registeredUser._id};
          let token = jwt.sign(payload,'secretKey');
            res.status(200).send({token})
        }
    });
    }
  })
  
});

router.post('/taskcreate', verifyToken ,function(req,res){
 
  req.body.user_id= req.userId;
  req.body.taskStatus = false;
  let taskData = req.body;
  let ok = {
    status:req.body
  }
  let NewTask = new tasks(taskData);
  NewTask.save((error,registeredTask) =>{
    if(error){
      console.log(error);
    }else{
      res.status(200).send(ok);
    }
  })
});

router.post('/taskdelete',verifyToken,function(req,res){
  let id = req.body;
 tasks.findByIdAndDelete(id,function(err){
   if(err){
     res.status(401).send(err)
     console.log(err);
   }else{
     res.status(200).send("DELETADO!")
   }
 } )

});

router.post('/taskupdate',verifyToken,function(req,res){
  let id = req.body._id;
  let status = req.body.status;
  tasks.where({_id: id}).updateOne({taskStatus: !status},function(err){
    if(err){
      res.status(401).send(err);
    }else{
     res.status(200).send({ message: "ALterado!"})
    }
  })
});

router.post('/login',function(req,res){
  let userData = req.body;
  User.findOne({email: userData.email},(error,user)=>{
    if(error){
      console.log(error);
    }else{
      if(!user){
        res.status(401).send('Invalid email!');
      }else{
        if(user.password !== userData.password){
          res.status(401).send("Invalid Password");
        }else{
          let payload = {subject: user._id};
          let token = jwt.sign(payload,'secretKey')
          res.status(200).send({token});
        }
      }
    }
  });

});

module.exports = router;
