const express = require('express');
const path= require('path');
const bodyParser= require('body-parser');
const sqlite3= require('sqlite3');

var router = express.Router();
var JSON_parser= bodyParser.json();
var db= new sqlite3.Database('./database/gameScores.db');

router.get('/', function(request, response)
{
	response.sendFile(path.join(process.cwd() + '/public/ASTEROIDS/game.html'));
});

router.post('/', JSON_parser, function(request, response)
{
	db.run('INSERT INTO scores (name, score) VALUES (?, ?)', [request.body.name, request.body.score], function(err, result)
	{
		if(err != null || err != undefined)
			console.log("error: ", err);
		else
			console.log(request.body.name + ": " + request.body.score + "  added sucessfully!");

		db.all('SELECT * FROM scores ORDER BY "score" DESC LIMIT 1', function(err, rows)
		{
			if(err != null || err != undefined)
				console.log("error: ", err);
			else
				response.send(rows[0]);
		});
	});
});


module.exports= router;