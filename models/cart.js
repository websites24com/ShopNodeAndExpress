// Import the built-in 'fs' (File System) module from Node.js.
// This allows us to read from and write to files on the server's disk.
const fs = require('fs');

// Import the built-in 'path' module from Node.js.
// This helps us work with file and directory paths in a way that works
// on all operating systems (Windows, macOS, Linux).
const path = require('path');

// Build the full absolute path to the cart.json file where we store our cart data.
// 1. path.dirname(process.main.filename) → gets the folder of the main script
//    that started our Node.js application (usually app.js or server.js).
// 2. 'data' → the subfolder where our data files are stored.
// 3. 'cart.json' → the file where the cart data will be saved.
// 4. path.join(...) → combines all parts into one clean, OS-friendly path.
const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
);

// Export a class named 'Cart' so it can be imported and used in other files.
module.exports = class Cart {
  
  // 'static' means we can call this method directly on the Cart class
  // without having to create a new Cart instance.
  // This method adds a product to the cart based on its ID and price.
  static addProduct(id, productPrice) {

    // Step 1: Fetch the current cart from cart.json
    // --------------------------------------------
    // Read the cart.json file asynchronously.
    fs.readFile(p, (err, fileContent) => {

      // We create a default cart object in case the file does not exist
      // or an error occurs while reading it.
      // The default cart starts empty with total price set to 0.
      let cart = { products: [], totalPrice: 0 };

      // If there is NO error reading the file (err === null),
      // it means the file exists, so we parse its JSON content
      // and store it in the 'cart' variable.
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Step 2: See if the product already exists in the cart
      // -----------------------------------------------------
      // Find the index of the product with the same 'id' in cart.products.
      // If found, existingProductIndex will be >= 0, otherwise it will be -1.
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );

      // If a product is found, this will store the actual product object.
      // If not found, this will be undefined.
      const existingProduct = cart.products[existingProductIndex];

      // We'll store the new/updated product in this variable.
      let updatedProduct;

      // Step 3: Add new product or increase quantity
      // --------------------------------------------
      if (existingProduct) {
        // If the product is already in the cart:
        // 1. Copy its data into updatedProduct (spread operator {...existingProduct})
        updatedProduct = { ...existingProduct };
        // 2. Increase the quantity by 1
        updatedProduct.qty = updatedProduct.qty + 1;
        // 3. Make a shallow copy of the products array
        cart.products = [...cart.products];
        // 4. Replace the old product with the updated one
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        // If the product is NOT in the cart:
        // 1. Create a new product object with id and qty=1
        updatedProduct = { id: id, qty: 1 };
        // 2. Add the new product to the cart by creating a new array
        cart.products = [...cart.products, updatedProduct];
      }

      // Step 4: Update the total price
      // ------------------------------
      // '+productPrice' → The '+' in front converts productPrice to a number
      // (in case it's a string, e.g., from form input).
      cart.totalPrice = cart.totalPrice + +productPrice;

      // Step 5: Save the updated cart back to cart.json
      // -----------------------------------------------
      // JSON.stringify(cart) → convert the JS object back into a JSON string.
      fs.writeFile(p, JSON.stringify(cart), err => {
        // Log any error if writing fails (null means success).
        console.log(err);
      });
    });
  }
};
