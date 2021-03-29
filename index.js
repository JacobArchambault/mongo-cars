/*   database: cars4sale    Create, Retrieve,    */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var Item = require('./modules/Cars.js');  // our Item model
app.use(express.static('public'));

app.get('/', function (req, res) {  // you can only add this data once 
    var cars = [
        { cid: 1, year: 2010, make: "Honda", model: "Civic", miles: 88100, price: 10100, dealer_id: "MH228" },
        { cid: 2, year: 2009, make: "Honda", model: "Accord", miles: 25000, price: 500, dealer_id: "FC324" },
        { cid: 3, year: 1995, make: "Dodge", model: "Ram", miles: 200000, price: 36000, dealer_id: "UH351" },
        { cid: 4, year: 2001, make: "Dodge", model: "Caravan", miles: 19424, price: 2500, dealer_id: "JM102" },
        { cid: 5, year: 2019, make: "Ford", model: "Focus", miles: 3255, price: 1213, dealer_id: "YO303" },
        { cid: 6, year: 1979, make: "Kia", model: "Sport", miles: 0, price: 3465, dealer_id: "QW123" },
        { cid: 7, year: 2000, make: "Ford", model: "F150", miles: 23525, price: 50000, dealer_id: "JK985" },
        { cid: 8, year: 2020, make: "Volkswagen", model: "Beetle", miles: 9199, price: 4450, dealer_id: "NV021" },
        { cid: 9, year: 2011, make: "Subaru", model: "Outback", miles: 90909, price: 10000, dealer_id: "XV789" },
    ];

    Item.collection.insert(cars, function (err, docs) {
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
            for (let foundItem of foundItems) {
                res.write("<p>" + " " + foundItem.cid + " " + foundItem.year + " " + foundItem.model + " " + foundItem.miles + " " + foundItem.price + " " + foundItem.dealer_id + " " + "</p>");
            }
            res.end();   // terminate request   
        }
    });
})

app.post('/addCar', function (req, res) {    // Create
    var newItem = new Item({
        cid: req.body.cid,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        miles: req.body.miles,
        price: req.body.price,
        dealer_id: req.body.dealer_id,
    });

    newItem.save(function (err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send("Car successfully added.");
        }
    });
});

app.post('/findCar', function(req, res) {    // Retrieve 1

	var cid = req.body.cid
	Item.findOne( {cid: cid}, function(err, foundItem) {  // foundItem holds the document that was found
		if (err) {
		    res.status(500).send(err);
		}
		else if (!foundItem) {
		    res.send('No item with the id of ' + cid);
		}
		else {
			item = foundItem.cid + ", " + foundItem.year + ", " + foundItem.make + ", " + foundItem.model+ ", " + foundItem.miles+ ", " + foundItem.price + ", " + foundItem.dealer_id;
		    res.send(item); 
		}
	});

});

app.listen(3000, function () {
    console.log('Listening on port 3000, ctrl-c to quit');
});







// app.post('/updateItem', function(req, res) {   // Update (edit)

//     var updateName = req.body.itemName;
//     var updateQuantity = req.body.itemQuantity;
// 	var updateCost = req.body.itemCost;

//     Item.findOne( {name: updateName}, function(err, item) {  // small i item holds the document to be updated
// 		if (err) {
// 		    res.status(500).send(err);
// 		}
// 		else if (!item) {
// 		    res.send('No item with the name of ' + updateName);
// 		}
// 		else {
// 			item.quantity = updateQuantity;
// 			item.cost = updateCost;

// 			item.save(function (err) {
//                 if(err) {
//                     res.status(500).send(err);
//                 }
//             });
// 		    res.send("Update successful");
// 	   }
//     });        

// });


// app.post('/deleteItem', function(req, res) {   // Delete
// 	 var deleteName = req.body.itemName;   

// 	 Item.findOneAndRemove({name: deleteName}, function(err, item) { 
// 		if (err) {
// 		    res.status(500).send(err);
// 		}
// 		else if (!item) {
// 		    res.send('No item with the name of ' + deleteName);
// 		}
// 		else {
// 		    res.send("Item: " + deleteName + " deleted."); 
// 		}
//     });         
// });


// app.get('/addMany', function(req, res) {  // you can only add this data once 
//     var newtems = [     
//         {name: "SurfBoard", quantity: 5, cost: 215.25},   // add more items if you want
//         {name: "Flippers", quantity: 12, cost : 7.35 },
//         {name: "Diving Mask", quantity: 7, cost : 5.75 },
//         {name: "Sun Tan Oil", quantity: 15, cost : 3.25 }
//     ]; 

//     Item.collection.insert(newItems, function (err, docs) {
//         if (err){ 
//             res.status(500).send(err);
//         } 
// 		else {
// 		    res.send( "Items were added." ); 						  
//         }
//     });
// });