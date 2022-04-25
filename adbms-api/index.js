const express = require('express');

var movieRouter = require('./routes/movieRouter');
const bodyParser = require('body-parser');

const app = express();

//app.use(logger('dev'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.use('/api/movies', movieRouter);

app.listen(3000, () => {
    console.log("Starting Server on PORT 3000");
});