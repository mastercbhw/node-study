const Product = require('../models/Product')

exports.showProduct = (req, res) => {
	Product.findProduct({}, (err, result) => {
		console.log('result', result)
		if (err) {
			console.log("出错了");
		} else {
			res.render('product', {
				data: result
			})
		}
	})
}


exports.getproduct = (req, res) => {
	Product.findProduct({}, (err, result) => {
		console.log('result', result)
		if (err) {
			console.log("出错了");
		} else {
			console.log(result);
			res.json(result)
		}
	})
}