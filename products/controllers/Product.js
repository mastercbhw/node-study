const Product = require('../models/Product')

exports.showProduct = (req, res) => {
	Product.findProduct({}, (err, result) => {
		if (err) {
			console.log("出错了");
		} else {
			res.render('product', {
				data: result
			})
		}
	})
}

// 获取商品列表
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
// 删除商品列表
exports.deleteProduct = (req, res) => {
	Product.deleteProduct({ _id: req.query.id }, err => {
		if(!err) {
			console.log('2', 2)
			Product.findProduct({}, (err, result) => {
				req.render('/product', {
					data: result
				})
			})
		} else {
			console.log('deleteProducterr', err)
		}
	})
}

exports.showAddProduct = (req, res) => {
	res.render('productadd')
}