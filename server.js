const  _ = require("lodash");
const express = require('express');
const morgan = require('morgan');
const incidentRoutes = require('./routes/incidentRoutes');

// require('dotenv').config();


// console.log(process.env.DATABASE);
const app = express();
app.use(express.static(__dirname+'/public'));
// app.use(express.static(__dirname+'/frontend-controllers'));
app.set('view engine','ejs');
app.use(morgan('dev'));
app.listen(3000);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({type:"*/*"}));

app.use((req,res,next)=>{
    res.locals.path = req.path;   
    next();
});

app.get('/', (req, res) => {
    res.redirect('/incidents');
  });

app.use('/incidents',incidentRoutes);

