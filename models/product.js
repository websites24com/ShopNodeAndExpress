const fs = require('fs');
const path = require('path')

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
    constructor(title, imageUrl, description, price ) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
        products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            });
        });
      
    }

    static fetchAll(cb) {
        
        getProductsFromFile(cb)

        return products;
    }
}