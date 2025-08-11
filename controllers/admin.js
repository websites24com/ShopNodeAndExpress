// Import class

const Product = require('../models/product')

// GET /admin/add-product
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

// GET /admin/add-product
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

// POST /admin/add-product
exports.postAddProduct = (req, res, next) => {
const { title, imageUrl, description, price } = req.body
const product = new Product(title, imageUrl, description, price);
product.save();
res.redirect('/');
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


