(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Post = (function(_super) {

    __extends(Post, _super);

    function Post() {
      Post.__super__.constructor.apply(this, arguments);
    }

    return Post;

  })(Backbone.Model);

  window.PostsCollection = (function(_super) {

    __extends(PostsCollection, _super);

    function PostsCollection() {
      PostsCollection.__super__.constructor.apply(this, arguments);
    }

    PostsCollection.prototype.model = Post;

    PostsCollection.prototype.url = '/posts';

    return PostsCollection;

  })(Backbone.Collection);

  window.Posts = new PostsCollection;

  window.AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.el = "#app_view";

    AppView.prototype.initialize = function() {
      var self;
      self = this;
      Posts.bind("add", this.renderNewPost, this);
      return Posts.fetch({
        success: function() {
          return self.render();
        }
      });
    };

    AppView.prototype.events = function() {
      return {
        "submit #new_post_form": "addPost",
        "click #submit_post": "addPost"
      };
    };

    AppView.prototype.addPost = function(e) {
      var new_post, text;
      e.preventDefault();
      text = $("#post_message").val();
      new_post = new Post({
        post_message: text
      });
      return Posts.add(new_post);
    };

    AppView.prototype.renderNewPost = function(new_post) {
      var a, posts_list_el;
      posts_list_el = this.$el.find("#posts_list");
      a = new PostView(new_post);
      return posts_list_el.prepend(a.render().el);
    };

    AppView.prototype.render = function() {
      var posts_list_el;
      console.log(this.el);
      posts_list_el = this.$el.find("#posts_list");
      return Posts.forEach(function(p) {
        var a;
        a = new PostView(p);
        return posts_list_el.prepend(a.render().el);
      });
    };

    return AppView;

  })(Backbone.View);

  window.PostView = (function(_super) {

    __extends(PostView, _super);

    function PostView() {
      PostView.__super__.constructor.apply(this, arguments);
    }

    PostView.prototype.templateId = "#post_template";

    PostView.prototype.initialize = function(model) {
      return this.model = model;
    };

    PostView.prototype.events = function() {
      return {
        "click #delete_post": "deletePost"
      };
    };

    PostView.prototype.deletePost = function() {
      this.model.destroy();
      return this.$el.remove();
    };

    PostView.prototype.render = function() {
      var template;
      template = _.template($(this.templateId).html());
      this.$el.html(template(this.model.toJSON()));
      return this;
    };

    return PostView;

  })(Backbone.View);

}).call(this);
