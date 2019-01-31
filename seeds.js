var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");
    
var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm9.staticflickr.com/8848/18338163241_b0bb10f419.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rhoncus mollis leo, quis euismod mauris blandit non. In ac metus eu lacus ultrices egestas. Nunc commodo eget arcu in maximus. Donec iaculis ultricies sem, non ultrices justo egestas a. Nunc interdum pellentesque libero at faucibus. Pellentesque euismod vulputate erat, rhoncus auctor enim scelerisque ut. Morbi nec orci cursus, sollicitudin lorem id, fringilla neque. Nulla sed consequat enim. Sed sollicitudin justo in ligula aliquet luctus. Aenean tincidunt felis eros, quis mollis metus pretium et. Praesent in eleifend urna, et egestas nisi."
    },
    {
        name: "Desert Mesa",
        image: "https://farm5.staticflickr.com/4022/5148295839_7e5c97a5a1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rhoncus mollis leo, quis euismod mauris blandit non. In ac metus eu lacus ultrices egestas. Nunc commodo eget arcu in maximus. Donec iaculis ultricies sem, non ultrices justo egestas a. Nunc interdum pellentesque libero at faucibus. Pellentesque euismod vulputate erat, rhoncus auctor enim scelerisque ut. Morbi nec orci cursus, sollicitudin lorem id, fringilla neque. Nulla sed consequat enim. Sed sollicitudin justo in ligula aliquet luctus. Aenean tincidunt felis eros, quis mollis metus pretium et. Praesent in eleifend urna, et egestas nisi."
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/331/31542574131_91e705a183.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rhoncus mollis leo, quis euismod mauris blandit non. In ac metus eu lacus ultrices egestas. Nunc commodo eget arcu in maximus. Donec iaculis ultricies sem, non ultrices justo egestas a. Nunc interdum pellentesque libero at faucibus. Pellentesque euismod vulputate erat, rhoncus auctor enim scelerisque ut. Morbi nec orci cursus, sollicitudin lorem id, fringilla neque. Nulla sed consequat enim. Sed sollicitudin justo in ligula aliquet luctus. Aenean tincidunt felis eros, quis mollis metus pretium et. Praesent in eleifend urna, et egestas nisi."
    }
];
    
function seedDB() {
    // Remove all campgrounds
    Campground.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds!");
            // Add a few campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        // Create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;