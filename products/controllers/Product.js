const Product = require('../models/Product')
const multiparty = require('multiparty')


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
			res.redirect('/product')
		} else {
			console.log('deleteProducterr', err)
		}
	})
}

// 渲染商品上传页面
exports.showAddProduct = (req, res) => {
	res.render('productadd')
}


// 新增商品
exports.productAdd = (req, res) => {
	const form = new multiparty.Form({
		uploadDir: 'upload',   // 上传目录，必须存在
	});
	
	// 获取表单的数据
	form.parse(req, (err, fields, files) => {
		if (!err) {
			const data = {
				title: fields.title[0],
				price: fields.price[0],
				count: fields.count[0],
				desc: fields.desc[0],
				pic: files.pic[0].path,
				picName: files.pic[0].originalFilename,
			}
			Product.addProduct(data, (error, result) => {
				if(!error) {
					res.redirect('/product')
				}
			})
		}
	});
	return
}

// 编辑商品页面渲染
exports.showProductEdit = (req, res) => {
	const { id } = req.query
	Product.getProductDetail({ _id: id }, (err, result) => {
		if(!err) {
			console.log(result);
			res.render('productedit', {
				data: result
			})
		}
	})
}


// 修改商品
exports.ProductEdit = (req, res) => {
	const form = new multiparty.Form({
		uploadDir: 'upload',   // 上传目录，必须存在
	});
	
	// 获取表单的数据
	form.parse(req, (err, fields, files) => {
		console.log(err);
		console.log(files);
		console.log(fields);
		if (!err) {
			let data = {
				title: fields.title[0],
				price: fields.price[0],
				count: fields.count[0],
				desc: fields.desc[0],
			}
			if (files.pic[0].originalFilename) {
				data = {
					...data,
					pic: files.pic[0].path,
					picName: files.pic[0].originalFilename,
				}
			}
			Product.editProduct({_id: fields.id[0] }, data, (error, result) => {
				if(!error) {
					res.redirect('/product')
				}
			})
		}
	});
	return
}
