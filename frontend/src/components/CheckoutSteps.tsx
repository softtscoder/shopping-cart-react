import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface CheckoutStepsProps {
	step1?: boolean;
	step2?: boolean;
	step3?: boolean;
	step4?: boolean;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({
	step1,
	step2,
	step3,
	step4,
}) => {
	return (
		<Nav className="justify-content-center mb-3">
			<Nav.Item>
				{step1 ? (
					<Nav.Link as={Link} to="/login" className="pl-0">
						Sign In
					</Nav.Link>
				) : (
					<Nav.Link disabled className="pl-0">
						Sign In
					</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step2 ? (
					<Nav.Link as={Link} to="/shipping">
						Shipping
					</Nav.Link>
				) : (
					<Nav.Link disabled>Shipping</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step3 ? (
					<Nav.Link as={Link} to="/payment">
						Payment
					</Nav.Link>
				) : (
					<Nav.Link disabled>Payment</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step4 ? (
					<Nav.Link as={Link} to="/placeorder" className="pr-0">
						Place Order
					</Nav.Link>
				) : (
					<Nav.Link disabled className="pr-0">
						Place Order
					</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
};

export default CheckoutSteps;
