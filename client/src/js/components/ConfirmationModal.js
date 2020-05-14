import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from './elements/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ConfirmationModal(props) {
	const { text, openModal, setOpenModal } = props;

	useEffect(() => {
		if (openModal) {
			setOpenModal(true);
			window.scrollTo(0, 0);
			document.body.style.overflow = 'hidden';
		} else {
			setOpenModal(false);
			document.body.style.overflow = 'inherit';
		}
	}, [openModal, setOpenModal]);

	return (
		<>
			{openModal && (
				<div className="ConfirmationModal">
					<div className="ConfirmationModal__content">
						<div
							className="ConfirmationModal__closeIcon"
							onClick={() => setOpenModal(false)}
						>
							<FontAwesomeIcon icon={faTimes} />
						</div>
						<h3 className="ConfirmationModal__text">{text}</h3>
						<div className="ConfirmationModal__buttons">
							<Button
								btnType="button"
								type="secondary"
								text="Go back"
								onClick={() => setOpenModal(false)}
							/>
							{props.children}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

ConfirmationModal.propTypes = {
	text: PropTypes.string.isRequired,
	openModal: PropTypes.bool.isRequired,
	setOpenModal: PropTypes.func.isRequired,
};

export default ConfirmationModal;
