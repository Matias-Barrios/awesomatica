var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var PASSWORD;
const fileSys = require('fs');
fileSys.readFile('/etc/api_password.txt', 'utf8', function(err, data) {  
    if (err) throw err;
		PASSWORD = data.trim();
		
});


// Constants
var PORT = 3000;

// Functions 
function Get_Avisos(callback){
	const testFolder = '/data/avisos_json/';
	const fs = require('fs');
	var results = [];
	var errors = "";
	try {
	fs.readdirSync(testFolder).forEach(file => {
		try {
			var obj = JSON.parse(fs.readFileSync(testFolder + file,"utf8"));
			obj.id = file;
			if (obj.visible == true )
				results.push(obj);
		}catch (err)  {
			console.log("ERROR PARSING JSON AT FILE : " + file + " ## " + err);
			}
		});
	} catch (err) {
		console.log(err);
		callback(results,err);
	}
	callback(results,errors);
 }

function Get_Aviso(aviso,callback){
	const testFolder = '/data/avisos_json/';
	const fs = require('fs');
	var results = [];
	var errors = "";
	try {
	
		var obj = JSON.parse(fs.readFileSync(testFolder + aviso,"utf8"));
		obj.id = aviso;
		callback(obj,errors);
		
	} catch (err) {
		console.log(err);
		callback(results,err);
	}
	callback(results,errors);
 }
function Get_t_ofrecido(t_ofrecido,callback){
	const testFolder = '/data/t_ofrecido/';
	const fs = require('fs');
	var results = [];
	var errors = "";
	try {
	
		var obj = JSON.parse(fs.readFileSync(testFolder + t_ofrecido,"utf8"));
		obj.id = t_ofrecido;
		callback(obj,errors);
		
	} catch (err) {
		console.log(err);
		callback(results,err);
	}
	callback(results,errors);
 }
function Get_t_ofrecidos(callback){
	const testFolder = '/data/t_ofrecido/';
	const fs = require('fs');
	var results = [];
	var errors = "";
	try {
	fs.readdirSync(testFolder).forEach(file => {
		var obj = JSON.parse(fs.readFileSync(testFolder + file,"utf8"));
		obj.id = file;
		if (obj.visible == true )
			results.push(obj);
		});
	} catch (err) {
		console.log(err);
		callback(results,err);
	}
	callback(results,errors);
 }
function Put_aviso(data,callback){
	const testFolder = '/data/avisos_json/';
	const fs = require('fs');
	var results = "OK";
	var errors = "";
	if (! data.file_name || ! data.file_content ) {
		callback("","You did not specify a name for the file or there is no content");
		return;
	   }
	try {
		fs.writeFileSync(testFolder + "/" + data.file_name + ".json", JSON.stringify(data.file_content));
	} catch (err) {
		console.log(err);
		callback(results,err);
	}
	callback(results,errors);
 }
function Put_t_ofrecido(data,callback){
	const testFolder = '/data/t_ofrecido';
	const fs = require('fs');
	var results = "OK";
	var errors = "";
	if (! data.file_name || ! data.file_content ) {
		callback("","You did not specify a name for the file or there is no content");
		return;
	   }
	try {
		fs.writeFileSync(testFolder + "/" + data.file_name + ".json", JSON.stringify(data.file_content));
	} catch (err) {
		console.log(err);
		callback(results,err);
	}
	callback(results,errors);
 }
function Crear_horoscopo(data,callback){
	const testFolder = '/data/horoscopo/';
	const fs = require('fs');
	var results = "OK";
	var errors = "";
	if (! data.signos ) {
		callback("","Signos is empty!!");
		return;
	   }
	try {
		fs.writeFileSync(testFolder + "horoscopo.json", JSON.stringify(data.signos));
	} catch (err) {
		console.log(err);
		callback(results,err);
	}
	callback(results,errors);
 }

function Get_Horoscopo(callback){
	const testFolder = '/data/horoscopo/';
	const fs = require('fs');
	var results = [];
	var errors = "";
	try {
		callback(JSON.parse(fs.readFileSync('/data/horoscopo/horoscopo.json',"utf8")),"");
	
	} catch (err) {
		console.log(err);
		callback("",err);
	}
	callback(results,errors);
 }
// END Functions


// GET Methdods
app.get('/get_avisos', function (req, res) {
  Get_Avisos( function (results,errors){
	  if(errors) {
		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Methods', '*');
    		res.header('Access-Control-Allow-Headers', 'Content-Type'); 
		res.header('Content-Type', 'text/html'); 
		res.status(500).end('Something weird happened!! : ' + errors);
	  } else {
		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Methods', '*');
    		res.header('Access-Control-Allow-Headers', 'Content-Type'); 
		res.header('Content-Type', 'application/json'); 
		res.status(200).end(JSON.stringify(results));
	  }
  });
  
});
app.get('/get_t_ofrecido', function (req, res) {
  Get_t_ofrecidos( function (results,errors){
	  if(errors) {
		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Methods', '*');
    		res.header('Access-Control-Allow-Headers', 'Content-Type'); 
		res.header('Content-Type', 'text/html'); 
		res.status(500).end('Something weird happened!! : ' + errors);
	  } else {
		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Methods', '*');
    		res.header('Access-Control-Allow-Headers', 'Content-Type'); 
		res.header('Content-Type', 'application/json'); 
		res.status(200).end(JSON.stringify(results));
	  }
  });
  
});
app.get('/get_horoscopo', function (req, res) {
  Get_Horoscopo( function (results,errors){
	  if(errors) {
		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Methods', '*');
    		res.header('Access-Control-Allow-Headers', 'Content-Type'); 
		res.header('Content-Type', 'text/html'); 
		res.status(500).end('Something weird happened!! : ' + errors);
	  } else {
		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Methods', '*');
    		res.header('Access-Control-Allow-Headers', 'Content-Type'); 
		res.header('Content-Type', 'application/json'); 
		res.status(200).end(JSON.stringify(results));
	  }
  });
  
});
app.get('/get_aviso', function (req, res) {
  var aid = req.query.aviso_id;
  Get_Aviso( aid,function (results,errors){
	  if(errors) {
		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Methods', '*');
    		res.header('Access-Control-Allow-Headers', 'Content-Type'); 
		res.header('Content-Type', 'text/html'); 
		res.status(500).end('Something weird happened!! : ' + errors);
	  } else {
		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Methods', '*');
    		res.header('Access-Control-Allow-Headers', 'Content-Type'); 
		res.header('Content-Type', 'application/json'); 
		res.status(200).end(JSON.stringify(results));
	  }
  });
  
});

app.get('/get_trabajo_ofrecido', function (req, res) {
  var to_id = req.query.to_id;
  Get_t_ofrecido( to_id,function (results,errors){
	  if(errors) {
		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Methods', '*');
    		res.header('Access-Control-Allow-Headers', 'Content-Type'); 
		res.header('Content-Type', 'text/html'); 
		res.status(500).end('Something weird happened!! : ' + errors);
	  } else {
		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Methods', '*');
    		res.header('Access-Control-Allow-Headers', 'Content-Type'); 
		res.header('Content-Type', 'application/json'); 
		res.status(200).end(JSON.stringify(results));
	  }
  });
  
});

// POST Methdods
app.post('/put_aviso', function (req, res) {
  if ( req.body.api_password == PASSWORD ) {
	 
	  Put_aviso( req.body, function (results,errors){
		  if(errors) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', '*');
			res.header('Access-Control-Allow-Headers', 'Content-Type'); 
			res.header('Content-Type', 'text/html'); 
			res.status(500).end('Something weird happened!! : ' + errors);
		  } else {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', '*');
			res.header('Access-Control-Allow-Headers', 'Content-Type'); 
			res.header('Content-Type', 'text/html'); 
			res.status(200).end("Successfully uploaded file");
		  }
	  });
  }else {
  			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', '*');
			res.header('Access-Control-Allow-Headers', 'Content-Type'); 
			res.header('Content-Type', 'text/html'); 
			res.status(500).end('You are not authorized to do this!!');
  }
});
app.post('/crear_horoscopo', function (req, res) {
  if ( req.body.api_password == PASSWORD ) {
	 
	  Crear_horoscopo( req.body, function (results,errors){
		  if(errors) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', '*');
			res.header('Access-Control-Allow-Headers', 'Content-Type'); 
			res.header('Content-Type', 'text/html'); 
			res.status(500).end('Something weird happened!! : ' + errors);
		  } else {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', '*');
			res.header('Access-Control-Allow-Headers', 'Content-Type'); 
			res.header('Content-Type', 'text/html'); 
			res.status(200).end("Successfully uploaded file");
		  }
	  });
  }else {
  			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', '*');
			res.header('Access-Control-Allow-Headers', 'Content-Type'); 
			res.header('Content-Type', 'text/html'); 
			res.status(500).end('You are not authorized to do this!!');
  }
});

app.post('/crear_t_ofrecido', function (req, res) {
  
  if ( req.body.api_password == PASSWORD ) {
	 
	  Put_t_ofrecido( req.body, function (results,errors){
		  if(errors) {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', '*');
			res.header('Access-Control-Allow-Headers', 'Content-Type'); 
			res.header('Content-Type', 'text/html'); 
			res.status(500).end('Something weird happened!! : ' + errors);
		  } else {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', '*');
			res.header('Access-Control-Allow-Headers', 'Content-Type'); 
			res.header('Content-Type', 'text/html'); 
			res.status(200).end("Successfully uploaded file");
		  }
	  });
  }else {
  			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', '*');
			res.header('Access-Control-Allow-Headers', 'Content-Type'); 
			res.header('Content-Type', 'text/html'); 
			res.status(500).end('You are not authorized to do this!!');
  }
});


//Enable CORS
app.options('*', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send("you cant just reply anything...thats where u are wrong kiddo!");
  
});

// Safeguards
app.get('*', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(500).send('Unknown method!')
});
app.post('*', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(500).send('Unknown method!')
});


app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
});


/* EJEMPLO de request body
{
	"api_password" : "shellbomb",
	"file_name" : "ojitos",
	"file_content" : {
		  "images": [
		    {
		      "src": ""
		    }
		  ],
		  "visible": true,
		  "sensible": false,
		  "name": "Ferreteria Venus",
		  "address": "Teniente Galeano 2358",
		  "description": "Una ferreteria re pipi cucu",
		  "tags": "ferreteria barraca reparacion tornillos",
		  "phones": [
		    "22271616"
		  ]
		}
}
*/
