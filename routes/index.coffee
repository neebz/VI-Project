sanitizer = require "sanitizer"

# GET Home Page
exports.index = (req, res) ->
	res.render "index", title: "VI Project"


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
			res.json err, 400

# POST create Post
exports.posts.create = (req, res) ->
	models = require("../models/models")()
	new_post = new models.Post()
	new_post.message = sanitizer.sanitize(req.body.message).replace(/(<([^>]+)>)/ig,"") # first sanitize and strip html tags
	new_post.starred = false
	new_post.created_at = new Date()
	new_post.save (err) ->
		if !err
			res.json new_post, 200
		else
			res.json err, 400

# PUT update Post
exports.posts.update = (req, res) ->
	Post = require("../models/models")().Post	
	Post.findOne {_id: req.params.id}, (err, doc) ->
		if doc
			doc.message = sanitizer.sanitize(req.body.message).replace(/(<([^>]+)>)/ig,"")
			doc.starred = req.body.starred
			doc.save (err) ->
				if !err
					res.json doc, 200
				else
					res.json err, 400
		else
			res.json err, 404

# PUT delete Post
exports.posts.delete = (req, res) ->
	Post = require("../models/models")().Post	
	Post.findOne {_id: req.params.id}, (err, doc) ->
		if doc
			doc.remove (err) ->
				if !err
					res.json {}, 200
				else
					res.json err, 400
		else
			res.json err, 404

