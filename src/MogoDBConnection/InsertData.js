/**
 * Created by mnpw3d on 20/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://Sowjanya:Anil_0424@ds139370.mlab.com:39370/asedemo1';
var insertDocument = function(db, callback) {
    db.collection('demoase').insertOne( {
        "fname" : "Pranathi",
        "lname" : "Reddy",
        "address":{
            "city":"Kansas City",
            "state":"MO"
        },
        "education" : {
            "university":"UMKC",
            "degree":"Master of Science",
            "major":"Computer Science"
        },
        "mail":"pg5y7@gmail.com"
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the demoase collection.");
        callback();
    });
};
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, function() {
        db.close();
    });
});