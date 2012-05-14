# Single instance of the db is created when app is started

mongoose = require "mongoose"

module.exports.initialize = () ->
	host = "localhost"
	port = "27018"
	db_name = "vi-project"
	console.log "connecting mongodb..."
	mongoose.connect "mongodb://#{host}:#{port}/#{db_name}", (err) ->
		if err
			throw err
		else
			exports.instance = mongoose
	
	