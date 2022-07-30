import { Spinner } from 'react-bootstrap';

interface SpinnserProps {
	width?: number;
	height?: number;
}

const Loader: React.FC<SpinnserProps> = ({ width, height }) => {
	return (
		<Spinner
			animation="border"
			className="m-auto d-block"
			style={{ width: `${width}px`, height: `${height}px` }}
		>
			<span className="sr-only">Loading...</span>
		</Spinner>
	);
};

Loader.defaultProps = {
	width: 100,
	height: 100,
};

export default Loader;
