A Sample Web Application using Node.js, Express.js, Backbone.js, Underscore.js and MongoDB.

# Some Points:

- I haven't binded the Posts list view rendering with the collection remove/reset methods. Primarily because in that case any change in the collection will render the whole list view all over. This is not good performance-wise and could turn out to be a headache when you want to add infinite scrolling

- All Coffee Script files are joined into one master.js. Run run.sh to build master.js and start the server (requires npm coffee-script installed globally )