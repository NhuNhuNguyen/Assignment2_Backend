var express = require('express');
var router = express.Router();
var productController = require('../controllers/products.controller')

/* GET users listing. */
router
  .get('/', productController.find)
  .post('/', productController.save)
  .delete('/', productController.deleteAll)
  .get('/', productController.findByName);;
  

router.get('/:_id', productController.find)
      .put('/:_id', productController.update)
      .delete('/:_id', productController.delete)

module.exports = router;
