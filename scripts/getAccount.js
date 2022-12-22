const getToken = () => {
	return document.cookie
	.split('; ')
	.find((row) => row.startsWith('authToken='))
	?.split('=')[1];
};

const toggleEditMode = (thisBtn, fields, anotherButton) => {
	fields.forEach((field) => field.disabled = !field.disabled);
	thisBtn.hidden = !thisBtn.hidden;
	anotherButton.hidden = !anotherButton.hidden;
};

const storeChanges = async (event, thisBtn, fields, anotherButton) => {
	event.preventDefault();
	console.debug(event.target)
	const body = collectUserData(event.target)

	await sendRequest((res) => {
		if(res.status === 200) toggleEditMode(thisBtn, fields, anotherButton);

	}, { url: 'account/', method: 'PUT', authToken: getToken(), body });
};
const logout = () => {
	document.cookie = 'authToken=; path=/';
	window.location.href='./index.html'
};

window.onload = async () => {
	const usernameText = document.getElementById('current-username'),
		nameField = document.querySelector('input[name="name"]'),
		secondnameField = document.querySelector('input[name="surname"]');

	const editBtn = document.getElementById('edit'),
		saveBtn = document.getElementById('save'),
		logoutBtn = document.getElementById('logout');

	const form = document.getElementById('account-form');

	await sendRequest((res) => {
		const { username, name, surname } = JSON.parse(res.body);
		usernameText.innerText = username;
		nameField.value = name;
		secondnameField.value = surname;

	}, { url: 'account/', authToken: getToken() });

	editBtn.addEventListener('click', () => toggleEditMode(editBtn, [nameField, secondnameField], saveBtn));
	form.addEventListener('submit', (event) => storeChanges(event, editBtn, [nameField, secondnameField], saveBtn));
	logoutBtn.addEventListener('click', () =>  logout());
};
