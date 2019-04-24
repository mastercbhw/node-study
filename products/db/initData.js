const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017/';

console.log('1', 1)
// Use connect method to connect to the Server
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
	console.log('err', err);
	console.log("Connected successfully to server");
	if(!err) {
		console.log('start')
		const dbo = db.db('products')
		dbo.createCollection('users', function (err, res) {
			console.log("创建集合!");
		});
		dbo.createCollection('products', function (err, res) {
			console.log("创建集合!");
		});
		dbo.collection('users').insertMany(
			[
				{ name: 'admin', password: '202cb962ac59075b964b07152d234b70'},
				{ name: 'chen', password: '202cb962ac59075b964b07152d234b70'},
			]
		)
		dbo.collection('products').insertMany(
			[
				{ title: 'iphoneX', price: 11000, count: 20, pic: ''},
				{ title: '小米9', price: 2300, count: 30, pic: ''},
				{ title: '华为p30', price: 7000, count: 40, pic: ''},
			]
		)
		db.close();
	}
});