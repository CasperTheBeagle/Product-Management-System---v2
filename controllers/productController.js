// สร้างตัวแปรเพื่อเก็บ JSON Array ใน RAM ของเซิร์ฟเวอร์
const products = [];

// API Endpoint: ดูรายการ
function getAllProducts(req, res) {
  res.json(products);
}

// API Endpoint: เพิ่ม
function createProduct(req, res) {
  const { name, category, price, stock } = req.body;
  const product = {
    id: products.length + 1,
    name,
    category,
    price,
    stock,
  };
  products.push(product);
  res.status(201).json(product);
}

// API Endpoint: แก้ไข
function updateProduct(req, res) {
  const id = parseInt(req.params.id);
  const { name, category, price, stock } = req.body;
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'สินค้าไม่พบ' });
  }

  products[productIndex] = {
    ...products[productIndex],
    name,
    category,
    price,
    stock,
  };

  res.json(products[productIndex]);
}

// API Endpoint: ลบ
function deleteProduct(req, res) {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'สินค้าไม่พบ' });
  }

  products.splice(productIndex, 1);

  res.status(204).send();
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
