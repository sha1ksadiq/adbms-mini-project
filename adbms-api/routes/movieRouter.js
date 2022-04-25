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
            return res.json({status: -1, message: "Something went wrong..."})
        }
        var sqlquery = `SELECT * FROM movies `
        switch(queryType) {
            case 1: 
                sqlquery += `ORDER BY M_RATING DESC `;
            break;
            
            case 2:
                sqlquery += `WHERE M_GENRE = ? `;
            break;
        }
        sqlquery += `LIMIT 50 OFFSET ?; `;
        let fields = [offset];
        tempConnection.query(sqlquery,fields,(error, res, fields)=> {
            tempConnection.release();
            if(error) {
                console.log(error);
                res.statusCode = 200;
                return res.json({status: -1, message: "Something went wrong..."})
            }
            console.log(res);
        });
    });
    // get by rating, ORDER DESC, OFFSET, LIMIT 50
});

movieRouter.route('/getByGenre').get((req, res, next)=> {
                const genreType = req.body.genreType;
                // get by genre type as per req, LIMIT 50
})

module.exports = movieRouter;
