Posts = new PostsCollection

class window.AppView extends Backbone.View
	el: "#app_view"

	initialize: ->
		self = this
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
		console.log this.el
		Posts.forEach (p) ->
			a = new PostView(p)
			this.$el.append a.html



class window.PostView extends Backbone.View
	templateId: "#post_template"

	initialize: (model) ->
		this.model = model

	render: ->
		template = _.template($(templateId).html())
		this.$el.html(template(this.model.toJSON()))
		return this
