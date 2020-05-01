import React from 'react';
import Link from '../components/elements/Link';

function Footer() {
	const PUBLIC_URL = process.env.PUBLIC_URL;
	return (
		<div className="footer">
			<p>Copyright &copy;{new Date().getFullYear()} Find the Right Employee</p>
			<div className="footer__rightLinks">
				<Link to={`${PUBLIC_URL}/contact-us`} type="gray" text="Contact Us" />
				<Link
					to={`${PUBLIC_URL}/terms-and-conditions`}
					type="gray"
					text="Terms and Conditions"
				/>
				<Link
					to={`${PUBLIC_URL}/cookie-policy`}
					type="gray"
					text="Cookie Policy"
				/>
			</div>
		</div>
	);
}

export default Footer;
