window.Posts = new PostsCollection

class window.AppView extends Backbone.View
	el: "#app_view"

	initialize: ->
		self = @
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
		#new_post.save()
		Posts.add new_post
		this.render()

	render: ->
		console.log @el
		posts_list_el = @$el.find("#posts_list")
		posts_list_el.empty()
		Posts.forEach (p) ->
			a = new PostView(p)
			posts_list_el.append a.render().el



class window.PostView extends Backbone.View
	templateId: "#post_template"

	initialize: (model) ->
		@model = model

	render: ->
		template = _.template($(@templateId).html())
		@$el.html(template(@model.toJSON()))
		return @
