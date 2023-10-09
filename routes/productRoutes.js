const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path} at ${new Date()}`);
  next();
});

router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
