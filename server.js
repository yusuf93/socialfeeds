var express = require('express');
var app = express();
app.use(express.static('./angularjs'));
app.listen(8000);
