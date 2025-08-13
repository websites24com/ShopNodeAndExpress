const Product = require('../models/product')
const Cart = require('../models/cart')

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
  Product.findById(prodId, product => {
    console.log(product);
    res.render('shop/product-detail',
    { product: product,
      pageTitle: product.title,
      path: '/products'
  })
  });
  
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

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
      Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
}

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
