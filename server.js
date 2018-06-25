// Je me suis arreté sur le req.body qui ne fonctionne pas.

const express = require('express');
const app = express();
const pug = require('pug');
const sqlite3 = require('sqlite3').verbose();
const bodyparser = require('body-parser');

//Utilisation de body-parser par le serveur
app.use(bodyparser.urlencoded({
    extended: false
}));
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

let countof=[];
let lb=[];
db.serialize(() => {
    db.each(sql, (err, row) => {
        if (err) {
            console.error(err.message);
        }
      console.log(row.name + "\t" + row.author + "\t" + row.av),
      lb.push(row.name + " de " + row.author + " disponibilité: " + row.av),
      countof.push(row.av);
      console.log('countof c ca: '+ countof)      
    });
});

console.log('count c encore ca ' + countof[0]);

let bcount = 'SELECT bookCount FROM book WHERE bookID = ' + countof[0] + ';';
console.log('bcount c est ca : ' + bcount);

let changeCount = `UPDATE book
            SET bookCount = ?
            WHERE name = ?`;
/*s
db.run(sql, data, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Row(s) updated: ${this.changes}`);
 
});*/

// Route racine
app.get('/', (req,res) =>{
    res.render('index', {title:'Media', listbook:lb, nb:countof})
})

// Routes
app.get('/resa',(req,res)=>{
    console.log('le body parser: ' + req.body.bs),
    res.send('La RESA')
    
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