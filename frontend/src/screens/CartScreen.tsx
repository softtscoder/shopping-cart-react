import { useEffect } from 'react';
import { History } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from 'react-bootstrap';
import { RootState, cartActions } from '../redux/index';
import Message from '../components/Message';
// import Spinner from '../components/Loader';

const CartScreen: React.FC = () => {
	const { id } = useParams<{ id?: string }>();

	const { search } = useLocation<History>();

	const history = useHistory();

	const qty: number = search ? +search.split('=')[1] : 1;

	const dispatch = useDispatch();

	const { cartItems } = useSelector((state: RootState) => state.cart);

	useEffect(() => {
		if (id) {
			dispatch(cartActions.addToCart(id, qty));
		}
	}, [dispatch, id, qty]);

	const removeFromCardHandler = (productId: string) => {
		dispatch(cartActions.removeFromCart(productId));
	};

	const checkoutHandler = () => {
		history.push('/login?redirct=shipping');
	};

	let shoppingList;

	if (cartItems.length === 0) {
		shoppingList = (
			<Message>
				Your cat is empty for now, start <Link to="/">Shopping</Link>
			</Message>
		);
	} else {
		shoppingList = (
			<ListGroup variant="flush">
				{cartItems.map((item, i) => {
					return (
						<ListGroup.Item key={item.product}>
							<Row>
								<Col className="d-flex align-items-center justify-content-center px-0">
									{i + 1}
								</Col>
								<Col
									md={2}
									className="d-flex align-items-center justify-content-center"
								>
									<Image src={item.image} alt={item.name} fluid rounded />
								</Col>
								<Col
									md={3}
									className="d-flex align-items-center justify-content-center"
								>
									<Link to={`/product/${item.product}`}>{item.name}</Link>
								</Col>
								<Col
									md={2}
									className="d-flex align-items-center justify-content-center"
								>
									${item.price}
								</Col>
								<Col
									md={2}
									className="d-flex align-items-center justify-content-center"
								>
									<Form.Control
										as="select"
										value={item.qty}
										onChange={e => {
											return dispatch(
												cartActions.addToCart(item.product, +e.target.value)
											);
										}}
									>
										{[...Array(item.countInStock).keys()].map(qty => (
											<option key={qty + 1} value={qty + 1}>
												{qty + 1}
											</option>
										))}
									</Form.Control>
								</Col>
								<Col
									md={2}
									className="d-flex align-items-center justify-content-center"
								>
									<Button
										type="button"
										variant="light"
										onClick={() => removeFromCardHandler(item.product)}
									>
										<i
											className="fas fa-trash"
											style={{ fontSize: '1.1rem' }}
										></i>
									</Button>
								</Col>
							</Row>
						</ListGroup.Item>
					);
				})}
			</ListGroup>
		);
	}

	return (
		<>
			<h1 className="py-3">Shooping Cart</h1>
			<Row>
				<Col md={8}>{shoppingList}</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>
									Subtotal (
									{cartItems.reduce((prevQty, item) => prevQty + item.qty, 0)})
									Items
								</h3>
								<br />
								Total Price: $
								<strong>
									{cartItems
										.reduce((prev, item) => prev + item.qty * item.price, 0)
										.toFixed(2)}
								</strong>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									block
									onClick={checkoutHandler}
									disabled={cartItems.length === 0}
								>
									Proceed To Checkout
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default CartScreen;
