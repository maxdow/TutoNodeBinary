var net = require('net');

var clients = [];

var HOST = '127.0.0.1';
var PORT = 8080;


net.createServer(function(sock) {
    


	clients.push(sock);
    
    sock.on('close', function(client) {
        var i = clients.indexOf(client);
        clients.splice(i, 1);    	
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);


setInterval(function() {
	//if(clients.length > 0) {
		var date = new Date() ;
		clients.forEach(function(client){

			var paquet = {
				separateur : ";",
				id: 0xdd,
				data : date.toString(),
				crc : 0xff
			};
			paquet.taille = paquet.data.length ;

			//“;” 8bits || Id (8bits) || taille données (16bits) || données || crc (16bits )			
			
			var paquetB = new Buffer(6 + paquet.taille);
			paquetB.write(paquet.separateur);
			paquetB.writeUInt8(paquet.id,1);
			paquetB.writeUInt16BE(paquet.taille,2);
			paquetB.write(paquet.data.toString(),4,paquet.data.length);
			paquetB.writeUInt16BE(paquet.crc,4+paquet.data.length);

			client.write(paquetB);
		});
	//}
}, 1000);