const Order = require('../models/Order');
const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {checkPermissions} = require('../utils');
const stripe = require('stripe')(process.env.STRIPE_KEY);

const createOrder = async (req, res) => {
    console.log(req.body);
    const {cart, total_amount, shipping_fee} = req.body;

    if (!cart || cart.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided');
    }
    if (!total_amount || !shipping_fee) {
        throw new CustomError.BadRequestError(
            'Please provide total_amount and shipping fee'
        );
    }

    let orderItems = [];
    let subtotal = 0;

    for (const item of cart) {
        const dbProduct = await Product.findOne({_id: item.id});
        if (!dbProduct) {
            throw new CustomError.NotFoundError(
                `No product with id : ${item.id}`
            );
        }
        // verifiy inventory
        if (item.amount > dbProduct.inventory) {
            throw new CustomError.BadRequestError(
                `There is not enough ${dbProduct.name} in stock.`
            );
        }
        const {name, price, images, _id} = dbProduct;
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            image: images[0],
            product: _id,
        };
        // add item to order
        orderItems = [...orderItems, singleOrderItem];
        // calculate subtotal
        subtotal += item.amount * price;
        // update inventory
        dbProduct.inventory -= item.amount;
        await dbProduct.save();


    }
    // calculate total
    const total = shipping_fee + subtotal;
    // get client secret
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
    });


    const order = await Order.create({
        orderItems,
        total,
        subtotal,
        shippingFee: shipping_fee,
        clientSecret: paymentIntent.client_secret,
        user: req.user.userId,
    });
    console.log({order, clientSecret: order.clientSecret})

    res
        .status(StatusCodes.CREATED)
        .json({order, clientSecret: order.clientSecret});
};
const getAllOrders = async (req, res) => {
    const orders = await Order.find({});
    res.status(StatusCodes.OK).json({orders, count: orders.length});
};
const getAllOrdersByClient = async (req, res) => {
    const {id: clientId} = req.params;
    const orders = await Order.find({user: clientId});
    res.status(StatusCodes.OK).json({orders, count: orders.length});
};
const getSingleOrder = async (req, res) => {
    const {id: orderId} = req.params;
    const order = await Order.findOne({_id: orderId});
    if (!order) {
        throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
    }
    checkPermissions(req.user, order.user);
    res.status(StatusCodes.OK).json({order});
};
const getCurrentUserOrders = async (req, res) => {
    const orders = await Order.find({user: req.user.userId}).sort({
        createdAt: -1,
    });

    res.status(StatusCodes.OK).json({orders, count: orders.length});
};
const updateOrder = async (req, res) => {
    const {id: orderId} = req.params;
    const {paymentIntentId} = req.body;

    const order = await Order.findOne({_id: orderId});
    if (!order) {
        throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
    }
    checkPermissions(req.user, order.user);

    order.paymentIntentId = paymentIntentId;
    order.status = 'paid';
    await order.save();

    res.status(StatusCodes.OK).json({order});
};

module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
    getAllOrdersByClient,
};
