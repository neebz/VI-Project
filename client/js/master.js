(function() {
  var Posts,
    __hasProp = Object.prototype.hasOwnProperty,
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

  Posts = new PostsCollection;

  window.AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.el = "#app_view";

    AppView.prototype.initialize = function() {
      var self;
      self = this;
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
      e.preventDefault();
      return console.log("add new post in Posts");
    };

    AppView.prototype.render = function() {
      console.log(this.el);
      return Posts.forEach(function(p) {
        var a;
        a = new PostView(p);
        return this.$el.append(a.html);
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

    PostView.prototype.render = function() {
      var template;
      template = _.template($(templateId).html());
      this.$el.html(template(this.model.toJSON()));
      return this;
    };

    return PostView;

  })(Backbone.View);

}).call(this);
