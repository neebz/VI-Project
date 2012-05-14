window.Posts = new PostsCollection

class window.AppView extends Backbone.View
	el: "#app_view"

	initialize: ->
		Posts.filter_type = null
		self = @
		Posts.bind "add", @renderOnePost, this
		Posts.fetch { 
			success: -> self.render()
			add: true
		}

	events: -> {
		"submit #new_post_form": "addPost"
		"click #submit_post": "addPost"
		"click #all" : "filterPosts"
		"click #starred" : "filterPosts"
		"click #unstarred" : "filterPosts"
	}

	filterPosts: (e) ->
		e.preventDefault()
		type = $(e.target).attr("id")
		if type is "all"
			Posts.filter_type = null
		else 
			Posts.filter_type = type is "starred"
		@render()
		

	addPost: (e) ->
		e.preventDefault()
		text = $("#post_message").val()
		new_post = new Post {message: text, starred: false}
		Posts.add new_post
		new_post.save({}, {error: (model, res) -> alert(res) })

	renderOnePost: (the_post) ->
		if the_post.isValid()
			posts_list_el = @$el.find("#posts_list")
			a = new PostView(the_post, @)
			posts_list_el.prepend a.render().el

	render: ->
		@$el.find("#posts_list").empty()
		self = @
		Posts.filtered().forEach (p) -> self.renderOnePost p
		@


class window.PostView extends Backbone.View
	templateId: "#post_template"

	initialize: (model, parent_view) ->
		@model = model
		@parent_view = parent_view 

	events: -> {
		"click #delete_post": "deletePost"
		"click #star_toggle": "starToggle"
	}

	deletePost: (e) ->
		e.preventDefault()
		@model.destroy()
		@$el.remove()

	starToggle: (e) ->
		e.preventDefault()
		current = @model.get "starred"
		@model.set "starred", !current
		@model.save()
		@parent_view.render()

	render: ->
		template = _.template($(@templateId).html())
		@$el.html(template(@model.toJSON()))
		@
