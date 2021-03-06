
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var cors = require('cors');
var app = express();
var result={'body': []};
var url = 'mongodb://Sowjanya:Anil_0424@ds139370.mlab.com:39370/asedemo1';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {  res.write("Connecting to Database Failed");
            res.end();  }
        insertDocument(db, req.body, function() {
            res.write("Successfully Updated");
            res.end();       });    });
    var insertDocument = function(db, data, callback) {
        db.collection('users').insertOne( data, function(err, result) {
            if(err)           {
                res.write("Update Failed");
                res.end();           }
            console.log("Registration Successful");

            callback();        });    };})
app.post('/get-data',function (req,res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findUser(db, function() {
            db.close();        });    });
    var findUser = function(db, callback) {
        var cursor =db.collection('tut10').find();
        cursor.toArray(function(err, doc) {
            assert.equal(err, null);
                j=doc;
                JSON.stringify(j);
                doc1=j;
            for (var i=0;i<doc.length;i++) {
                result.body.push({"ID":doc[i]._id,"fname": doc[i].fname,"lname": doc[i].lname,"email": doc[i].email});
            }console.log(result);
            res.contentType('application/json');
            res.write(JSON.stringify(j));
            res.end();        });    };})
app.post('/update',function (req,res) {
    MongoClient.connect(url, function(err, db) {
        if(err)        {
            res.write("Connecting to Database Failed");
            res.end();        }
        updateDocument(db, req.body, function() {
            res.write("Successfully Registered");
            res.end();        });    });
    var id=req.body.id2;
    var item={fname:req.body.fn,lname:req.body.ln,email:req.body.ml};
    var updateDocument = function(db, data, callback) {
        db.collection('users').updateOne({"_id":ObjectId(id)},{$set:item}, function(err, result) {
            if(err)            {
                res.write("Registration Failed");
                res.end();            }
            console.log("Updated Record");
            callback();        });    };})
app.post('/delete', function(req, res) {
    var id = req.body.id1;
    MongoClient.connect(url, function(err, db) {
        if(err)        {
            res.write("Registration Failed");
            res.end();        }
        db.collection('users').deleteOne({"_id": ObjectId(id)}, function(err, result) {
            res.write("Successfully Deleted");
            res.end();
            console.log('Item deleted');        });});});
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application Running at http://%s:%s", host, port) })