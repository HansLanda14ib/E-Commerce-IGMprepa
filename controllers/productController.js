const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2;
const path = require('path');

const fs = require('fs');
const createProduct = async (req, res) => {
    req.body.user = req.user.userId
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}
const getAllProducts = async (req, res) => {
    const products = await Product.find({}).populate('reviews')
    res.status(StatusCodes.OK).json({products, count: products.length})
}
const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id}).populate('reviews')
    if (!product) throw new CustomError.NotFoundError('product not found')
    res.status(StatusCodes.OK).json({product})
}
const updateProduct = async (req, res) => {
    const product = await Product.findOneAndUpdate({_id: req.params.id},
        req.body,

        { runValidators: true})
    if (!product) throw new CustomError.NotFoundError('product not found')
    res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id})
    if (!product) throw new CustomError.NotFoundError('product not found')
    await product.remove()
    res.status(StatusCodes.OK).json({msg: 'delete with success'})
}

const uploadImage = async (req, res) => {
    console.log(req)
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'Ecommerce-uploads',
        }
    );
    fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(StatusCodes.OK).json({image: {src: result.secure_url}});
}
const uploadImageLocal = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError('No File Uploaded');
    }
    const productImage = req.files.image;
    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please Upload Image');
    }
    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError('Please uploads image smaller 1MB');
    }
    const imagePath = path.join(
        __dirname,
        '../public/uploads/' + `${productImage.name}` // /uploads/name_image.jpg
    );
    await productImage.mv(imagePath);
    return res
        .status(StatusCodes.OK)
        .json({image: {src: `/uploads/${productImage.name}`}});
}

module.exports = {
    createProduct, getAllProducts, updateProduct, deleteProduct, uploadImage, getSingleProduct, uploadImageLocal

}