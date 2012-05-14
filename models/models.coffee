# Schemas are not generally required in Mongo but I always find easier to have at least a defined version initially.
# We could add more schemas here and export them for the whole app to use.

module.exports = ->
	mongoose = require("./db").instance
	models = {}

	Post = new mongoose.Schema {
		message: String,
		starred: Boolean,
		created_at: Date
	}

	#add validation here as well in case someone bypasses client-side validation
	Post.path('message').validate (v) -> if v then (v.length > 0 and v.length <= 100) else false
	  

	mongoose.model 'Post', Post ;	
	models.Post = mongoose.model 'Post'

	return models