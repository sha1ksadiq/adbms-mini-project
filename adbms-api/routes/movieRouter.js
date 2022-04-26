const express = require('express');
const bodyParser = require('body-parser');
const config = require('../helper/config');
let connection = require('mysql2').createPool(config.database);
const movieRouter = express.Router();

movieRouter.use(bodyParser.json());

movieRouter.route('/getMovies').get((req, res, next) => {
    const offset = req.body.offset;
    const queryType = req.body.query_type; //1 = Rating, 2 = genre
    const query = req.body.query;
    connection.getConnection((error, tempConnection)=>{
        if(error) {
            console.log(error);
            res.statusCode = 200;
            return res.json({status: -1, message: "Something went wrong..."});
        }
        var sqlquery = ``;
        var fields = [];
        switch(queryType) {
            case 1: 
                sqlquery = `SELECT * FROM movies ORDER BY M_RATING DESC `;
            break;
            
            case 2:
                sqlquery = `SELECT * FROM movies WHERE M_GENRE = ? `;
                fields.push(query);
            break;
        }
        sqlquery += `LIMIT 50 OFFSET ?;`;
        fields.push(offset);
        tempConnection.query(sqlquery,fields,(error, results, fields)=> {
            tempConnection.release();
            if(error) {
                console.log(error);
                res.statusCode = 200;
                return res.json({status: -1, message: "Something went wrong..."});
            }
            res.statusCode = 200;
            return res.json({status: 1, data: results, message: "Data fetched successfully"});
        });
    });
});

module.exports = movieRouter;
