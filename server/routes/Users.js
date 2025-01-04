const express = require('express')
const router = express.Router();
const { Users }  = require('../models')
const bcrypt = require('bcryptjs');
const { where } = require('sequelize');

router.get('/', async(req,res)=>{
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers)
})

router.post('/', async(req,res)=>{
 const  {username,email,password} = req.body
 bcrypt.hash(password,10).then((hash)=>{
    Users.create({
        username:username,
        email:email,
        password:hash,
        
    })
    res.json("successful")
 });
});



router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
     
      const user = await Users.findOne({ where: { username: username } });
  
    
      if (!user) {
        return res.status(404).json({ error: "User Doesn't Exist" });
      }
  
      const match = await bcrypt.compare(password, user.password);
  
      if (!match) {
        return res.status(400).json({ error: "Wrong Username And Password Combination" });
      }
  
      return res.status(200).json({ message: "YOU LOGGED IN" });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server Error" });
    }
  });
  

module.exports = router; 