const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true });

// ฟังก์ชันเชื่อมต่อ MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('เชื่อมต่อกับ MongoDB สำเร็จ');
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับ MongoDB:', error);
  }
}

// ฟังก์ชันดึงรายการสินค้าทั้งหมด
async function getAllProducts(req, res) {
  try {
    const db = client.db('your-database-name');
    const collection = db.collection('your-collection-name');
    const products = await collection.find({}).toArray();
    res.json(products);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงรายการสินค้า:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงรายการสินค้า' });
  }
}

// ฟังก์ชันเพิ่มสินค้าใหม่
async function createProduct(req, res) {
  const newProduct = req.body;
  try {
    const db = client.db('your-database-name');
    const collection = db.collection('your-collection-name');
    const result = await collection.insertOne(newProduct);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเพิ่มสินค้าใหม่:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเพิ่มสินค้าใหม่' });
  }
}

// ฟังก์ชันแก้ไขสินค้า
async function updateProduct(req, res) {
  const id = req.params.id;
  const updatedProduct = req.body;
  
  try {
    const db = client.db('your-database-name');
    const collection = db.collection('your-collection-name');
    const result = await collection.updateOne({ id }, { $set: updatedProduct });
    
    if (result.matchedCount === 0) {
      res.status(404).json({ error: 'สินค้าไม่พบ' });
    } else {
      res.json(updatedProduct);
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการแก้ไขสินค้า:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการแก้ไขสินค้า' });
  }
}

// ฟังก์ชันลบสินค้า
async function deleteProduct(req, res) {
  const id = req.params.id;
  
  try {
    const db = client.db('your-database-name');
    const collection = db.collection('your-collection-name');
    const result = await collection.deleteOne({ id });
    
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'สินค้าไม่พบ' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการลบสินค้า:', error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการลบสินค้า' });
  }
}

module.exports = {
  connectToMongoDB,
  getAllProducts,
  createProduct,
  updateProduct, // เพิ่มฟังก์ชันการแก้ไข
  deleteProduct, // เพิ่มฟังก์ชันการลบ
};


