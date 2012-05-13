class window.Post extends Backbone.Model
	validate: (attr) ->
		if attr.post_message.length > 100
			return "post cannot be greater than 100 characters"
		else if attr.post_message.length == 0
			return "post cannot be empty"
		else
			return


class window.PostsCollection extends Backbone.Collection
	model: Post
	url: '/posts'

	initialize: ->
		@filter_type = null

	filtered: ->
		if @filter_type is null
			@
		else
			@filter (i) -> i.get("starred") == @filter_type
