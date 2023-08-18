import express from 'express';
const router = express.Router();

import userModule from './modules/user';
router.use('/users', userModule);

import categoryApi from './modules/category';
router.use('/categories', categoryApi);

import productApi from './modules/product';
router.use('/products', productApi);

import purchaseApi from './modules/purchase';
router.use('/purchase', purchaseApi)

export default router;
