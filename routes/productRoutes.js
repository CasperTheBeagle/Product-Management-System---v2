const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path} at ${new Date()}`);
  next();
});

router.use(productController.connectToMongoDB);

// API Endpoint: ดึงรายการสินค้า
router.get('/products', productController.getAllProducts);

// API Endpoint: เพิ่มสินค้าใหม่
router.post('/products', productController.createProduct);

// API Endpoint: แก้ไขสินค้า
router.put('/products/:id', productController.updateProduct);

// API Endpoint: ลบสินค้า
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
