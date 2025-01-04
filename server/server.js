const express = require('express')
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const db = require('./models')

// Routers

const userRouter = require('./routes/Users')
app.use('/auth',userRouter);


db.sequelize.sync().then(() =>{
    app.listen(4001,()=>{
        console.log('The Application is running on port 4001')
    })
})

