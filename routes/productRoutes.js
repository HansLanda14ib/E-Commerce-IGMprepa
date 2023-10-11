const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middleware/authentication')

const {
    createProduct, getAllProducts, updateProduct, deleteProduct, uploadImage, getSingleProduct,uploadImageLocal
} = require('../controllers/productController');

router
    .route('/')
    .post([authenticateUser, authorizePermissions('admin')], createProduct)
    .get(getAllProducts);
router
    .route('/uploadImage')
    .post([authenticateUser, authorizePermissions('admin')], uploadImageLocal);
router
    .route('/:id')
    .get(getSingleProduct)
    .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
    .delete([authenticateUser, authorizePermissions('admin')], deleteProduct)


module.exports = router;
