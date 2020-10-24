const express = require('express');
const app = express()
const mysql = require('mysql');
const path = require('path');
const indexRouter = require('./index.js')
var fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "pass4root",
    database: "homework4",
    port: "3306"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

con.query("SELECT * FROM homework4", (err, results) => {
    if (err) throw err;
    // fs.writeFile('classes.json', JSON.stringify(results), function (err){
    //     if (err) throw err;
    //     con.end();
    // })
})

// Set Static Folder
app.use(express.static(path.join(__dirname, './public')))

app.use('/', indexRouter);

port = process.env.PORT || 3000
app.listen(port, () => { 
    console.log('server started!')
});



