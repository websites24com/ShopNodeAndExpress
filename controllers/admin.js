// Import class

const Product = require('../models/product')



// GET /admin/add-product
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/edit-product',
    editing: false
    
  });
};

// POST /admin/add-product
exports.postAddProduct = (req, res, next) => {
const { title, imageUrl, description, price } = req.body
const product = new Product(null, title, imageUrl, description, price);
product
.save()
.then(() => {
  res.redirect('/')
})
.catch(err => console.log(err))
};

// GET /admin/edit-product
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  
  Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing: editMode,
    product: product
  })
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};



// GET /admin/products
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products',
   
  });
});
};

// POST /admin/delete-product

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products')
}


