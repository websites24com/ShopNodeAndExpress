const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Tell Express to use Pug and the views folder
app.set('view engine', 'ejs');
app.set('views', 'views')
//app.set('views', path.join(__dirname, 'views')); // safer than string
//app.locals.basedir = path.join(__dirname, 'views');
//
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

// 404 page (now rendered from Pug)
app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(3000);
