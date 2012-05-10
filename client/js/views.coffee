Posts = new PostsCollection

class AppView extends Backbone.View
	el: "#app_view"

	initialize: ->
		Posts.fetch()

	events: ->
		"submit #new_post_form": "addPost"

	addPost: ->
		console.log "add new post in Posts"

	render: ->
		console.log Posts.length
		Posts.forEach (p) ->
			a = new PostView(p)
			this.$el.append a.html



class PostView extends Backbone.View
	templateId: "#post_template"

	initialize: (model) ->
		this.model = model

	render: ->
		template = _.template($(templateId).html())
		this.$el.html(template(this.model.toJSON()))
		return this


app = new AppView