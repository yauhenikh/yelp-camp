var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var middleware = require("../middleware");

// root route
router.get("/", function(req, res) {
    res.render("landing");
});


// show register form
router.get("/register", function(req, res) {
    res.render("register", {page: 'register'});
});

// handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({ 
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar
    });
    
    if (req.body.adminCode === process.env.ADMIN_CODE) {
        newUser.isAdmin = true;
    }
    
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("register");
        } else {
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Welcome to YelpCamp " + user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

// show login form
router.get("/login", function(req, res) {
    res.render("login", {page: 'login'});
});

// handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Successfully logged in"
}), function(req, res) {
});

// logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

// SHOW USER ROUTE
router.get("/users/:id", function(req, res) {
     User.findById(req.params.id, function(err, foundUser) {
         if (err) {
             req.flash("error", "User not found");
             console.log(err);
             res.redirect("back");
         }
         Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds) {
             if (err) {
                 req.flash("error", "Something went wrong");
                 console.log(err);
                 res.redirect("back");
             }
             res.render("users/show", {user: foundUser, campgrounds: campgrounds});
         });
     });
});

// EDIT USER ROUTE
router.get("/users/:id/edit", middleware.checkProfileOwnership, function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if (err) {
            req.flash("error", "User not found");
            console.log(err);
            res.redirect("back");
        } else {
            res.render("users/edit", {user: foundUser});
        }
    });
});

// UPDATE USER ROUTE
router.put("/users/:id", middleware.checkProfileOwnership, function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser) {
        if (err) {
            req.flash("error", "User not found");
            res.redirect("back");
        } else {
            req.flash("success", "Profile updated");
            res.redirect("/users/" + req.params.id);
        }
    });
});


module.exports = router;