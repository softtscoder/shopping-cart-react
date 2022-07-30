import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, cartActions } from '../redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
// import Spinner from '../components/Loader';
// import Message from '../components/Message';

const ShippingScreen = () => {
	const { shippingAddress } = useSelector((state: RootState) => state.cart);

	const [shipDetails, setShipDetails] = useState(shippingAddress);

	const history = useHistory();

	const dispatch = useDispatch();

	const { address, city, phone, country } = shipDetails;

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShipDetails({ ...shipDetails, [event.target.name]: event.target.value });
	};

	const submitShippingHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(cartActions.saveShippingAddres(shipDetails));
		history.push('/payment');
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitShippingHandler}>
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Your Address"
						value={address}
						name="address"
						inputMode="text"
						required
						onChange={changeHandler}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Your City"
						value={city}
						name="city"
						inputMode="text"
						required
						onChange={changeHandler}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="phone">
					<Form.Label>Phone Number</Form.Label>
					<Form.Control
						type="number"
						placeholder="Enter Your Phone Number"
						value={phone}
						name="phone"
						inputMode="numeric"
						required
						onChange={changeHandler}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Your country"
						value={country}
						name="country"
						inputMode="text"
						required
						onChange={changeHandler}
					></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
