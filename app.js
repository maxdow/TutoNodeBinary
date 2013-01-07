/*process.stdin.resume();


process.stdin.on('data', function (chunk) {
 console.log(chunk.toString());
});*/

var binary = require("binary");


var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8080;

var client = new net.Socket();

client.connect(PORT, HOST);

client.on('data', function(data) {
    //console.log(data.length);
    decodeTexte(data);
});

client.on('close', function() {
    console.log('Connection closed');
});


function decodeTexte(paquet) {
	//“;” 8bits || Id (8bits) || taille données (16bits) || données || crc (16bits )
	
	paquet = paquet.toString("hex");
	console.log(paquet);

	var paquetDecode = {
		separateur : paquet.slice(0,2),
		id : paquet.slice(2,4).toString("16"),
		taille : parseInt(paquet.slice(4,8),16)*2
	}
	paquetDecode.data = new Buffer(paquet.slice(8,8+paquetDecode.taille)) ; 
		//crc : paquet.slice(8+this.taille,12+this.taille)

	
	console.log(paquetDecode);
	console.log("-----------------");
}


function decodeTexteBuffer(paquet) {


}


function decodeBinary(paquet) {

var paquetDecode = binary.parse(paquet)
		.word8("separateur")
		.word8("id")
		.word16bu("taille")
		.tap(function(vars){
			this.buffer("data",vars.taille).toString();
		})
		.word16bu("crc")
		.vars
		;
console.log(paquetDecode,paquetDecode.data.toString());
}


