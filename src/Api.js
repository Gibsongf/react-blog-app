async function apiLogin() {
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
			console.log('Login successfully')
			return data;
		} else {
			throw new Error();
		}
	} catch (error) {
		throw Error(error);
	}
}
async function setupFetch(url, reqMethod = "get", body) {
	if (!localStorage["token"]) {
		const data = await apiLogin();
		localStorage.setItem("token", data.token);
	}
	const reqConfig = {
		method: reqMethod,
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage["token"],
		},
	};
	if (body) {
		reqConfig.body = JSON.stringify(body);
	}
	try {
		const response = await fetch(url, reqConfig);
		console.log(response.status);
		if (response.status === 200) {
			const data = await response.json();
			return data;
		}
	} catch (err) {
		throw Error(err);
	}
}
export async function getIndexData() {
	const url = "http://localhost:5000/api/blog-owner/";
	const data = await setupFetch(url);
	// localStorage.setItem('data',JSON.stringify(data))
	return data;
}
export async function updatePost(id, formData) {
	const url = `http://localhost:5000/api/post/${id}/edit`;
	console.log(id,formData)
	const data = await setupFetch(url, "put", formData);
	// return data;
}
export async function uniquePost(id) {
	const url = `http://localhost:5000/api/post/${id}`;
	const data = await setupFetch(url, "get");
	return data;
}

export async function deletePost(id) {
	// Save the token at local storage and just call the function when there is none saved
	const url = `http://localhost:5000/api/post/${id}`;
	const data = await setupFetch(url, "delete");
	return data;
}