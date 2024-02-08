export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const newDate = date.toLocaleString("en-US", options);
    return newDate;
};
export const savePostId = (e) => {
    localStorage.setItem("postID", e.target.id);
};
// export const saveAuthorId = (e) => {
//     localStorage.setItem("authorID", author._id)
// };
export const saveUserInfo = (info) => {
    localStorage.setItem("userProfile", JSON.stringify(info));
};
export const headerInfo = () => {
    let token = localStorage.getItem("token");
    const profile = {
        text: "Profile",
        url: "/profile",
    };
    const login = {
        text: "Login",
        url: "/login",
    };
    if (token) {
        return profile;
    } else {
        return login;
    }
};
