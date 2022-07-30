import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// @desc    register User & Get Token
// @route   POST /api/users/login
// @access  Public
export const signup = asyncHandler(async (req, res, next) => {
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	next(new HttpError('Invalid inputs passed, please check your data', 422));
	// 	// return res.status(400).json({ errors: errors.array() });
	// }

	const { userName, email, name, password } = req.body;

	let exsitingUser;
	exsitingUser = await User.findOne({ email });

	if (exsitingUser) {
		res.status(422);
		throw new Error('User already exist, please login instead');
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (err) {
		res.status(500);
		throw new Error('Could not create user, please try again later');
	}

	const createdUser = new User({
		name,
		email,
		userName,
		password: hashedPassword,
	});

	try {
		// await transporter.sendMail({
		// 	to: email,
		// 	from: 'airbnb.team.iti@gmail.com',
		// 	subject: 'Signed Up Successfuly',
		// 	html: `
		// 	<div
		// 		style="
		// 			box-shadow: 0px 3px 4px #444;
		// 			border-radius: 10px;
		// 			text-align: center;
		// 			padding: 25px;
		// 			border: 3px solid #ff5a5f;
		// 			width: 80%;
		// 			margin: 10px auto;
		// 		"
		// 	>
		// 		<h2
		// 			style="
		// 				color: #ff5a5f;
		// 				border-bottom: 2px solid #ff5a5f;
		// 				display: inline-block;
		// 			"
		// 		>
		// 			Airbnb Team
		// 		</h2>
		// 		<h4>Organization: ITI <br /> <a href="https://www.iti.gov.eg" target="_blank">Information technology institue</a></h4>
		// 		<p>Hello, ${email}</p>
		// 		<p>
		// 			Congratulations! <span style="text-transform: capitalize; font-weight: 600;">${firstName} ${lastName}</span>
		// 			Registration Succeeded! Your Email address has been registered with an
		// 			<strong>Airbnb</strong> account. Please log in by Email!
		// 		</p>
		// 	</div>
		// 	`,
		// });
		await createdUser.save();
	} catch (err) {
		res.status(500);
		throw new Error('Signing up failed, please try again later');
	}

	let token;
	try {
		token = jwt.sign(
			{
				userId: createdUser.id,
				email: createdUser.email,
				userName: createdUser.userName,
			},
			process.env.JWT_SECRET_KEY,
			{ expiresIn: '30d' }
		);
	} catch (err) {
		res.status(500);
		throw new Error('Signing up failed, please try again later');
	}

	res.status(201).json({
		message: 'Signed up successfuly',
		token: token,
		name: createdUser.name,
		userId: createdUser.id,
		email: createdUser.email,
		isAdmin: createdUser.isAdmin,
		userName: createdUser.userName,
	});
});

// @desc    Auth User & Get Token
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	let exsitingUser;

	try {
		exsitingUser = await User.findOne({ email });
	} catch (err) {
		res.status(500);
		throw new Error('Logging in failed, please try again later');
	}

	if (!exsitingUser) {
		res.status(422);
		throw new Error('You are not registered, sign up first', 422);
	}

	let isValidPassword;
	try {
		isValidPassword = await bcrypt.compare(password, exsitingUser.password);
	} catch (err) {
		res.status(422);
		throw new Error(
			'Could not log you in, please check your credentails and try again'
		);
	}

	if (!isValidPassword) {
		res.status(422);
		throw new Error(
			'Invalid email or password, please try again with valid credentails'
		);
	}

	let token;
	try {
		token = jwt.sign(
			{
				userId: exsitingUser.id,
				email: exsitingUser.email,
				isAdmin: exsitingUser.isAdmin,
				userName: exsitingUser.userName,
			},
			process.env.JWT_SECRET_KEY,
			{ expiresIn: '30d' }
		);
	} catch (err) {
		res.status(500);
		throw new Error('Logging in failed, please try again later');
	}

	res.status(200).json({
		message: 'Loggedin successfuly',
		token: token,
		name: exsitingUser.name,
		userId: exsitingUser.id,
		email: exsitingUser.email,
		isAdmin: exsitingUser.isAdmin,
		userName: exsitingUser.userName,
	});
});

// @desc    GET user profile
// @route   POST /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const userId = req.params.id;

	const user = await User.findById(req.userData.userId);

	if (user) {
		res.status(200).json({
			message: 'Find User Profile successfuly',
			user: {
				name: user.name,
				userId: user.id,
				email: user.email,
				isAdmin: user.isAdmin,
				userName: user.userName,
			},
		});
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
	const userId = req.params.id;

	const user = await User.findById(req.userData.userId);

	if (user) {
		user.name = req.body.name || user.name;
		user.userName = req.body.userName || user.userName;
		user.email = req.body.email || user.email;

		if (req.body.password) {
			let hashedPassword;
			try {
				hashedPassword = await bcrypt.hash(req.body.password, 12);
			} catch (err) {
				res.status(500);
				throw new Error('Could not create user, please try again later');
			}
			user.password = hashedPassword;
		}

		const updatedUser = await user.save();

		let token;
		try {
			token = jwt.sign(
				{
					userId: updatedUser.id,
					email: updatedUser.email,
					isAdmin: updatedUser.isAdmin,
					userName: updatedUser.userName,
				},
				process.env.JWT_SECRET_KEY,
				{ expiresIn: '30d' }
			);
		} catch (err) {
			res.status(500);
			throw new Error('Update Profile, please try again later');
		}

		res.status(200).json({
			message: 'Updated Profile successfuly',
			token: token,
			name: updatedUser.name,
			userId: updatedUser.id,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			userName: updatedUser.userName,
		});
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// @desc    Get All Users
// @route   PUT /api/users/:id
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
	const userId = req.params.id;

	let adminUser;
	try {
		adminUser = await User.findById(userId);

		if (!adminUser) {
			res.status(404);
			throw new Error('User Not Found');
		}
	} catch (error) {
		res.status(500);
		throw new Error('Something went wrong, please try again later');
	}

	const users = await User.find({});

	if (
		!adminUser.isAdmin &&
		!req.userData.isAdmin &&
		req.userData.userId !== userId
	) {
		res.status(401);
		throw new Error('Not Authorization as an admin');
	}

	res.status(200).json({
		message: 'Find All Users successfuly',
		users: users.map(u => u.toObject({ getters: true })),
	});
});

// @desc    Delte User
// @route   DElETE /api/users/:id
// @access  Private/Admin
export const deleteUserById = asyncHandler(async (req, res) => {
	const userId = req.params.id;

	const user = await User.findById(userId);

	if (user) {
		try {
			await user.remove();

			res.status(200).json({
				message: 'User deleted successfuly',
				user,
			});
		} catch (error) {
			res.status(500);
			throw new Error('Could not delete this user, try again later');
		}
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// @desc    Delte User
// @route   DElETE /api/users/admin/user/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
	const userId = req.params.id;

	let user;

	try {
		user = await User.findById(userId).select('-password');
	} catch (error) {
		res.status(500);
		throw new Error('Could not find the user, try again later');
	}

	if (user) {
		res.status(200).json({
			message: 'Find User successfuly',
			user,
		});
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

// @desc    Update user admin
// @route   PUT /api/users/admin/user/:id
// @access  Private/Admin
export const updateUserById = asyncHandler(async (req, res) => {
	const userId = req.params.id;

	const user = await User.findById(userId).select('-password');

	if (user) {
		user.name = req.body.name || user.name;
		user.userName = req.body.userName || user.userName;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin;

		let updatedUser;

		try {
			updatedUser = await user.save();
		} catch (error) {
			res.status(500);
			throw new Error('Could not update the user, try again later');
		}

		res.status(200).json({
			message: 'Updated User successfuly',
			user: {
				name: updatedUser.name,
				userId: updatedUser.id,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				userName: updatedUser.userName,
			},
		});
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});
