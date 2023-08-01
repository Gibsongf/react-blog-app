import { useContext, useState } from "react";
import { newPost, updatePost, deleteComment, deletePost } from "../Api";
import { newContentValidator } from "./FormValidation";
import { useNavigate } from "react-router-dom";
import { UpdateContext } from "../pages/PostDetails";

// New/Edit form content
export const PostEditForm = (props) => {
    const { title, text, published } = props;
    const initialState = { title, text, published };
    const [formData, setFormData] = useState(initialState);
    const { setWasUpdated } = useContext(UpdateContext);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        newContentValidator(e);
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
        const validData = newContentValidator(e.target.parentElement);
        if (validData) {
            // api call to update post
            updatePost(props._id, formData);
            // leave edit mode
            props.setEditMode(false);
            // update post when confirm edition
            setWasUpdated((e) => !e);
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
                onClick={() => props.setEditMode(false)}
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

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        newContentValidator(e);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validData = newContentValidator(e.target.parentElement);

        if (validData) {
            await newPost(formData);
            e.target.parentElement.reset();
            props.setWasUpdated((bool) => !bool);
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
export const ConfirmDeletionForm = (props) => {
    const { setDeleteMode, commentID, warningText, deleteActionType } = props;
    const postId = localStorage.getItem("postID");
    const navigate = useNavigate();
    const { setWasUpdated } = useContext(UpdateContext);

    const handleComment = async () => {
        // API call delete comment
        await deleteComment(postId, commentID);
        // update post when confirm edition
        setWasUpdated((e) => !e);
    };
    const handlePost = async () => {
        await deletePost(postId);
        navigate("/");
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (deleteActionType === "Post") {
            handlePost();
        }
        if (deleteActionType === "Comment") {
            handleComment();
        }
    };

    return (
        <>
            <h5>{warningText}</h5>
            <form action="DELETE">
                <button onClick={handleSubmit} type="submit">
                    Yes
                </button>
                <button onClick={() => setDeleteMode((e) => !e)} type="button">
                    No
                </button>
            </form>
        </>
    );
};
