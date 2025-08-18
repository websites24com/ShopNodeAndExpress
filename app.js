const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Tell Express to use Pug and the views folder
app.set('view engine', 'ejs');
app.set('views', 'views')
//app.set('views', path.join(__dirname, 'views')); // safer than string
//app.locals.basedir = path.join(__dirname, 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

const errorController = require('./controllers/error');
const sequelize = require('./util/db');
const Product = require('./models/product');
const User = require('./models/user');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

app.use(errorController.get404);

sequelize
// force: true in dev to recreate changes
// .sync({force: true})
   .sync({alter:true})
    .then(result => {
        //  console.log(result);
        return User.findByPk(1);
   
    })
    .then(user => {
        if(!user) {
            return User.create({name: 'Alex', email: 'test@test.com'})
        }
        return user;
    })
    .then(user => {
        console.log(user);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    })


