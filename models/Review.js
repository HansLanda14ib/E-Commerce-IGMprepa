const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
    {
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, 'Please provide rating'],
        },
        title: {
            type: String,
            trim: true,
            required: [true, 'Please provide review title'],
            maxlength: 100,
        },
        comment: {
            type: String,
            required: [true, 'Please provide review text'],
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    {timestamps: true}
);
/*
The 1 indicates that the index is in ascending order. In ascending order,
the index sorts values from lowest to highest.
The { unique: true } option specifies that the combination of product and user must be unique
across all records in the Review collection. In other words,
it enforces that each user can only leave one review for a specific product.
If you attempt to insert a new review with the same product and user values as an existing review,
MongoDB will reject the insertion and throw a duplicate key error.
*/

ReviewSchema.index({product: 1, user: 1}, {unique: true});




ReviewSchema.statics.calculateAverageRating = async function (productId) {
    const result = await this.aggregate([
        {$match: {product: productId}},
        {
            $group: {
                _id: null,
                averageRating: {$avg: '$rating'},
                numOfReviews: {$sum: 1},
            },
        },
    ]);

    try {
        await this.model('Product').findOneAndUpdate(
            {_id: productId},
            {
                averageRating: Math.ceil(result[0]?.averageRating || 0),
                numOfReviews: result[0]?.numOfReviews || 0,
            }
        );
    } catch (error) {
        console.log(error);
    }
};

ReviewSchema.post('save', async function () {
    await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post('remove', async function () {
    await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('Review', ReviewSchema);
