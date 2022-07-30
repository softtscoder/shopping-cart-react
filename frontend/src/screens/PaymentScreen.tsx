import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, cartActions } from '../redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
// import Spinner from '../components/Loader';
// import Message from '../components/Message';

const PaymentScreen = () => {
	const { shippingAddress, paymentMethod } = useSelector(
		(state: RootState) => state.cart
	);

	const [paymentMthd, setPaymentMthd] = useState<string>(paymentMethod);

	const history = useHistory();

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const dispatch = useDispatch();

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPaymentMthd(event.target.value);
	};

	const submitShippingHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(cartActions.savePaymentMethod(paymentMthd));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitShippingHandler}>
				<Form.Group controlId="address">
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							label="PayPal or Credit Card"
							id="PayPal"
							name="paymentMethod"
							value="PayPal"
							disabled
							checked={paymentMthd === 'PayPal'}
							onChange={changeHandler}
						/>
						<br />
						<Form.Check
							type="radio"
							label="Vodafone Cash"
							id="VodafonCash"
							name="paymentMethod"
							value="VodafonCash"
							checked={paymentMthd === 'VodafonCash'}
							onChange={changeHandler}
						/>
						<br />
						<Form.Check
							type="radio"
							label="Cash On Delivery"
							id="CashOnDelivery"
							name="paymentMethod"
							value="CashOnDelivery"
							checked={paymentMthd === 'CashOnDelivery'}
							onChange={changeHandler}
						/>
					</Col>
				</Form.Group>

				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
