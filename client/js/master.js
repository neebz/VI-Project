(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Post = (function(_super) {

    __extends(Post, _super);

    function Post() {
      Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.defaults = {
      message: "",
      starred: false,
      created_at: ""
    };

    Post.prototype.validate = function(attr) {
      if (attr.message.length > 100) {
        return "post cannot be greater than 100 characters";
      } else if (attr.message.length === 0) {
        return "post cannot be empty";
      } else {

      }
    };

    return Post;

  })(Backbone.Model);

  window.PostsCollection = (function(_super) {

    __extends(PostsCollection, _super);

    function PostsCollection() {
      PostsCollection.__super__.constructor.apply(this, arguments);
    }

    PostsCollection.prototype.model = Post;

    PostsCollection.prototype.url = '/posts';

    PostsCollection.prototype.filter_type = null;

    PostsCollection.prototype.comparator = function(p) {
      return p.get('created_at') * -1;
    };

    PostsCollection.prototype.filtered = function() {
      var toggle;
      if (this.filter_type === null) {
        return this;
      } else {
        toggle = this.filter_type;
        return this.filter(function(p) {
          return p.get("starred") === toggle;
        });
      }
    };

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
      Posts.filter_type = null;
      self = this;
      Posts.bind("add", this.renderOnePost, this);
      return Posts.fetch({
        success: function() {
          return self.render();
        },
        add: true
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
        Posts.filter_type = null;
      } else {
        Posts.filter_type = type === "starred";
      }
      return this.render();
    };

    AppView.prototype.addPost = function(e) {
      var new_post, text;
      e.preventDefault();
      text = $("#post_message").val();
      new_post = new Post({
        message: text,
        starred: false
      });
      Posts.add(new_post);
      return new_post.save();
    };

    AppView.prototype.renderOnePost = function(the_post) {
      var a, posts_list_el;
      posts_list_el = this.$el.find("#posts_list");
      a = new PostView(the_post, this);
      return posts_list_el.prepend(a.render().el);
    };

    AppView.prototype.render = function() {
      var self;
      console.log(this.el);
      this.$el.find("#posts_list").empty();
      self = this;
      Posts.filtered().forEach(function(p) {
        return self.renderOnePost(p);
      });
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

    PostView.prototype.initialize = function(model, parent_view) {
      this.model = model;
      return this.parent_view = parent_view;
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
      return this.parent_view.render();
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
