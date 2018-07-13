'use strict';

const express = require('express');
const fs = require('fs');
const lzstring = require('./lzw');

const app = express();

app.get('/', function(req, res) {
    res.send('Hello world');
});

app.get('/:app', function(req, res) {
    fs.readFile('host/' + req.params.app + '.html', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(lzstring.decompressFromBase64(data));
        }
    })
});

var server = app.listen(3000, function() {
    console.log('server running on port ' + server.address().port);
})