const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: String,
	password: String,
	remember: { type: String, default: '' }
})

// 静态方法
UserSchema.statics = {
	findUser: function(options, cb) {
		console.log('options', options)
		// this.find(options, cb)
		this.findOne(options).select('-_id').exec(cb)
	}
}

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel