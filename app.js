var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/restful_blog_app");
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
//title
//image
//body

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: 
        {
            type:Date, 
            default: Date.now
            
        }
});

var Blog = mongoose.model("Blog", blogSchema);

/*
Blog.create({
    title: "Test Blog",
    image: "https://images.unsplash.com/photo-1518065336951-d16c043900d6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=05f800ba4e6c18a40a8f7cf12cdd2c35&auto=format&fit=crop&w=500&q=60",
    body: "hello my friend"
});
*/

//restful routes
app.get("/", function(req,res){
    res.redirect("/blogs");
});

//index route
app.get("/blogs", function(req,res){
    Blog.find({}, function(err,blogs){
       if(err){
           console.log("Error!");
       } else{
           res.render("index", {blogs: blogs});
       }
    });
    
});

//New Route
app.get("/blogs/new", function(req,res){
   res.render("new"); 
});

//Create Route
app.post("/blogs", function(req,res){
   //create blog
   Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           res.render("new");
       } else{
           res.redirect("/blogs");
       }
   });
   //redirect to index
});

//show route
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else{
           res.render("show", {blog: foundBlog});
       }
    });
});

//edit
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

//update

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("blog app has started");
});