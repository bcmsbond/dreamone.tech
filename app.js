const express = require("express");
const crypto = require("crypto");
const config = require('./config');


var app = express();

//app.use(express.static("./public"));

app.get('/', function(req, res){
	var signature = req.query.signature,
		timestamp = req.query.timestamp,
		nonce = req.query.nonce,
		echostr	= req.query.echostr;

	console.log("Signature: " + signature);
	console.log("Timestamp: " + timestamp);
	console.log("Nonce: " + nonce);
	console.log("Echostr: " + echostr);

	var array = [config.token, timestamp, nonce];
	array.sort();

	var tempStr = array.join('');
	const hashCode = crypto.createHash('sha1');
	var resultCode = hashCode.update(tempStr,'utf8').digest('hex');

	console.log("Verified Signature: " + resultCode);

	if(resultCode === signature) {
		res.send(echostr);
	}
	else {
		res.send('mismatch');
	}
});


app.listen(443);

console.log("Server running on port 443");
module.exports = app; // Export app instance
