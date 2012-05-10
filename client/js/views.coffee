window.Posts = new PostsCollection

class window.AppView extends Backbone.View
	el: "#app_view"

	initialize: ->
		self = @
		Posts.bind "add", @renderNewPost, this
		Posts.fetch { 
			success: -> self.render()
		}

	events: -> {
		"submit #new_post_form": "addPost"
		"click #submit_post": "addPost"
	}

	addPost: (e) ->
		e.preventDefault()
		text = $("#post_message").val()
		new_post = new Post {post_message: text}
		Posts.add new_post

	renderNewPost: (new_post) ->
		posts_list_el = @$el.find("#posts_list")
		a = new PostView(new_post)
		posts_list_el.prepend a.render().el

	render: ->
		console.log @el
		posts_list_el = @$el.find("#posts_list")
		Posts.forEach (p) ->
			a = new PostView(p)
			posts_list_el.prepend a.render().el



class window.PostView extends Backbone.View
	templateId: "#post_template"

	initialize: (model) ->
		@model = model

	events: -> {
		"click #delete_post": "deletePost"
	}

	deletePost: ->
		@model.destroy()
		@$el.remove()

	render: ->
		template = _.template($(@templateId).html())
		@$el.html(template(@model.toJSON()))
		return @
