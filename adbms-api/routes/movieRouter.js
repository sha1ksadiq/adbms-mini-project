const express = require('express');
const bodyParser = require('body-parser');
const config = require('../helper/config');
let connection = require('mysql2').createPool(config.database);
const movieRouter = express.Router();

movieRouter.use(bodyParser.json());

movieRouter.route('/getMovies').get((req, res, next) => {
    const offset =  Number(req.query.offset);
    const queryType = Number(req.query.query_type); //1 = Rating, 3 = genre
    const query = req.query.query;
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
                sqlquery = `SELECT * FROM movies ORDER BY M_RATING ASC `;
            break;
            
            case 3:
                sqlquery = `SELECT * FROM movies WHERE M_GENRE LIKE ? `;
                fields.push('%'+query+'%');
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
            return res.json({status: 1, data: results.map(obj => {
                obj['num'] = obj['m_id']
                obj['name'] = obj['m_name']
                obj['rating'] = obj['m_rating']
                obj['genre'] = obj['m_genre']
                delete obj['m_id']
                delete obj['m_name']
                delete obj['m_rating']
                delete obj['m_genre']
                return obj
            }), message: "Data fetched successfully"});
        });
    });
});

module.exports = movieRouter;
