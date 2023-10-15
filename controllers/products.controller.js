var extend = require('express');

let ProductModel = require('../models/product.model');

// add new product
module.exports.save = async (req, res) => {
    try{
        const product = new ProductModel(req.body);
        let result = await product.save();
        res.json(result)
    } catch(error){
        res.json({message:  error.message})
    }
}

// get all product or get product by id
module.exports.find = async (req, res) => {
    try{
        let result = await ProductModel.find(req.params);
        res.json(result)
    } catch(error){
        res.json({message:  error.message})
    }
}

// update product by id
module.exports.update = async (req, res) => { 
    try{
        const id = req.params;
        const product = await ProductModel.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.json({message : 'cannot find any product with ID ' & id});
        }
        const updatedProduct = await ProductModel.findById(id);
        res.json(updatedProduct);
    }catch(error){
        res.json({message:  error.message})
    }    
}

// delete product by id
module.exports.delete = async (req, res) => { 
    try{
        const id = req.params;
        const product = await ProductModel.findByIdAndDelete(id);
        if(!product){
            return res.json({message : 'cannot find any product with ID ' & id});
        }
        res.json(product);
    }catch(error){
        res.json({message:  error.message})
    }    
}

// delete all product
module.exports.deleteAll = (req, res) => { 
    try{
        ProductModel.deleteMany({})
        .then(data => {
            res.send({
              message: `${data.deletedCount} Products were deleted successfully!`
            });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all products."
            });
          });
    }catch(error){
        res.json({message:  error.message})
    }    
}

// find all products which name contains 'kw'
module.exports.findByName = async (req, res) => {
    try{
        let result = await ProductModel.find({},{projection : 'kw'});
        res.json(result)
    } catch(error){
        res.json({message:  error.message})
    }
}