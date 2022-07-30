import { useState, useEffect } from 'react';
import moment from 'moment';
import { useHistory, Link } from 'react-router-dom';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	RootState,
	userDetailsActions,
	userUpdateActions,
	orderActions,
} from '../redux';
import Spinner from '../components/Loader';
import Message from '../components/Message';

const ProfileScreen: React.FC = () => {
	const [updateUser, setUpdateUser] = useState({
		name: '',
		email: '',
		userName: '',
		password: '',
	});
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [message, setMessage] = useState<string | null>(null);

	const history = useHistory();

	const dispatch = useDispatch();

	const { userInfo } = useSelector((state: RootState) => state.userAuth);

	const userOrders = useSelector((state: RootState) => state.userOrders);
	const { loading: loadingOrders, error: errOrders, orders } = userOrders;

	const { loading, user, error } = useSelector(
		(state: RootState) => state.userDetails
	);

	const { success } = useSelector((state: RootState) => state.userUpdate);
	const updateLoading = useSelector(
		(state: RootState) => state.userUpdate.loading
	);

	const updatedUser = useSelector((state: RootState) => state.userUpdate.user);
	const { email, userName, name, password } = updateUser;

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUpdateUser({ ...updateUser, [event.target.name]: event.target.value });
	};

	const updateProfileHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not Match, Please check your password again!');
		} else {
			dispatch(userUpdateActions.updateUserProfile(updateUser));
		}
	};

	useEffect(() => {
		if (userInfo) {
			dispatch(orderActions.getUserOrdersList(userInfo.userId));
		}
	}, [userInfo, dispatch]);

	useEffect(() => {
		if (!userInfo) {
			return history.push('/login');
		}

		if (!user || !user.name || success) {
			dispatch(userUpdateActions.resetUserProfile());
			dispatch(userDetailsActions.getUserProfile('profile'));
		} else {
			setUpdateUser({
				password: '',
				name: user.name,
				email: user.email,
				userName: user.userName,
			});
		}
	}, [history, userInfo, user, success, dispatch]);

	if (loading || !user) {
		return (
			<div className="vh-100 d-flex justify-content-center align-items-center">
				<Spinner />
			</div>
		);
	}

	if (loadingOrders) {
		return (
			<div className="vh-100 d-flex justify-content-center align-items-center">
				<Spinner />
			</div>
		);
	}
	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{error && <Message variant="danger">{error}</Message>}
				{message && <Message variant="danger">{message}</Message>}
				{updatedUser && success && (
					<Message variant="success">{updatedUser.message}</Message>
				)}
				<Form onSubmit={updateProfileHandler}>
					<Form.Group controlId="name">
						<Form.Label>Update Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Update Name"
							value={name}
							name="name"
							onChange={changeHandler}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="userName">
						<Form.Label>Update User Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Update User Name"
							value={userName}
							name="userName"
							onChange={changeHandler}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="email">
						<Form.Label>Update Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Update Email"
							value={email}
							name="email"
							onChange={changeHandler}
							inputMode="email"
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Update Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Update Password"
							value={password}
							name="password"
							onChange={changeHandler}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							name="confirmPassword"
							onChange={e => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					{updateLoading ? (
						<Spinner width={50} height={50} />
					) : (
						<Button type="submit" variant="primary" block>
							Update
						</Button>
					)}
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{errOrders && <Message variant="danger">{errOrders}</Message>}
				{orders.length === 0 ? (
					<div className="text-center py-3 mt-3">
						<h4>
							you didn't make any orders yet, start <Link to="/">Shopping</Link>
						</h4>
					</div>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>Order ID</th>
								<th>Date</th>
								<th>Total</th>
								<th>Paid</th>
								<th>Delivered</th>
								<th>Order Details</th>
							</tr>
						</thead>
						<tbody>
							{orders.map(order => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{moment(order.createdAt).format('D.dddd.MMM.YYYY')}</td>
									<td>{order.totalPrice}</td>
									<td className="text-center">
										{order.isPaid ? (
											moment(order.paidAt).format('D.dddd.MMM.YYYY')
										) : (
											<i className="fas fa-times text-danger" />
										)}
									</td>
									<td className="text-center">
										{order.isDelivered ? (
											moment(order.deliveredAt).format('D.dddd.MMM.YYYY')
										) : (
											<i className="fas fa-times text-danger" />
										)}
									</td>
									<td className="text-center">
										<Button as={Link} size="sm" to={`/order/${order._id}`}>
											Details
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
