class window.Post extends Backbone.Model


class window.PostsCollection extends Backbone.Collection
	model: Post
	url: '/posts'