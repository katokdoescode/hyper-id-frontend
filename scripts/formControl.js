import { sendRequest } from './modules/api.js';
import { showMessage } from './modules/modal.js';
import { collectUserData } from './modules/collectUserData.js';

const handleResponse = (status, method, token) => {
	if(token) document.cookie = `authToken=${token}; path=/`;
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
			url: 'register/',
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
		(res) => (handleResponse(res.status, '/pages/account', res.token)),
		{
			url: 'login/',
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

export { submitRegister, submitLogin };
