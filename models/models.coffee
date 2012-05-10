module.exports = ->
	mongoose = require("./db").instance
	models = {}

	Post = new mongoose.Schema {
		message: String,
		starred: Boolean,
		created_at: Date
	}

	Post.path('message').validate  (v) ->
	  v.length <= 100

	mongoose.model 'Post', Post ;	
	models.Post = mongoose.model 'Post'

	return models