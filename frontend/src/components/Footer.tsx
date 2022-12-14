import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col className="text-center py-3">Copyright © ProShop</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
