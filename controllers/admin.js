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
Product.create({
  title, imageUrl, description, price
}).then(result => {
  console.log("The product has been created successfully")
  res.redirect('/admin/products');   // <-- send a response so it doesn’t hang
}).catch(err => {
  console.log(err)
})
}

// GET /admin/edit-product
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  
  Product.findByPk(prodId)
  .then(product => {
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
  Product.findByPk(prodId)
  .then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    return product.save();
  }).then(result => {
    console.log('UPDATED PRODUCT!')
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err))
  
};



// GET /admin/products
exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('admin/products', {
    prods: products,
    pageTitle: 'Admin Products',
    path: '/admin/products',
  });
})
    .catch(err => {
      console.log(err)
    })
};

// POST /admin/delete-product

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product => {
    return product.destroy();
  })
  .then(result => {
    console.log('Destroyed product')
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
}


