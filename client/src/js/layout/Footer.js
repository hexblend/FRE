import React from 'react';
import Link from '../components/elements/Link';

function Footer() {
	return (
		<div className="footer">
			<p>Copyright &copy;{new Date().getFullYear()} Find the Right Employee</p>
			<div className="footer__rightLinks">
				<Link to="/contact" type="gray" text="Contact Us" />
				<Link
					to="/terms-and-conditions"
					type="gray"
					text="Terms and Conditions"
				/>
				<Link to="/cookie-policy" type="gray" text="Cookie Policy" />
			</div>
		</div>
	);
}

export default Footer;
