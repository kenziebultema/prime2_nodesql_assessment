var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var index = require('./routes/index.js');

var app = express();

var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', index);

var connectionString = 'postgres://localhost:5432/animal_tracker';

pg.connect(connectionString, function(err, client, done){
    if(err){
        console.log('error connecting', err);
    } else {
        var query = client.query('CREATE TABLE IF NOT EXISTS animals ('
                                + 'id SERIAL PRIMARY KEY,'
                                + 'type varchar(250),'
                                + 'number int);');

        query.on('end', function(){
            console.log('success created schema');
            done();
        });
        query.on('error', function(){
            console.log('error creating schema');
            done();
        });
    }
});

app.listen(port, function(){
    console.log('listening on port', port);
});

module.exports = app;
