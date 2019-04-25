const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	title: String,
	price: Number,
	count: Number,
	pic: { type: String, default: '' },
	desc: String,
	picName: String,	desc: String,
})

// 静态方法
ProductSchema.statics = {
	// 查询所有的商品列表
	findProduct: function(options, cb) {
		this.find(options).exec(cb)
	},
	// 新增商品
	addProduct: function(data, cb) {
		this.create(data, cb)
	},
	// 删除商品
	deleteProduct: function(optoin, cb) {
		this.deleteOne(optoin).exec(cb)
	},
	// 获取商品详情
	getProductDetail: function(option, cb) {
		this.findOne(option, cb)
	},
	editProduct: function(option, data, cb) {
		this.updateOne(option, data, cb)
	}
}

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel