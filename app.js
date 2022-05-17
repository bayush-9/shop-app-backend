const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose=require('mongoose')

const productRoutes = require('./Api/routes/products');
const ordersRoutes = require('./Api/routes/orders');

mongoose.connect("mongodb+srv://AyushBharsakle:ayush123@cluster0.azu9l.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-COntrol-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET',);
        return res.status(200).json({});
    }
    next();
})


app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    })
})


module.exports = app;