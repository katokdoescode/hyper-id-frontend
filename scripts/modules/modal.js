const modalMessage = document.getElementById('modal-message');
const messageText = document.getElementById('message');

const showMessage = ({ text, appearence = 1.5 }, callback) => {
	messageText.textContent = text;
	modalMessage.showModal();
	setTimeout(() => {
		modalMessage.close()
		if(callback) callback();
	}, (appearence * 1000));
}

export { showMessage };
