import { loginData } from "./user";

export async function apiLogin() {
    const url = "http://blog-api-g.adaptable.app/users/login";

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
async function setupFetch(url, reqMethod = "get", body) {
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
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
        if (response.status === 401) {
            localStorage.removeItem("token");
            return "Old token";
        }
    } catch (err) {
        throw Error(err);
    }
}
export async function getIndexData() {
    const url = "http://blog-api-g.adaptable.app/public";
    const reqConfig = {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(url, reqConfig);
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
    } catch (err) {
        throw Error(err);
    }
}
export async function getUserData() {
    const url = "http://blog-api-g.adaptable.app/api/user-blog/";
    const data = await setupFetch(url);
    return data;
}
export async function getAuthorDetails(id) {
    const url = `http://blog-api-g.adaptable.app/public/author/${id}`;
    const data = await setupFetch(url, "get");
    return data;
}
export async function newPost(formData) {
    const url = `http://blog-api-g.adaptable.app/api/post/`;
    const data = await setupFetch(url, "post", formData);
    return data;
}

export async function updatePost(id, formData) {
    const url = `http://blog-api-g.adaptable.app/api/post/${id}/edit`;
    const data = await setupFetch(url, "put", formData);
    return data;
}
export async function getPostDetails(id, isPublic) {
    let call = "api";
    if (isPublic) {
        call = "public";
    }
    const url = `http://blog-api-g.adaptable.app/${call}/post/${id}`;
    const data = await setupFetch(url, "get");
    return data;
}

export async function deletePost(id) {
    const url = `http://blog-api-g.adaptable.app/api/post/${id}`;
    const data = await setupFetch(url, "delete");
    return data;
}
export async function deleteComment(postID, commentID) {
    const url = `http://blog-api-g.adaptable.app/api/post/${postID}/comment/${commentID}`;
    const data = await setupFetch(url, "delete");
    return data;
}

export async function postComment(postID, formData, isPublic) {
    let call = "api";
    if (isPublic) {
        call = "public";
    }
    const url = `http://blog-api-g.adaptable.app/${call}/post/${postID}/comment`;
    const data = await setupFetch(url, "post", formData);
    return data;
}
