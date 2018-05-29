var express = require("express"),
     app    = express();
     
// Use EJS instead of standard HTML
app.set("view engine", "ejs");

// set public folder to static resource
app.use(express.static("public"));

// Setup routes
var indexRoutes = require("./routes/index");

// Use express routes
app.use("/", indexRoutes);

//catch all other requests
app.get("*", function(req, res) {
    res.render("home");
    
});

//Server listener
app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server Started!!!"); 
});