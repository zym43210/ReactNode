
const express = require("express");
const ProductRoutes = express.Router();

const verify = require('../../../middleware/verifyToken')

const Products = require("../../../models/products");

ProductRoutes.post("/add",verify,(req,res)=> {
    let products = new Products(req.body);
    products.save().then(products => {
        res.status(200).json({ 'products': 'products added' });
    })
        .catch(err => {
            res.status(400).send("unable to save to db");
        });
});

ProductRoutes.get('/',verify,(req, res) =>{
    Products.find(function(err, products){
    if(err){
      console.log(err);
    }
    else {
      res.json(products)
    }
  })
});


ProductRoutes.get('/edit/:id',verify,(req, res)=> {
  let id = req.params.id;
  Products.findById(id, function (err, products){
      res.json(products);
  });
});


ProductRoutes.post('/update/:id',verify,(req, res)=> {
    Products.findById(req.params.id, function(err, products) {
    if (!products)
      res.status(404).json("data is not found");
    else {
        products.name = req.body.name;
        products.number = req.body.number;

        products.save().then(products => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).json("unable to update the database");
      });
    }
  });
});


ProductRoutes.get('/delete/:id',verify,(req, res)=> {
    Products.findByIdAndRemove({_id: req.params.id}, function(err, products){
        if(err) res.json(err);
        else res.json({ removedId: req.params.id }) 
        console.log(req.params);
    });
});

module.exports = ProductRoutes;




