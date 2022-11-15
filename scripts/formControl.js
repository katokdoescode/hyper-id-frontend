import { sendRequest } from './modules/api.js';
import { showMessage } from './modules/modal.js';

const handleResponse = (status, method) => {
	status === 200 ? allOk(method) : error(status);
};

const allOk = (method) => {
	showMessage(
		{text: 'Login and password are correct'},
		() => window.location.assign(method)
	);
};

const error = (status) => {
	showMessage({text: `Server returns response status ${status}`});
};

const submitRegister = (event) => {
	event.preventDefault();
	const userData = collectUserData(event.target);

	sendRequest(
		(res) => (handleResponse(res.status, '/pages/login')),
		{
			url: 'http://localhost:8080/register/',
			method: 'POST',
			loader: '.loader',
			body: userData,
		}
	);
}

const submitLogin = (event) => {
	event.preventDefault();
	const userData = collectUserData(event.target);

	sendRequest(
		(res) => (handleResponse(res.status, '/pages/account', res.headers)),
		{
			url: 'http://localhost:8080/login/',
			method: 'POST',
			loader: '.loader',
			body: userData,
		}
	);
};

const formRegister = document.getElementById('register');
if(formRegister) formRegister.onsubmit = (event) => {
	event.preventDefault();
	submitRegister(event);
};

const formLogin = document.getElementById('login');
if(formLogin) formLogin.onsubmit = (event) => {
	event.preventDefault();
	submitLogin(event);
};

const collectUserData = (form) => {
	if(typeof form === 'object') {
		const formData = new FormData(form);
		const userData = [];
		for(let data of formData) {
			userData.push(data);
		}
		return Object.fromEntries(userData);
	} else {
		console.error('Passed value is not an object');
		return undefined;
	}
}

export { submitRegister, submitLogin };
