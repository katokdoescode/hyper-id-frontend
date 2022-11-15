import { sendRequest } from './modules/api.js';

window.onload = async () => {
	await sendRequest((res) => {
		const data = document.getElementById('data');
		data.innerText = res.body;
		console.log(res.body);
	}, { url: 'http://127.0.0.1:8080/account' });
}
