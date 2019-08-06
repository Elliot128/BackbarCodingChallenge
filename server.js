const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000

app.get('/', function(req, res) {
    console.log('Get /')
});

app.listen(port, function(){
    console.log(`Nodejs listening on port ${port}`);
    console.log(`Nodejs version ${process.version}`)
});