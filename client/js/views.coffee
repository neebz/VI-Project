window.Posts = new PostsCollection

class window.AppView extends Backbone.View
	el: "#app_view"

	initialize: ->
		new AddPostView()
		Posts.filter_type = null
		self = @
		Posts.bind "add", @renderOnePost, this
		Posts.fetch { 
			success: -> self.render()
			add: true
		}

	events: -> {
		"click #all" : "filterPosts"
		"click #starred" : "filterPosts"
		"click #unstarred" : "filterPosts"
	}

	filterPosts: (e) ->
		e.preventDefault()
		type = $(e.target).attr("id") 
		if type is "all"
			Posts.filter_type = null # null is to show all
		else 
			Posts.filter_type = type is "starred" # else set value accordingly 
		@render()
		

	renderOnePost: (the_post) ->
		if the_post.isValid()
			posts_list_el = @$el.find("#posts_list")
			a = new PostView(the_post, @) # pass the current view in case we need to render it from an internal event
			posts_list_el.prepend a.render().el

	render: ->
		@$el.find("#posts_list").empty()
		self = @
		Posts.filtered().forEach (p) -> self.renderOnePost p
		@


class window.AddPostView extends Backbone.View
	el: "#add_post"
	events: {
		"submit #new_post_form": "addPost"
		"click #submit_post": "addPost"
	}

	addPost: (e) ->
		e.preventDefault()
		add_post_el = @$el.find("#post_message")
		text = add_post_el.val()
		new_post = new Post {message: text, starred: false}
		new_post.save {message: text, starred: false}, { 
			success: (model, res) ->
				add_post_el.val("")
				Posts.add new_post # add in collection while successfully added
			error: (model, res) -> 
				if res?.status? and res.status is 0
					alert "Can't connect to internet"
				else
					alert res
		}

		render: -> @



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
