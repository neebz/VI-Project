(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Post = (function(_super) {

    __extends(Post, _super);

    function Post() {
      Post.__super__.constructor.apply(this, arguments);
    }

    Post.prototype.idAttribute = "_id";

    Post.prototype.urlRoot = '/posts';

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
      new AddPostView();
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

    AppView.prototype.renderOnePost = function(the_post) {
      var a, posts_list_el;
      if (the_post.isValid()) {
        posts_list_el = this.$el.find("#posts_list");
        a = new PostView(the_post, this);
        return posts_list_el.prepend(a.render().el);
      }
    };

    AppView.prototype.render = function() {
      var self;
      this.$el.find("#posts_list").empty();
      self = this;
      Posts.filtered().forEach(function(p) {
        return self.renderOnePost(p);
      });
      return this;
    };

    return AppView;

  })(Backbone.View);

  window.AddPostView = (function(_super) {

    __extends(AddPostView, _super);

    function AddPostView() {
      AddPostView.__super__.constructor.apply(this, arguments);
    }

    AddPostView.prototype.el = "#add_post";

    AddPostView.prototype.events = {
      "submit #new_post_form": "addPost",
      "click #submit_post": "addPost"
    };

    AddPostView.prototype.addPost = function(e) {
      var add_post_el, new_post, text;
      e.preventDefault();
      add_post_el = this.$el.find("#post_message");
      text = add_post_el.val();
      new_post = new Post({
        message: text,
        starred: false
      });
      new_post.save({
        message: text,
        starred: false
      }, {
        success: function(model, res) {
          add_post_el.val("");
          return Posts.add(new_post);
        },
        error: function(model, res) {
          if (((res != null ? res.status : void 0) != null) && res.status === 0) {
            return alert("Can't connect to internet");
          } else if ((res.status != null) && res.status === 400) {
            return alert("Invalid input");
          } else if (res instanceof Object) {
            return alert("Sorry some unknown error occurred");
          } else {
            return alert(res);
          }
        }
      });
      return {
        render: function() {
          return this;
        }
      };
    };

    return AddPostView;

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
      this.model.save();
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
