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
	const baseURI = 'http://127.0.0.1:8080/';

	xhr.open(method, baseURI + url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	if(authToken) xhr.setRequestHeader('Authorization', authToken);
	/**
	 * Set true if server is on another domain,
	 * and you have secure connection
	 *
	 * See Web API reference here:
	 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
	 */
	// xhr.withCredentials = false;
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
