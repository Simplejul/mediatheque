const express = require('express');
const app = express();
const pug = require('pug');


// Route racine
app.get('/', (req,res) =>{
    res.render('index', {title:'Media', message:'hello world!'})
})

// Moteur de template
app.set('view engine', 'pug');

// Ecoute du server
app.listen(3000, () =>
    console.log('Server Ready!')
);