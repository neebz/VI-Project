

# GET Home Page
exports.index = (req, res) ->
	res.render "index", title: "Express"



# GET all Posts

exports.posts = (req, res) ->
	models = require("../models/models")()
	Post = models.Post
	Post.find {}, (err, docs) ->
		if !err
			res.json docs, 200
		else
			res.json err, 404