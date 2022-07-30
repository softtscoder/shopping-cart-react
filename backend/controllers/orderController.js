import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		userId,
	} = req.body;

	if (userId !== req.userData.userId) {
		res.status(400);
		throw new Error(
			'No authorization, Place Order Failed, Please try again later'
		);
	}

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	} else {
		const order = new Order({
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
			user: userId,
		});

		let createdOrder;

		try {
			createdOrder = await order.save();
		} catch (error) {
			res.status(500);
			throw new Error('Something went wrong, please try again later');
		}

		res.status(201).json({
			message: 'Order placed successfuly',
			order: createdOrder,
		});
	}
});

// @desc    Create new order
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
	const orderId = req.params.id;

	let order;
	try {
		order = await Order.findById(orderId).populate(
			'user',
			'name userName email'
		);

		if (!order) {
			res.status(404);
			throw new Error('order not found');
		}
	} catch (error) {
		res.status(500);
		throw new Error('Something went wrong, please try again later');
	}

	res.status(200).json({
		message: 'Order find successfuly',
		order: order,
	});
});

// @desc    Update order to Pay
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPay = asyncHandler(async (req, res) => {
	const orderId = req.params.id;

	let order;
	try {
		order = await Order.findById(orderId);

		if (!order) {
			res.status(404);
			throw new Error('order not found');
		}

		if (!req.userData.isAdmin) {
			res.status(401);
			throw new Error('User is not admin, You Not allowed to Edit this');
		}

		order.isPiad = true;
		order.piadAt = Date.now();

		order = await order.save();
	} catch (error) {
		res.status(500);
		throw new Error('Something went wrong, please try again later');
	}

	res.status(200).json({
		message: 'Order Payed successfuly',
		order: order,
	});
});

// @desc    Get Logged In User Orders
// @route   GET /api/orders/user/:userId
// @access  Private
export const getOrdersByUserId = asyncHandler(async (req, res) => {
	const userId = req.params.userId;

	if (req.userData.userId !== userId) {
		res.status(401);
		throw new Error(
			'You are not allowed to vist the route, authorization is denied'
		);
	}

	let orders;
	try {
		orders = await Order.find({ user: userId });

		// if (orders.length === 0) {
		// 	res.status(404);
		// 	throw new Error('you do not have any orders yet');
		// }
	} catch (error) {
		res.status(500);
		throw new Error('Something went wrong, please try again later');
	}

	res.status(200).json({
		message: 'find Orders successfuly',
		orders: orders.map(order => order.toObject({ getters: true })),
	});
});
