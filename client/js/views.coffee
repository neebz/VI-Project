Posts = new PostsCollection

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
		console.log "add new post in Posts"

	render: ->
		console.log @el
		self = @
		Posts.forEach (p) ->
			a = new PostView(p)
			self.$el.append a.html



class window.PostView extends Backbone.View
	templateId: "#post_template"

	initialize: (model) ->
		@model = model

	render: ->
		template = _.template($(templateId).html())
		@$el.html(template(@model.toJSON()))
		return @
