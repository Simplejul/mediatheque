const express = require('express');
const app = express();
const pug = require('pug');
const sqlite3 = require('sqlite3').verbose();
const bodyparser = require('body-parser');


// Connexion a la BDD
let db = new sqlite3.Database('./media', sqlite3.OPEN_READWRITE, (err) =>{   
    if (err) {
    return console.error(err.message);
    }
  console.log('Connected to the "media" SQlite3 database.')
});

// Definittion de la requete
let sql = `SELECT name, author, bookCount as av
            FROM book`;

let lb=[];
db.serialize(() => {
    db.each(sql, (err, row) => {
        if (err) {
            console.error(err.message);
        }
      console.log(row.name + "\t" + row.author + "\t" + row.av),
      lb.push(row.name + " de " + row.author + " disponibilité: " + row.av);
    });
});
   


// Route racine
app.get('/', (req,res) =>{
    res.render('index', {title:'Media', book: 'ok', listbook:lb})
})

db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });

// Moteur de template
app.set('view engine', 'pug');

// Ecoute du server
app.listen(3000, () =>
    console.log('Server Ready!')
);