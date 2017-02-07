/* Provide middleware */
const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/', function(req, res, next){
  res.render('categories', {title: 'Categories', categories: db.getCategories()});
});

router.post('/', function(req, res, next){
  db.insertCategory(req.body.name);
  res.redirect('/');
});

router.delete('/:id', function(req, res, next){
  db.deleteCategory(req.params.id * 1);
  res.redirect('/');
});

router.get('/category/:id', function(req, res, next){
  res.render('category', {title: db.getCategory(req.params.id * 1).name, products: db.getCategory(req.params.id * 1).products, categories: db.getCategories(), category: db.getCategory(req.params.id * 1)});
});

router.delete('/category/:cid/:pid', function(req, res, next){
  db.deleteProduct(req.params.cid * 1, req.params.pid *1);
  res.redirect('/category/' + req.params.cid);
});

router.post('/category/:cid', function(req, res, next){
  db.insertProduct(req.params.cid * 1, req.body.name);
  res.redirect('/category/' + req.params.cid);
});



/*
router.patch('/:id', function(req, res, next){
  res.render('productEdit', {title: 'Edit Product', id: req.params.id * 1, product: products.getProduct(req.params.id * 1)});
});

router.post('/edit-product/:id', function(req, res, next){
  var product = req.body.name;
  var id = req.params.id * 1;
  products.editProduct(id, product);
  res.redirect('/');
});

router.post('/new_product', function(req, res) {
  var product = req.body.product;
  products.addProduct(product);
  res.redirect('/');
});
*/

module.exports = router;
