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
export const saveUserInfo = (info) => {
    localStorage.setItem("userProfile", JSON.stringify(info));
};
