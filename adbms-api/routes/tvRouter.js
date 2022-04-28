const express = require('express');
const bodyParser = require('body-parser');
const config = require('../helper/config');
let connection = require('mysql2').createPool(config.database);

const tvRouter = express.Router();

tvRouter.use(bodyParser.json());

tvRouter.route('/getTvShows').get((req, res, next) => {
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
                sqlquery = `SELECT * FROM tv_show ORDER BY TV_RATING DESC `;
            break;

            case 2:
                sqlquery = `SELECT * FROM tv_show ORDER BY TV_RATING ASC `;
            break;
            
            case 3:
                sqlquery = `SELECT * FROM tv_show WHERE TV_GENRE LIKE ? `;
                fields.push("%"+query+"%");
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
                obj['num'] = obj['tv_id']
                obj['name'] = obj['tv_name']
                obj['rating'] = obj['tv_rating']
                obj['genre'] = obj['tv_genre']
                delete obj['tv_id']
                delete obj['tv_name']
                delete obj['tv_rating']
                delete obj['tv_genre']
                return obj
            }), message: "Data fetched successfully"});
        });
    });
});

module.exports = tvRouter;
