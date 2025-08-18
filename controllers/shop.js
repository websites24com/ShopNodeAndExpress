const Product = require('../models/product')
const Cart = require('../models/cart')

// GET /shop/product-list
exports.getProducts = (req, res, next) => {
Product.findAll()
.then(products => {
res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All products',
    path: '/products',
})
})
  .catch(err => console.log(err))
};

// GET individual product /products/:productId

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then(product => {
    console.log('Product details', product)
    res.render('shop/product-detail',
    { product: product,
      pageTitle: product.title,
      path: '/products'
  })
  }) 

  .catch(err => console.log(err));
    
  
  
}

// GET /shop/index

exports.getIndex = (req, res, next) => {
Product.findAll()
.then(products => {
  res.render('shop/index', {
    prods: rows,
    pageTitle: 'Shop',
    path: '/',
}
  )
}) 
.catch(err => console.log(err))

  
};

// GET /shop/cart

exports.getCart = (req, res, next) => {

    Cart.getCart(cart => {
      Product.fetchAll(products => {
        const cartProducts = [];
        for (product of products) {
          const cartProductsData = cart.products.find(prod => prod.id === product.id)
          if (cartProductsData) {
            cartProducts.push({productData: product, qty: cartProductsData.qty})
          }
    
        }
        res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts
      })
      
    });

    
  });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
      Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  })
  
}

// GET /shop/checkout

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
