const Review = require('../models/Review')
const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const {checkPermissions} = require('../utils')

const createReview = async (req, res) => {
    const {product: productId} = req.body
    const isValidProduct = await Product.findOne({_id: productId})
    if (!isValidProduct) throw  new CustomError.NotFoundError('no product with this id')
    const alreadySubmitted = await Review.findOne({product: productId, user: req.user.userId})
    if (alreadySubmitted) throw  new CustomError.BadRequestError('already submitted review for this product')
    req.body.user = req.user.userId
    const review = await Review.create(req.body)
    res.status(StatusCodes.CREATED).json({review})


}
const getAllReviews = async (req, res) => {
    const productId = req.params.productId; // Assuming productId is in the route parameters
    try {
        const reviews = await Review.find({ product: productId })
            .populate({
                path: 'user',
                select: 'name',
            })
            .populate({
                path: 'product',
                select: 'name',
            });

        res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};


const getSingleReview = async (req, res) => {
    const {id: reviewId} = req.params
    const review = await Review.findOne({_id: reviewId})
    if (!review) throw  new CustomError.NotFoundError('no review with this id')
    res.status(StatusCodes.OK).json({review})
}
const updateReview = async (req, res) => {
    const {id: reviewId} = req.params
    const {rating, title, comment} = req.body
    const review = await review.findOne({_id: reviewId},)
    if (!review) throw  new CustomError.NotFoundError('no review with this id')
    checkPermissions(req.user, review.user)
    review.rating = rating
    review.title = title
    review.comment = comment
    await review.save()
    res.status(StatusCodes.OK)
}

const deleteReview = async (req, res) => {
    const {id: reviewId} = req.params
    const review = await Review.findOne({_id: reviewId})
    if (!review) throw  new CustomError.NotFoundError('no review with this id')
    checkPermissions(req.user, review.user)
    await review.remove()
    res.status(StatusCodes.OK).json({msg: 'Success! Review removed'});
}
module.exports = {
    createReview, getAllReviews, updateReview, deleteReview, getSingleReview

}