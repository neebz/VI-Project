class Post extends Backbone.Model


class PostsCollection extends Backbone.Collection
	model: Post
	url: '/posts'