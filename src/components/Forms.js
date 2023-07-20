import { useState } from "react";
import { newPost, updatePost, deleteComment, deletePost } from "../Api";
export const newContentValidator = (e) => {
    const minLen = { text: 10, title: 4, user_name: 4, comment_text: 4 };
    const el = e.target;
    if (el.hasAttribute("required") && el.value.length < minLen[el.name]) {
        el.setAttribute("style", "border-color:red");
        el.className = "invalid";
        return false;
    } else {
        el.setAttribute("style", "border-color:rgb(193, 186, 186)");
        el.classList.remove("invalid");
        return true;
    }
};

// New/Edit Content forms
export const PostEditForm = (props) => {
    const { title, text, published } = props;
    const initialState = { title, text, published };
    const [formData, setFormData] = useState(initialState);
    const [validData, setValidData] = useState();
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setValidData(newContentValidator(e));
    };
    const changeBooleanName = (e) => {
        if (e === false) {
            return "No";
        } else {
            return "Yes";
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validData) {
            updatePost(props._id, formData);
            props.setEditMode();
        }
    };

    return (
        <form method="POST" action="" className="edit-post-form">
            <div className="title">
                <input
                    type="text"
                    id="post-title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="post-text">
                <textarea
                    type="text"
                    name="text"
                    id="post-text"
                    value={formData.text}
                    onChange={handleInputChange}
                    required
                ></textarea>
            </div>
            <div className="published">
                <label htmlFor="published">Published:</label>
                <select
                    name="published"
                    id="published"
                    onChange={handleInputChange}
                >
                    <option value={published}>
                        {changeBooleanName(published)}
                    </option>
                    <option value={!published}>
                        {changeBooleanName(!published)}
                    </option>
                </select>
            </div>
            <button
                className="confirm-edit"
                onClick={handleSubmit}
                type="submit"
            >
                Confirm Edit
            </button>
            <button
                className="cancel-edit"
                onClick={props.setEditMode}
                type="button"
            >
                Cancel
            </button>
        </form>
    );
};

export const FormNewPost = (props) => {
    const initialState = { text: "", title: "" };
    const [formData, setFormData] = useState(initialState);
    const [validData, setValidData] = useState();
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setValidData(newContentValidator(e));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validData) {
            await newPost(formData);
            e.target.parentElement.reset();
            props.setWasUpdated(!props.wasUpdated);
        }
    };
    return (
        <form method="post" className="new-post">
            <input
                placeholder="Title (min characters: 3)"
                type="text"
                name="title"
                id="title"
                onChange={handleInputChange}
                required
            />
            <textarea
                placeholder="Write your new post (min characters: 10)"
                type="text"
                name="text"
                id="text"
                minLength="10"
                onChange={handleInputChange}
                required
            ></textarea>
            <div className="published">
                <label htmlFor="published">Published: </label>
                <select
                    name="published"
                    id="published"
                    onChange={handleInputChange}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
            </div>
            <button
                className="submit-new-post"
                onClick={handleSubmit}
                type="submit"
            >
                Save Post
            </button>
        </form>
    );
};

// Confirmation forms
export const ConfirmCommentDeletion = (props) => {
    const { setDeleteMode, postID, commentID } = props;
    const handleSubmit = async (e) => {
        e.preventDefault();
        await deleteComment(postID, commentID);
        setDeleteMode();
        props.setWasUpdated(!props.wasUpdated);
    };
    return (
        <>
            <h5>Do you want to delete this Comment? </h5>
            <form action="DELETE">
                <button onClick={handleSubmit} type="submit">
                    Yes
                </button>
                <button onClick={() => setDeleteMode()} type="button">
                    No
                </button>
            </form>
        </>
    );
};
export const ConfirmPostDeletion = (props) => {
    const { setDeleteMode, dbID } = props;
    const handleSubmit = async (e) => {
        e.preventDefault();
        await deletePost(dbID);
        document.querySelector(".back-home").click();
    };
    return (
        <>
            <h3>Do you want to delete this Post? </h3>
            <form action="DELETE">
                <button onClick={handleSubmit} type="submit">
                    Yes
                </button>
                <button onClick={setDeleteMode} type="button">
                    No
                </button>
            </form>
        </>
    );
};
