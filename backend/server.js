const express = require('express');
const app = express();
const myLogger = require('./middlewares/logger');
const users = require('./users/users');
const cors = require('cors'); 
const PORT = 8000;

app.use(myLogger);
app.use(express.json())
app.use(express.urlencoded({extended:true})) 
app.use(cors())
app.use("/",users)                                            

app.listen(PORT,()=>{
    console.log(`Listen on Port ${PORT}`);
})