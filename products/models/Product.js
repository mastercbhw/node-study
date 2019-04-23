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
	findProduct: function(options, cb) {
		console.log('options', options)
		this.find({}, (err, r) => {
			console.log('r', r)
		})
		this.find(options).select('-_id').exec(cb)
	}
}

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel