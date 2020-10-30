const express = require('express');
const app = express()
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
var fs = require('fs');

const url = 'mongodb://localhost:27017'
const dbName = "homework4"
const client = new MongoClient(url)

app.get('/', (req,res) => {
    res.sendFile('./public/index.html', {root: __dirname })
})

app.get('/retrieveData', (req,res) => {
    query = req.query.query
    filter = req.query.filter
    const db = client.db(dbName)
    const collection = db.collection('homework4')
    if (query == "AllFields"){
        if (filter.length == 0){
            collection.find().toArray(function(err,class_list){
                if(err) throw err;
                res.json(class_list)
            })
        }
        else{
            collection.find({
            $or: [
                {Subj: filter},
                {CRS: filter},
                {Title: filter},
                {Cmp: filter},
                {Sctn: filter},
                {Days: filter},
                {Start_Time: filter},
                {End_Time: filter},
                {Mtg_Start_Date: filter},
                {Mtg_End_Date: filter},
                {Duration: filter},
                {Instruction_Mode: filter},
                {Building: filter},
                {Room: filter},
                {Instr: filter},
                {Enrl_Cap: filter},
                {Wait_Cap: filter},
                {Cmbnd_Descr: filter},
                {Cmbnd_Enrl_Cap: filter}
            ]
            })
        .toArray(function(err,class_list){
            if(err) throw err;
            res.json(class_list)
            })
        }
    }
    if (query == "Title"){
        collection.find({ Subj:filter }).toArray(function(err,class_list){
            if(err) throw err;
            res.json(class_list)
        })
    }
    if (query == "Class_Number"){
        collection.find({ CRS:filter }).toArray(function(err,class_list){
            console.log(class_list)
            if(err) throw err;
            res.json(class_list)
        })
    }
    if (query == "Day"){
        collection.find({ Days:filter }).toArray(function(err,class_list){
            if(err) throw err;
            res.json(class_list)
        })
    }
    if (query == "Time"){
        collection.find({
            $or: [
                {Start_Time: filter},
                {End_Time: filter}
            ]
        })
        .toArray(function(err,class_list){
            if(err) throw err;
            res.json(class_list)
        })
    }
})

app.get("/schedule", (req,res) =>{
    const db = client.db(dbName)
    const homework4_collection = db.collection('homework4')
    const schedule_collection = db.collection('schedule')
    query = req.query.query
    if (query != undefined){
        homework4_collection.find({ Position:query }).toArray(function(err,class_list){
            schedule_collection.insertMany(class_list, function(err, res) {
                if (err) throw err;
                });
        })
    }
    res.sendFile("./schedule.html", {root: __dirname })
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

