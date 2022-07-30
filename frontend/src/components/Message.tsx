import { Alert } from 'react-bootstrap';

interface AlertProps {
	variant?: string;
}

const Message: React.FC<AlertProps> = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
	variant: 'info',
};

export default Message;
