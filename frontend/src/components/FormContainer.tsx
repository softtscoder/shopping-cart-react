import { Container, Row, Col } from 'react-bootstrap';

const FormContainer: React.FC = ({ children }) => {
	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col xs={12} sm={12} md={6}>
					{children}
				</Col>
			</Row>
		</Container>
	);
};

export default FormContainer;
