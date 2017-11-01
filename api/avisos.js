var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// Constants
var PORT = 3000;

// Functions 
function Get_Avisos(callback){
	const testFolder = './avisos_json/';
	const fs = require('fs');
	var results = [];
	var errors = "";
	try {
	fs.readdirSync(testFolder).forEach(file => {
		console.log(file);
		results.push(fs.readFileSync('./avisos_json/' + file,"utf8"));
		});
	} catch (err) {
		console.log(err);
		callback(results,err);
	}
	callback(results,errors);
 }
// END Functions

app.get('/get_avisos', function (req, res) {
  Get_Avisos( function (results,errors){
	  if(errors) {
		res.status(500).end('Something weird happened!!');
	  } else {
		res.status(200).end(JSON.stringify(results));
	  }
  });
  
});

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});

