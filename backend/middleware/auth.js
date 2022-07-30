import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	if (
		!req.headers.authorization &&
		!req.headers.authorization.startsWith('Bearer')
	) {
		res.status(401);
		throw new Error('No token, authorization is denied');
	}

	try {
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			res.status(403);
			throw new Error('No token, authorization is denied');
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

		req.userData = {
			userId: decodedToken.userId,
			isAdmin: decodedToken.isAdmin,
			userName: decodedToken.userName,
		};

		next();
	} catch (error) {
		res.status(403);
		throw new Error('Authentication faild!');
	}
};

export const admin = (req, res, next) => {
	if (req.userData && req.userData.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('Not Authorization as an admin');
	}
};
