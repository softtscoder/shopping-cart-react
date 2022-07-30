import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find();
	res.json(products.map(p => p.toObject({ getters: true })));
});

// @desc    Fetch single product
// @route   GET /api/product/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Product Deleted Succesfuly', product });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

// @desc    Craete product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.userData.userId,
		image: '/images/sample.jpg',
		brand: 'smple brand',
		category: 'smple category',
		countInStock: 0,
		numReviews: 0,
		description: 'smple description',
	});

	let createdProduct;

	try {
		createdProduct = await product.save();
	} catch (error) {
		res.status(500);
		throw new Error('Could not create product, try again later');
	}

	res.status(201).json({
		message: 'Product Created Succesfuly',
		product: createdProduct,
	});
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProductById = asyncHandler(async (req, res) => {
	const productId = req.params.id;

	let updateProduct;

	try {
		updateProduct = await Product.findById(productId);

		if (!updateProduct) {
			res.status(404);
			throw new Error('Could not find product by this id');
			return;
		}
	} catch (error) {
		res.status(500);
		throw new Error('Could not find product by this id, try again later');
	}

	const {
		name,
		price,
		user,
		image,
		brand,
		category,
		countInStock,
		numReviews,
		description,
	} = req.body;

	updateProduct.name = name;
	updateProduct.price = price;
	updateProduct.countInStock = countInStock;
	updateProduct.description = description;
	updateProduct.brand = brand;
	updateProduct.countInStock = countInStock;
	updateProduct.numReviews = numReviews;
	updateProduct.category = category;

	let updatedProduct;
	try {
		updatedProduct = await updateProduct.save();
	} catch (error) {
		res.status(500);
		throw new Error('Could not update product, try again later');
	}

	res.status(200).json({
		message: 'Product Updated Succesfuly',
		product: updatedProduct,
	});
});
