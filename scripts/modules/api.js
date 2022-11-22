const sendRequest = async(
	callback,
	{
		body,
		method = 'GET',
		url = 'https://jsonplaceholder.typicode.com/todos/1',
		loader = null,
		authToken = null,
	}
) => {
	const xhr = new XMLHttpRequest();

	xhr.open(method, url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	if(authToken) xhr.setRequestHeader('Authorization', authToken);
	xhr.send(JSON.stringify(body) ?? '');

	xhr.onreadystatechange = () => {
		if (xhr.readyState === xhr.DONE) {
			callback({
				status: xhr.status,
				body: xhr.response,
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
