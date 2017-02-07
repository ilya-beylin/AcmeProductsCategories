var _categories = [];
var index = 0;

var db = {

getCategories : function (){
    return _categories;
},

getCategory: function(id){
  for(var i = 0; i< _categories.length; i++){
    if(_categories[i].id == id){
      return _categories[i];
    }
  }
},

insertCategory: function (name){
  _categories.push({id: index++, name: name, products: [], product_index: 0})
},

deleteCategory: function (id){
  for(var i = 0; i< _categories.length; i++){
    if(_categories[i].id == id){
      _categories.splice(i, 1);
    }
  }
},

insertProduct: function (category_id, product_name){
  var ctg = this.getCategory(category_id);
  ctg.products.push({name: product_name, id: ctg.product_index++});
},

deleteProduct: function (category_id, product_id){
  var ctg = this.getCategory(category_id);
  for(var i = 0; i < ctg.products.length; i++){
      if(ctg.products[i].id == product_id){
        ctg.products.splice(i,1);
      }
  }
}

};


db.insertCategory("Sports");
db.insertCategory("Arts");
db.insertCategory("Countries");

db.insertProduct(0, "Football");
db.insertProduct(0, "Soccer");
db.insertProduct(0, "Volleyball");

db.insertProduct(1, "Painting");
db.insertProduct(1, "Theater");
db.insertProduct(1, "Ballet");
db.insertProduct(1, "Opera");
db.insertProduct(1, "Rock");

db.insertProduct(2, "USA");
db.insertProduct(2, "Russia");
db.insertProduct(2, "Israel");
db.insertProduct(2, "Iran");


module.exports = db;
