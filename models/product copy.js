const fs = require('fs');
const path = require('path')
const Cart = require('./cart');

 const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');

 const products = [];

// “when you call me, give me a function I can run later”
// ▶ Call getProductsFromFile(cb)
//    ↓
// ▶ Start reading products.json (fs.readFile)
//    ↓
// ⏳ Wait until file read is done
//    ↓
// 📂 File read success → parse JSON
//    ↓
// 🏁 Call cb(parsedData) → runs the function you passed in


 const getProductsFromFile = (cb) => {
   fs.readFile(p, (err, fileContent) => {
            if (err) {
               return cb([]);
            } else {
                cb(JSON.parse(fileContent));
            }
        })
 }

module.exports = class Product {
    constructor(id, title, imageUrl, description, price ) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price
    }

   save() {
    // Step 1: Load the current list of products from products.json
    // getProductsFromFile is asynchronous and will call our callback (arrow function)
    // once the file has been read and parsed into an array.
    getProductsFromFile(products => {

        // Step 2: Check if this product object already has an id
        // - If it has an id → this means we're trying to UPDATE an existing product.
        // - If it doesn't have an id → we will ADD it as a new product.
        if (this.id) {

            // Step 3: Find the index of the existing product with the same id
            // products.findIndex(...) loops over the array and returns the position
            // (0, 1, 2, ...) of the product where prod.id === this.id.
            // If no match is found, it returns -1.
            const existingProductIndex = products.findIndex(
                prod => prod.id === this.id
            );

            // Step 4: Make a shallow copy of the products array
            // Using the spread operator `...` creates a new array with the same elements.
            // This avoids mutating the original `products` array directly.
            const updatedProducts = [...products];

            // Just for debugging: log the copied array to the console
            console.log('Updated Products', updatedProducts);

            // Step 5: Replace the old product at the found index with this updated product object.
            // `this` refers to the current Product instance on which save() is being called.
            // This ensures the product data is replaced, not duplicated.
            updatedProducts[existingProductIndex] = this;

            // Step 6: Save the updated array back to the products.json file.
            // JSON.stringify turns the array into a JSON string before writing.
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                // If there is an error during write, it will be logged here.
                console.log(err);
            });

        } else {
            // Step 7: If there is no id yet, this is a NEW product.
            // Assign a random id string to uniquely identify this product in the future.
            this.id = Math.random().toString();

            // Step 8: Add this new product object to the current products array.
            products.push(this);

            // Step 9: Save the updated products array (including the new product) back to file.
            fs.writeFile(p, JSON.stringify(products), (err) => {
                // If there's an error writing the file, log it here.
                console.log(err);
            });
        }
    });
}

    static deleteById(id) {
        getProductsFromFile(products => {
        const product = products.find(prod => prod.id === id)
        const updatedProducts = products.filter(prod => prod.id !== id)
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
            if(!err) {
                Cart.deleteProduct(id, product.price)
            }
        })
        })
    };


    static fetchAll(cb) {
        getProductsFromFile(cb)
        return products;
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id = id)
            cb(product);
        })

    }
}