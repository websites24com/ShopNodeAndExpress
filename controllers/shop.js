const Product = require('../models/product')

// GET /shop/product-list
exports.getProducts = (req, res, next) => {
Product.fetchAll((products) => {
    res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All products',
    path: '/products',
    
  });
});
  
};

// GET individual product /products/:productId

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log('Individual product', prodId);
  res.redirect('/');
}

// GET /shop/index

exports.getIndex = (req, res, next) => {
Product.fetchAll((products) => {
    res.render('shop/index', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
   
  });
});
  
};

// GET /shop/cart

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
  });
};

// GET /shop/cart

exports.getCheckout = (req, res, next) => {

    res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
   
  });  
};

// GET /shop/orders

exports.getOrders = (req, res, next) => {

    res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
   
  });  
};
