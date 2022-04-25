const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../helper/db_conn');
const auth = require('../helper/authorizeToken');

const tvRouter = express.Router();

tvRouter.use(bodyParser.json());

tvRouter.route('/getByRating').get((req, res, next) => {
                const offset = req.body.offset;
                // get by rating, ORDER DESC, OFFSET, LIMIT 50
});

tvRouter.route('/getByGenre').get((req, res, next) => {
                const genreType = req.body.genreType;
                //get by genre type as per request, LIMIT 50
})
