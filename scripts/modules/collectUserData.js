export const collectUserData = (form) => {
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
};
