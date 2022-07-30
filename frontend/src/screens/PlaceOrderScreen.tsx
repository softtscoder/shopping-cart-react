import { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
	Button,
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, orderActions } from '../redux';
import CheckoutSteps from '../components/CheckoutSteps';
// import Spinner from '../components/Loader';
import Message from '../components/Message';

const PlaceOrderScreen = () => {
	const {
		shippingAddress: { address, country, city, phone },
		paymentMethod,
		cartItems,
	} = useSelector((state: RootState) => state.cart);

	const { loading, success, order, error } = useSelector(
		(state: RootState) => state.order
	);

	const history = useHistory();

	const addDeciamls = (num: number) => {
		return +(Math.round(num * 100) / 100).toFixed(2);
	};

	const itemsPrice = addDeciamls(
		cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
	);

	const shippingPrice = addDeciamls(itemsPrice > 100 ? 100 : 0);
	const taxPrice = addDeciamls(Number((0.15 * itemsPrice).toFixed(2)));
	const totalPrice = itemsPrice + shippingPrice + taxPrice;

	const dispatch = useDispatch();

	useEffect(() => {
		if (success && order) {
			history.push(`/order/${order._id}`);
		}
	}, [success, order, history]);

	const placeOrderHandler = () => {
		dispatch(
			orderActions.createOrder({
				shippingAddress: { address, country, city, phone },
				orderItems: cartItems,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			})
		);
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong className="font-weight-bold">Address: </strong>
								{`${address}, ${city}, ${country}`}
							</p>
							<p>Phone Number {phone}</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong className="font-weight-bold">Method: </strong>
								{paymentMethod}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Orders</h2>
							{cartItems.length === 0 ? (
								<Message>Your Cart is Empty</Message>
							) : (
								<ListGroup variant="flush">
									{cartItems.map((item, index) => (
										<ListGroup.Item key={item.product}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} <strong>X</strong> ${item.price} = $
													{(item.qty * item.price).toFixed(2)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summery</h2>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>$ {itemsPrice.toFixed(2)}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>$ {shippingPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>$ {taxPrice}</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>$ {totalPrice}</Col>
								</Row>
							</ListGroup.Item>

							{error && (
								<ListGroup.Item>
									<Message variant="danger">{error}</Message>
								</ListGroup.Item>
							)}

							<ListGroup.Item>
								{loading ? (
									<div className="d-flex justify-content-center align-items-center">
										<Spinner animation="border" role="status">
											<span className="sr-only">Loading...</span>
										</Spinner>
									</div>
								) : (
									<Button
										type="button"
										block
										onClick={placeOrderHandler}
										disabled={cartItems.length === 0}
									>
										Place Order
									</Button>
								)}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
