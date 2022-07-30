import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styled from 'styled-components';

const SocialIcon = styled.li`
	display: inline-flex;
	width: 41px;
	height: 41px;
	color: #fff;
	margin-right: 14px;
	margin-bottom: 14px;
	border-radius: 13px;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	background: #39334f;
	-webkit-transition: all 0.4s;
	transition: all 0.4s;

	transition: all 0.5s ease-in-out;
	&:hover {
		background: #ffc000;
		transform: rotate(360deg);
	}
`;

const SocialItem = ({ title, link, children }) => {
	return (
		<SocialIcon className="list-inline-item mr-3">
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				style={{ width: '42px' }}
				className="d-block"
			>
				<OverlayTrigger overlay={<Tooltip id="tooltip-top">{title}</Tooltip>}>
					{children}
				</OverlayTrigger>
			</a>
		</SocialIcon>
	);
};

export default SocialItem;
