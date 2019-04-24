const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	title: String,
	price: Number,
	count: Number,
	pic: { type: String, default: '' }
})

// 静态方法
ProductSchema.statics = {
	// 查询所有的商品列表
	findProduct: function(options, cb) {
		this.find(options).exec(cb)
	},
	// 修改商品
	updateProduct: function(optoin, data, cb) {
		this.updateOne(optoin, data).exec(cb)
	},
	// 删除商品
	deleteProduct: function(optoin, cb) {
		this.remove(optoin).exec(cb)
	},
}

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel