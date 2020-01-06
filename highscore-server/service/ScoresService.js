"use strict";

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

const dbName = "hof";
const playerCollection = "players";

/**
 * create a new score
 *
 * score Score
 * no response value expected for this operation
 **/
exports.createScore = function (score) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      dbo.collection(playerCollection).insertOne(score, function (err, res) {
        if (err) throw err;
        console.log("createScore: ", res.ops[0]);
        db.close();
        resolve(res.ops[0]);
      });
    });
  });
};

/**
 * return a list of scores
 *
 * $skip BigDecimal  (optional)
 * $top BigDecimal  (optional)
 * returns List
 **/
exports.findScores = function ($skip, $top) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      dbo
        .collection(playerCollection)
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          console.log("findScores: ", result);
          db.close();
          resolve(result);
        });
    });
  });
};

/**
 * get an existing score
 *
 * id String
 * returns Score
 **/
exports.getScore = function (id) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      dbo.collection(playerCollection).findOne({}, function (err, result) {
        if (err) throw err;
        console.log("getScore: ", result);
        db.close();
        resolve(result);
      });
    });
  });
};

/**
 * remove an existing score
 *
 * id String
 * no response value expected for this operation
 **/
exports.removeScore = function (id) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      var myquery = {
        _id: new mongodb.ObjectID(id)
      };
      dbo.collection(playerCollection).deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 player deleted", obj.result);
        resolve(obj);
        db.close();
      });
    });
  });
};

/**
 * update an existing score
 *
 * id String
 * score Score
 * no response value expected for this operation
 **/
exports.updateScore = function (id, score) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      var myquery = {
        id
      };
      var newvalues = {
        $set: score
      };
      dbo
        .collection(playerCollection)
        .updateOne(myquery, newvalues, function (err, res) {
          if (err) throw err;
          console.log("1 player updated. ", res);
          db.close();
          resolve(res);
        });
    });
  });
};