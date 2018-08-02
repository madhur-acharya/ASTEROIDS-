const express= require('express');
const exp_handlebars= require('express-handlebars');
var app= new express();
var path= require('path');

app.use(express.static('public'));
//view engine---------------------------------------------------------------------------------------------
app.set('views', path.join(process.cwd(), '/views'));
app.engine('handlebars', exp_handlebars({defaultLayout: 'default_layout'}));
app.set('view engine', 'handlebars');

//routes-----------------------------------------------------------------------------------------------------
app.get('/', function(request, response)
{
	response.sendFile(path.join(__dirname, '/public/main/main.html'));
});

var asteroids_route_handler= require('./routers/asteroids.js');
app.use('/asteroids', asteroids_route_handler);

var game_scores_handler= require('./routers/gameScores.js');
app.use('/gamescores', game_scores_handler);

//------------------------------------------------------------------------------------------------------------
app.listen(3000, function(err)
{
	if(err != null || err != undefined)
		console.log("error: ", err);
	
	console.log("listening on port: ", 3000);
});
//---------------------------------------------------------------------------------------------------------

app.get('*', function(request, response)
{
	response.render('whoops');
});