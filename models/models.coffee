module.exports = ->
	mongoose = require("./db").instance
	models = {}

	Post = new mongoose.Schema {
		message: String,
		starred: Boolean
	}

	Post.path('message').validate  (v) ->
	  v.length <= 100

	mongoose.model 'Post', Post ;	
	models.Post = mongoose.model 'Post'

	return models