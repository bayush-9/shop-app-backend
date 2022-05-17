const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product.js');

router.get('/', (req, res, next) => {
    Product.find().exec().then(
        result => {
            const response = {
                count: result.length,
                product: result.map(results => {
                    return {
                        _id : results._id,
                        title: results.title,
                        price: results.price,
                        description : results.description,
                        imageUrl:results.imageUrl,
                        isFavourite:results.isFavourite
                    }
                }),
            }
            res.status(200).json(response);
        }
    ).catch(err => {
        console.log(err);
        res.status(500).json({ error: err })
    })
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        price: req.body.price,
        description : req.body.description,
        imageUrl : req.body.imageUrl, 
        isFavourite : req.body.isFavourite,
    });
    product.save()
        .then(result => {
            console.log(result); res.status(200).json({
                message: 'Handling POST creation successful',
                createdProduct: {
                    title: result.title,
                    price: result.price,
                    id: result._id
                },
            })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err,
                    });
                });

        })
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).select('name price _id').exec().then(document => {
        console.log(document);
        if (document != null) {
            res.status(200).json({ document });
        }
        else {
            res.status(404).json({ message: "NO VALID ENTRY POINT." });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    let updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
        console.log(updateOps[ops.propName]
        );
        console.log(ops.value);

    }
    Product.updateOne({
        _id: id,
    }, { $set: updateOps }).exec().then(result => {
        console.log(result);
        res.status(200).json(result)
    }).catch(err => { console.log(err) });

});

router.delete('/:productId', (req, res, next) => {
    Product.remove({ _id: req.params.productId }).then(result => {
        res.status(200).json(result);
    });

});

module.exports = router;