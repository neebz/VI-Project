

# GET Home Page
exports.index = (req, res) ->
	res.render "index", title: "Express"


# Posts
exports.posts = {}

# GET all Posts
exports.posts.read = (req, res) ->
	models = require("../models/models")()
	Post = models.Post
	Post.find {}, (err, docs) ->
		if !err
			res.json docs, 200
		else
			res.json err, 404

#POST create Post
exports.posts.create = (req, res) ->
	models = require("../models/models")()
	new_post = models.Post
	new_post.message = req.body.post_message
	new_post.starred = false
	new_post.created_at = new Date()
	new_post.save (err) ->
		if !err
			res.json new_post, 200
		else
			res.json err, 404
