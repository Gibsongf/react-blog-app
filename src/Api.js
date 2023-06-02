async function getToken() {
	const url = "http://localhost:5000/users/login";
	const loginData = {
		username: "test",
		password: "password",
	};
	try {
		const response = await fetch(url, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginData),
		});

		if (response.status === 200) {
			const data = await response.json();
			return data;
		} else {
			throw new Error();
		}
	} catch (error) {
		throw Error(error);
	}
}
async function getIndexData() {
	// Save the token at local storage and just call the function when there is none saved
	const data = await getToken();
	// console.log(data)
	localStorage.setItem('token',data.token)
	localStorage.setItem('db_id',data.id)
	const url = "http://localhost:5000/api/blog-author/";
	try {
		const response = await fetch(url, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + data.token,
			},
		});
		if (response.status === 200) {
			const data = await response.json();
			// console.log(data);
			return data;
		}
	} catch (err) {
		throw Error(err);
	}
}
export default getIndexData
