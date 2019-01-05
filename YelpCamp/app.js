var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/campgrounds"),
    Users = require("./models/campgrounds");

mongoose.connect("mongodb://localhost/demon");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema setup

// var campgroundSchema = new mongoose.Schema({
//   name: String,
//   image: String,
//   description: String
// });
//
// var Campground = mongoose.model("Campground", campgroundSchema);



app.get("/", function(req, res){
  res.render("landing");
});


// GET / campgrounds
//INDEX ROUTE
app.get("/campgrounds", function(req, res){
//Get all campgrounds from DB
Campground.find({}, function(err, allcampgrounds){
  if(err){
    console.log(err);
  }
  else{
    res.render("index", {campgrounds : allcampgrounds});
  }
});
});

// POST / campgrounds
//CREATE route

app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCamp = {name: name, image: image, description: description};
  //Create new campground and save to database
  Campground.create(newCamp, function(err, newlycreated){
    if(err){
      console.log(err);
    }
    else{
      //redirect back to campgroundpage
      res.redirect("/campgrounds");
    }
  });
});


//GET add camp
//new camp
app.get("/campgrounds/new", function(req,res){
  res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
  //find campground with provided id
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    }
    else{
      res.render("show", {campground: foundCampground});
    }
  });
  //render show template with campground

});


app.listen(3000, () => console.log('App started'));
