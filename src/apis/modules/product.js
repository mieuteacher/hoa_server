
import express from "express";
const router = express.Router();

import multer from "multer";

const imgProductStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, `product_${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
  })
  
const productUpload = multer({ storage: imgProductStorage })

import productController from "../../controllers/product.controller";
router.post("/",productUpload.single('imgs'), productController.create)
router.get('/',productController.searchByName)
router.get("/", productController.readMany)
router.get('/', productController.findMany)
router.delete("/:id", productController.deleteProduct)
router.patch("/:id", productController.editProduct)
router.get('/:id', productController.findById)
router.get('/product-detail/:id', productController.findById)
module.exports = router;