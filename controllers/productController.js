const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2;
const path = require('path');

const fs = require('fs');
const createProduct = async (req, res) => {
    req.body.user = req.user.userId
    req.body.price= req.body.price*100
    //console.log(req.body)
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({product})
}
const getAllProducts = async (req, res) => {
    const products = await Product.find({})
    res.status(StatusCodes.OK).json(products)
}
const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({_id: req.params.id}).populate('reviews')
    if (!product) throw new CustomError.NotFoundError('product not found')
    res.status(StatusCodes.OK).json(product)
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
    const images = [];
    for (const file of req.files.image) {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            use_filename: true,
            folder: 'Ecommerce-uploads',
        });
        fs.unlinkSync(file.tempFilePath);
        images.push({ src: result.secure_url });
    }
    return res.status(StatusCodes.OK).json(images);
};
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