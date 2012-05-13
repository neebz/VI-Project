class window.Post extends Backbone.Model

	defaults: {
			message: "",
			starred: false,
			created_at: ""
		}

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
	filter_type: null

	comparator: (p) ->
			p.get('created_at') * -1
		

	filtered: ->
		if @filter_type is null
			@
		else
			toggle = @filter_type
			@filter (p) -> p.get("starred") == toggle
				
