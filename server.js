'use strict';

const express = require('express');

const app = express();
app.use(express.static('.'));

app.get('/', function(req, res) {
    res.sendFile('template.html', { root: __dirname });
});

var server = app.listen(3000, function() {
    console.log('server running on port ' + server.address().port);
})