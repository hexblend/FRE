import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from './elements/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ConfirmationModal(props) {
	const { text, openModal, setOpenModal } = props;
	return (
		<>
			{openModal && (
				<div className="ConfirmationModal">
					<div
						className="ConfirmationModal__closeIcon"
						onClick={() => setOpenModal(false)}
					>
						<FontAwesomeIcon icon={faTimes} />
					</div>
					<h3>{text}</h3>
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
