
#
# Module dependencies.
#

express = require("express")
routes = require("./routes")
db = require './models/db'

app = module.exports = express.createServer()

# Configuration

app.configure ->
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static(__dirname + "/client")

app.configure "development", ->
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )

app.configure "production", ->
  app.use express.errorHandler()

# DB initialize
db.initialize()

# Routes
app.get "/", routes.index
app.get "/posts", routes.posts.read
app.post "/posts", routes.posts.create

#run app
app.listen 3000, ->
  console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env