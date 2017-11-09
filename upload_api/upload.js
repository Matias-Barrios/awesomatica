    const PORT=4000;
    var express = require('express'); 
    var app = express(); 
    var bodyParser = require('body-parser');
    var multer = require('multer');
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    /** Serving from the same express Server
    No cors required */
    app.use(express.static('../client'));
    app.use(bodyParser.json());
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, '/var/www/piedrasblancas.com.uy/images/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, "foto_avisos_" +  file.originalname)
        }
    });
    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');
    /** API path that will upload the files */
    app.post('/upload_aviso', function(req, res) {
        console.log("Got a request : " +  req.url + " File : " + req.file.originalname );
	upload(req,res,function(err){
            if(err){
                res.header('Access-Control-Allow-Origin', '*');
    	    	res.header('Access-Control-Allow-Methods', '*');
    	    	res.header('Access-Control-Allow-Headers', 'Content-Type'); 
		        res.header('Content-Type', 'text/html'); 
		        res.status(500).json({error_code:1,err_desc:err});
                return;
            }
             res.json({error_code:0,err_desc:null});
        });
    });

    app.options('*', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.status(200).send("you cant just reply anything...thats where u are wrong kiddo!");
    }); 
    app.listen(PORT, function(){
        console.log('Application running on ' + PORT + '...');
    });
