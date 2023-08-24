const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error.js')
const User = require('./models/user.js')
// const sequelize = require('./util/database.js')
// const Product = require('./models/product.js')
// const Cart = require('./models/cart.js')
// const CartItem = require('./models/cart-items.js')

const app = express()

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js')
const shopRoutes = require('./routes/shop.js')
// const contactRoutes = require('./routes/contactus.js')
// const SUCCESSroutes = require('./routes/successroutes.js')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) =>{
    User.findById('64e7ac10a446fa92afbaddb3')
    .then(user =>{
        req.user = user;
        next()
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)
// app.use('/admin' , contactRoutes)
// app.use('/admin',SUCCESSroutes)
app.use(errorController.get404)

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem});
// Product.belongsToMany(Cart, { through: CartItem});


mongoose.connect(
    "mongodb+srv://kushwaharaj903:9lFNRLohp8GYtEoi@cluster0.lllbyqe.mongodb.net/shop?retryWrites=true&w=majority"
)
.then(result => {
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: "raj",
                email: "kk@gmiail.com",
                cart: {
                    items: []
                }
            })
            user.save()
        }
    })
    
    console.log('connected')
    app.listen(4000)
})
.catch(err => console.log(err))
