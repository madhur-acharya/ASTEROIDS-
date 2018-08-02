const express = require('express');
const path= require('path');
const sqlite3= require('sqlite3');

var router = express.Router();
var db= new sqlite3.Database('./database/gameScores.db');

router.get('/', function(request, response)
{
	var data= [];
	db.each('SELECT * FROM scores ORDER BY "score" DESC', function(err, rows)
	{
		if(err != null || err != undefined)
			console.log("error: ", err);

		else if(rows)
		{
			data.push({ID: rows.ID, name: rows.name, score: rows.score});
		}
		else
			response.send("<p>culd not parse data!</p>");
	}, function(err, length)
	{
		if(err != null || err != undefined)
			console.log("error: ", err);

		else if(length > 0)
		{
			console.log("query outputs: " + length + "rows");
			response.render('gameScores', {scores: data});
		}
		else
			response.send("<p>culd not parse data!</p>");
	})
});

module.exports= router;