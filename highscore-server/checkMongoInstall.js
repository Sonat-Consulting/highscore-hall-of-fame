var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/hof";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("MongoDb not available!");
    db.close();
});