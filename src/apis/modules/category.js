import express from "express";
const router = express.Router();

import categoryController from '../../controllers/category.controller';
import categoryMiddleware from "../../middlewares/category.middleware";

router.post('/',categoryMiddleware.createValidate, categoryController.create);
router.get('/', categoryMiddleware.readManyValidate, categoryController.readMany);
router.patch('/:categoryId',categoryMiddleware.updateValidate, categoryController.update);
router.get("/:category_id", categoryController.findByCategory);
router.get('/', categoryController.findAllCategories);

module.exports = router;