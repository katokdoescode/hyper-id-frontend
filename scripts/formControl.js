const handleResponse = (status, method, token) => {
	if(token) document.cookie = `authToken=${token}; path=/`;
	status === 200 ? allOk(method) : error(status);
};

const allOk = (method) => {
	showMessage(
		{ text: 'Login and password are correct' },
		() => window.location.assign(method)
	);
};

const error = (status) => {
	const statusMessage = {
		401: 'Hmm.. login or password not correct.',
		403: 'You have not permission to login',
		409: 'This username already taken.',
		500: 'Server error :(',
		501: 'Server error :(',
		502: 'Server error :(',
		0: 'Maybe CORS error. Check console.',
	};
	showMessage({ text: statusMessage[status] });
};

const submitRegister = (event) => {
	event.preventDefault();
	const userData = collectUserData(event.target);

	sendRequest(
		(res) => ( handleResponse(res.status, '/pages/login') ),
		{
			url: 'register/',
			method: 'POST',
			loader: '.h-loader',
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
			loader: '.h-loader',
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
