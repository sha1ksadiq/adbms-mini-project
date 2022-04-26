const express = require('express');
const bodyParser = require('body-parser');
const config = require('../helper/config');
let connection = require('mysql2').createPool(config.database);

const tvRouter = express.Router();

tvRouter.use(bodyParser.json());

tvRouter.route('/getTvShows').get((req, res, next) => {
    const offset = req.body.offset;
    const queryType = req.body.query_type; //1 = Rating, 3 = genre
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
                sqlquery = `SELECT * FROM tv_show ORDER BY TV_RATING DESC `;
            break;

            case 2:
                sqlquery = `SELECT * FROM tv_show ORDER BY TV_RATING ASC `;
            break;
            
            case 3:
                sqlquery = `SELECT * FROM tv_show WHERE TV_GENRE = ? `;
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

tvRouter.route('/getByGenre').get((req, res, next) => {
                const genreType = req.body.genreType;
                //get by genre type as per request, LIMIT 50
})
