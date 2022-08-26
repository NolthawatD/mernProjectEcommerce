const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// GET PRODUCT
router.route('/products').get(getAllProducts);
// ADMIN GET PRODUCT
router
  .route('/admin/products')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
// CREATE PRODUCT
router
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);
// UPDATE / DELETE PRODUCT
router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
// GET PRODUCT DETAILS
router.route('/product/:id').get(getProductDetails);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router
  .route('/reviews')
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
