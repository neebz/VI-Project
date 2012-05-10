

# GET Home Page
exports.index = (req, res) ->
	models = require("../models/models")()
	Post = models.Post
	Post.find {}, (err, docs) ->
		console.log docs.length
	res.render "index", title: "Express"