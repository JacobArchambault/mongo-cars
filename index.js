/*   database: makewaves    Create, Retrieve,    */
var express = require('express');
var app = express();

var Item = require('./modules/Cars.js');  // our Item model

app.get('/', function (req, res) {  // you can only add this data once 
    var allItems = [
        { name: "Beach Towel", quantity: 3, cost: 15.25 },
        { name: "Shark-tooth Necklace", quantity: 2, cost: 5.35 },
        { name: "Boogie Board", quantity: 4, cost: 25.75 },
        { name: "Flip Flops", quantity: 2, cost: 11.25 },
        { name: "Seashells", quantity: 22, cost: 1.25 }
    ];

    Item.collection.insert(allItems, function (err, docs) {
        if (err) {
            console.log(err);

        } else {
            Item.count({}, function (err, count) {
                console.log("Number of items:", count);
            })
        }
    });
    res.end();   // terminate request
});

app.use('/showall', function (req, res) {

    Item.find(function (err, foundItems) {   // Model.find(), returns foundItems 
        if (err) {
            res.type('html').status(500);
            res.send('Error: ' + err);     // res.send() terminates request
        }
        else {
            for (var i = 0; i < foundItems.length; i++) {
                res.write("<p>" + foundItems[i].name + " $" + foundItems[i].cost + "</p>");
            }
            res.end();   // terminate request   
        }
    });
})

app.listen(3000, function () {
    console.log('Listening on port 3000, ctrl-c to quit');
});
