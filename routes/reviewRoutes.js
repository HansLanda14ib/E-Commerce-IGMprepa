const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middleware/authentication')

const {
    createReview, getAllReviews, updateReview, deleteReview, getSingleReview
} = require('../controllers/reviewController');

router
    .route('/')
    .post(authenticateUser, createReview)
    .get(getAllReviews);

router
    .route('/:productId')
    .get(getAllReviews);

router
    .route('/:id')
    .get(getSingleReview)
    .patch(authenticateUser, updateReview)
    .delete(authenticateUser, deleteReview)


module.exports = router;
