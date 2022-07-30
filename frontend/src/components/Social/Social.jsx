import SocialItem from './SocialItem';
import {
	FaFacebookF,
	FaTwitter,
	FaLinkedin,
	FaInstagram,
} from 'react-icons/fa';

const socialMedia = [
	{
		id: 2,
		title: 'Facebook',
		icon: <FaFacebookF color="#fff" size="1.35em" />,
		link: 'https://www.facebook.com/ghadan.co/?ref=br_rs',
	},
	{
		id: 3,
		title: 'Twitter',
		icon: <FaTwitter color="#fff" size="1.35em" />,
		link: 'https://twitter.com/Salt_from_Egypt',
	},
	{
		id: 1,
		title: 'Linked in',
		icon: <FaLinkedin color="#fff" size="1.35em" />,
		link: 'https://www.linkedin.com/company/egypt-rock-salt-ghadan/',
	},
	{
		id: 4,
		title: 'Instagram',
		icon: <FaInstagram color="#fff" size="1.4em" />,
		link: 'https://www.instagram.com/ghadan.co',
	},
];

const Social = () => {
	return (
		<ul className="list-unstyled text-center py-1 mb-0 d-flex align-items-start">
			{socialMedia.map(social => (
				<SocialItem key={social.id} title={social.title} link={social.link}>
					{social.icon}
				</SocialItem>
			))}
		</ul>
	);
};

export default Social;
