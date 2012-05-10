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
      this.filer_type = null;
      self = this;
      Posts.bind("add", this.renderOnePost, this);
      return Posts.fetch({
        success: function() {
          return self.render();
        }
      });
    };

    AppView.prototype.events = function() {
      return {
        "submit #new_post_form": "addPost",
        "click #submit_post": "addPost",
        "click #all": "filterPosts",
        "click #starred": "filterPosts",
        "click #unstarred": "filterPosts"
      };
    };

    AppView.prototype.filterPosts = function(e) {
      var type;
      e.preventDefault();
      type = $(e.target).attr("id");
      if (type === "all") {
        this.filter_type = null;
      } else {
        this.filter_type = type === "starred";
      }
      return this.render();
    };

    AppView.prototype.addPost = function(e) {
      var new_post, text;
      e.preventDefault();
      text = $("#post_message").val();
      new_post = new Post({
        post_message: text,
        created_at: new Date(),
        starred: false
      });
      return Posts.add(new_post);
    };

    AppView.prototype.renderOnePost = function(the_post) {
      var a, posts_list_el;
      posts_list_el = this.$el.find("#posts_list");
      a = new PostView(the_post);
      return posts_list_el.prepend(a.render().el);
    };

    AppView.prototype.render = function() {
      var filtered, self, toggle;
      console.log(this.el);
      this.$el.find("#posts_list").empty();
      self = this;
      if (this.filter_type === null) {
        Posts.forEach(function(p) {
          return self.renderOnePost(p);
        });
      } else {
        toggle = this.filter_type;
        filtered = Posts.filter(function(i) {
          return i.get("starred") === toggle;
        });
        filtered.forEach(function(p) {
          return self.renderOnePost(p);
        });
      }
      return this;
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
        "click #delete_post": "deletePost",
        "click #star_toggle": "starToggle"
      };
    };

    PostView.prototype.deletePost = function(e) {
      e.preventDefault();
      this.model.destroy();
      return this.$el.remove();
    };

    PostView.prototype.starToggle = function(e) {
      var current;
      e.preventDefault();
      current = this.model.get("starred");
      this.model.set("starred", !current);
      return this.render();
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
