module.exports = ->
	mongoose = require("./db").instance
	models = {}

	Post = new mongoose.Schema {
		message: String,
		starred: Boolean,
		created_at: Date
	}

	Post.path('message').validate (v) -> if v then (v.length > 0 and v.length <= 100) else false
	  

	mongoose.model 'Post', Post ;	
	models.Post = mongoose.model 'Post'

	return models