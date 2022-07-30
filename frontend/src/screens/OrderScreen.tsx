import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, orderActions } from '../redux';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderScreen: React.FC = () => {
	const { loading, order, error } = useSelector(
		(state: RootState) => state.orderDetail
	);

	const { id } = useParams<{ id: string }>();

	const dispatch = useDispatch();
	console.log(id);

	useEffect(() => {
		if (id) {
			dispatch(orderActions.getOrderById(id));
		}
	}, [id, dispatch]);

	if (loading || !order) {
		return <Loader />;
	}

	const addDeciamls = (num: number) => {
		return +(Math.round(num * 100) / 100).toFixed(2);
	};

	const itemsPrice = addDeciamls(
		order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)
	);

	const {
		shippingAddress: { address, city, country, phone },
		user: { name, email },
		paymentMethod,
		shippingPrice,
		deliveredAt,
		isDelivered,
		orderItems,
		totalPrice,
		taxPrice,
		isPaid,
		paidAt,
	} = order;

	return (
		<>
			{error && <Message variant="danger">{error}</Message>}
			<h1>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping To</h2>
							<p>
								<strong className="font-weight-bold">Name: </strong> {name}
							</p>
							<p>
								<strong className="font-weight-bold">Email: </strong>
								<a href={`mailto:${email}`}>{email}</a>
							</p>
							<p>
								<strong className="font-weight-bold">Address: </strong>
								{`${address}, ${city}, ${country}`}
							</p>
							<p>
								<strong className="font-weight-bold">Phone Number: </strong>{' '}
								{phone}
							</p>
							{isDelivered ? (
								<Message variant="success">Delivered on {deliveredAt}</Message>
							) : (
								<Message variant="danger">Not Delivered Yet</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong className="font-weight-bold">Method: </strong>
								{paymentMethod}
							</p>
							{isPaid ? (
								<Message variant="success">Paid on {paidAt}</Message>
							) : (
								<Message variant="danger">Not Paid Yet</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Orders</h2>
							{orderItems.length === 0 ? (
								<Message>Orders is Empty</Message>
							) : (
								<ListGroup variant="flush">
									{orderItems.map((item, index) => (
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

							{/* <ListGroup.Item>
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
							</ListGroup.Item> */}
							<ListGroup.Item>
								{!isPaid && (
									<Message variant="success">
										<h6>order Placed Successfuly</h6>
										We will call you soon to confirm the order
									</Message>
								)}
								{paymentMethod === 'VodafonCash' && (
									<p>
										Call{' '}
										<strong className="font-weight-bold">01029947010</strong> To
										pay by Vodafone Cash
									</p>
								)}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
