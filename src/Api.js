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
			return data;
		} else {
			throw new Error();
		}
	} catch (error) {
		throw Error(error);
	}
}
export async function setupFetch(url, reqType = "get",body) {
	if (!localStorage["token"]) {
		const data = await apiLogin();
		localStorage.setItem("token", data.token);
		localStorage.setItem("db_id", data.id);
		console.log("Done login and save token/id");
	}
	const reqInfo = {
		method: reqType,
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage["token"],
		},
	}
	if(body){
		body = JSON.stringify(body)
	}
	try {
		const response = await fetch(url, reqInfo);
		console.log(response.status);
		if (response.status === 200 || response.status === 201) {
			const data = await response.json();
			return data;
		}
	} catch (err) {
		throw Error(err);
	}
}
export async function blogAuthorData() {
	// Save the token at local storage and just call the function when there is none saved
	const url = "http://localhost:5000/api/blog-author/";
	return setupFetch(url);
}

// send a edited post from form
export async function updatePost(id,formData) {
	const url = `http://localhost:5000/api/post/${id}/edit`;
	return setupFetch(url,'put',formData)
}
