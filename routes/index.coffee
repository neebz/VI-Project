db = require "../models/db"

# GET Home Page
exports.index = (req, res) ->
	
	res.render "index", title: "Express"