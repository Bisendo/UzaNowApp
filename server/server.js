const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:3000", // React app domain
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));

const db = require('./models')


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routers

const userRouter = require('./routes/Users')
app.use('/auth',userRouter);


const productRouter = require('./routes/Products');
app.use('/products',productRouter);

const sellerRouter = require('./routes/Sellers');
app.use('/sellers',sellerRouter);

const servicesRouter = require('./routes/Services')
app.use('/services',servicesRouter);


db.sequelize.sync().then(() =>{
    app.listen(4001,()=>{
        console.log('The Application is running on port 4001')
    })
})
