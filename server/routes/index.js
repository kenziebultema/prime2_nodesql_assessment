var express = require("express");
var router = express.Router();
var path = require("path");
var pg = require('pg');
var randomNumber = require('../public/assets/modules/randomNumber.js');

var connectionString = 'postgres://localhost:5432/animal_tracker';


router.post('/animals', function(req, res){
    console.log('body', req.body);
    var type = req.body.type;
    var number = randomNumber(1, 100);

    pg.connect(connectionString, function(err, client, done){
        if(err){
            console.log('error post', err);
            done();
        } else {
            var result = [];
            var query = client.query('INSERT INTO animals (type, number) VALUES ($1, $2) RETURNING id, type, number', [type, number]);

            query.on('row', function(row){
                result.push(row);
            });

            query.on('end', function(){
                done();
                res.send(result);
            });

            query.on('error', function(error){
                console.log('error query post', error);
                done();
                res.status(500).send(error);
            });
        }
    });
});

router.get('/animals', function(req, res){
    pg.connect(connectionString, function(err, client, done){
        if(err){
            console.log('error get', err);
            done();
            res.status(500).send(err);
        } else {
            var result = [];
            var query = client.query('SELECT * FROM animals');

            query.on('row', function(row){
                result.push(row);
            });

            query.on('end', function(){
                done();
                res.send(result);
            });

            query.on('error', function(error){
                console.log('error query get', error);
                done();
                res.status(500).send(error);
            });
        }
    });
});

router.get('/*', function(req, res){
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, '../public/', file));
});

module.exports = router;
