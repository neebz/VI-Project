window.Posts = new PostsCollection

class window.AppView extends Backbone.View
	el: "#app_view"

	initialize: ->
		@filer_type = null
		self = @
		Posts.bind "add", @renderOnePost, this
		Posts.fetch { 
			success: -> self.render()
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
			@filter_type = null
		else 
			@filter_type = type is "starred"
		@render()
		

	addPost: (e) ->
		e.preventDefault()
		text = $("#post_message").val()
		new_post = new Post {post_message: text, created_at: new Date(), starred: false}
		Posts.add new_post
		#new_post.save()

	renderOnePost: (the_post) ->
		posts_list_el = @$el.find("#posts_list")
		a = new PostView(the_post)
		posts_list_el.prepend a.render().el

	render: ->
		console.log @el
		@$el.find("#posts_list").empty()
		self = @
		if @filter_type is null
			Posts.forEach (p) -> self.renderOnePost p
		else
			toggle = @filter_type
			filtered = Posts.filter (i) -> i.get("starred") == toggle
			filtered.forEach (p) -> self.renderOnePost p

		@


class window.PostView extends Backbone.View
	templateId: "#post_template"

	initialize: (model) ->
		@model = model

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
		@render()

	render: ->
		template = _.template($(@templateId).html())
		@$el.html(template(@model.toJSON()))
		@
