const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../helper/db_conn');
const auth = require('../helper/authorizeToken');

const movieRouter = express.Router();

movieRouter.use(bodyParser.json());

movieRouter.route('/getByRating').get((req, res, next) => {
                const offset = req.body.offset;
                // get by rating, ORDER DESC, OFFSET, LIMIT 50
});

movieRouter.route('/getByGenre').get((req, res, next)=> {
                const genreType = req.body.genreType;
                // get by genre type as per req, LIMIT 50
})

movieRouter.route('/')
.get(auth.authenticateToken(req, res, next) => {
                
})
