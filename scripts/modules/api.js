const sendRequest = async(
	callback,
	{
		body,
		method = 'GET',
		url = '',
		loader = null,
		authToken = null,
	}
) => {
	const xhr = new XMLHttpRequest();
	const baseURI = 'http://localhost:8080/';

	xhr.open(method, baseURI + url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	if(authToken) xhr.setRequestHeader('Authorization', authToken);
	xhr.withCredentials = true;
	xhr.send(JSON.stringify(body) ?? '');

	xhr.onreadystatechange = () => {
		if (xhr.readyState === xhr.DONE) {
			const token = xhr.getResponseHeader('accessToken');
			callback({
				status: xhr.status,
				body: xhr.response,
				token,
			});
		};
	};

	if(loader) {
		xhr.addEventListener('loadstart', toggleLoad(loader));
		xhr.addEventListener('loadend', toggleLoad(loader));
	};
};

const toggleLoad = (loader) => {
	const loaderElement = document.querySelector(loader);
	loaderElement.classList.toggle('loading');
};



export { sendRequest };
