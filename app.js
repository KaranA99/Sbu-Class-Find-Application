const express = require('express');
const app = express()
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
var fs = require('fs');

const url = 'mongodb://localhost:27017'
const dbName = "homework4"
const client = new MongoClient(url)

//app.set('view engine', 'ejs')

app.get('/', (req,res) => {
    // const db = client.db(dbName)
    // const collection = db.collection('homework4')
    // collection.find({}).toArray(function(err,class_list){
    //     if(err) throw err;
    //     res.render('index', {'classes' : class_list})
    // })
    res.sendFile('./public/index.html', {root: __dirname })
})

app.get('/retrieveData', (req,res) => {
    query = req.query.query
    filter = req.query.filter
    const db = client.db(dbName)
    const collection = db.collection('homework4')
    if (query == "AllFields"){
        collection.find({}).toArray(function(err,class_list){
            if(err) throw err;
            res.json(class_list)
        })
    }
    if (query == "Subject"){
        collection.find({ Subj:filter }).toArray(function(err,class_list){
            if(err) throw err;
            res.json(class_list)
        })
    }
    if (query == "Title"){
        filter = parseInt(filter)
        collection.find({ CRS:filter }).toArray(function(err,class_list){
            if(err) throw err;
            res.json(class_list)
        })
    }
    if (query == "Instructor"){
        collection.find({ Instr:filter }).toArray(function(err,class_list){
            if(err) throw err;
            res.json(class_list)
        })
    }
    if (query == "Course"){
        filter = filter.split(" ").join("")
        course = filter[0] + filter[1] + filter[2]
        title = filter[3] + filter[4] + filter[5]
        title = parseInt(title)
        collection.find({
            $and: [
                {Subj: course},
                {CRS: title}
            ]
        })
        .toArray(function(err,class_list){
            if(err) throw err;
            res.json(class_list)
        })
    }
})

// Set Static Folder
app.use(express.static(path.join(__dirname, './public')))


client.connect(function (err) {
    
    if(err) throw err;

    port = process.env.PORT || 3000
    app.listen(port, () => { 
        console.log(`Server started`)
    });
     //Write databse Insert/Update/Query code here..
                
});

