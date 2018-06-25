const express = require('express');
const app = express();
const pug = require('pug');
const sqlite3 = require('sqlite3').verbose();


// Base de Données
let db = new sqlite3.Database('./media', sqlite3.OPEN_READWRITE, (err) =>{   
    if (err) {
    return console.error(err.message);
    }
  console.log('Connected to the "media" SQlite3 database.')
});

let sql = `SELECT bookID as id, name
            FROM book`;

db.serialize(() => {
    db.all(sql, (err, row) => {
        if (err) {
        console.error(err.message);
        } else {
            console.log("Pas de données")
        }
      console.log(row.id + "\t" + row.name)
    });
});
   


// Route racine
app.get('/', (req,res) =>{
    res.render('index', {title:'Media', book: 'ok', listbook:sql})
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