const express = require('express'); 
const {logger} = require('./middleware/logEvents'); 
const PORT = process.env.PORT || 3000; 
const app = express(); 
app.use(express.urlencoded({ extended: true})); 
app.use(express.json()); 
app.use(logger); 

app.get('/', (req, res) => { 
    return res.status(200).json("hello there"); 
}); 

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`)); 
