const express = require('express'); 
const mongoose = require('mongoose'); 
const connectDB = require('./config/dbConnection'); 
const {logger} = require('./middleware/logEvents'); 
const PORT = process.env.PORT || 3000; 

connectDB(); 

const app = express(); 

app.use(express.urlencoded({ extended: true})); 
app.use(express.json()); 
app.use(logger); 

app.get('/', (req, res) => { 
    return res.status(200).json("hello there"); 
}); 
app.post('/register', require('./controllers/registerController').handleNewUser); 
mongoose.connection.once('open', () => { 
    console.log('connected to mongodb'); 
    app.listen(PORT, () => console.log(`server is running on port: ${PORT}`)); 
}); 
